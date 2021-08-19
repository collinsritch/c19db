const csv = require('csv-parser');
const fs = require('fs');
const _ = require('underscore');
// const { groupBy, pluck, last } = require('underscore');
const { performance } = require('perf_hooks');

/*
    Reads shrinkedData.csv
    Output: 'output.json' in src/assets
*/

function readData() {
    let t0 = performance.now();

    const cases = [];

    fs.createReadStream("./../src/assets/shrinkedData.csv")
        .pipe(csv())
        .on('data', (row) => {
            row.Count = parseInt(row.Count);
            cases.push(row);
        })
        .on('end', () => {
            let dailyCounts = {};
            let dailyGraphData = [];

            let groupByDate = _.groupBy(cases, (data) => data.DateRepConf);

            let dates = Object.keys(groupByDate).sort();

            let dateStart = dates[0];
            let dateEnd = _.last(dates);
            let numOfDays = countDays(dateStart, dateEnd);
            let datesComplete;
            if (numOfDays === dates.length) {
                datesComplete = dates;
            } else {
                datesComplete = getDatesBetweenDates(dateStart, dateEnd);
            }

            let cumulativeTotal = 0;
            let cumulativeActive = 0;
            let cumulativeRecovery = 0;
            let cumulativeDeath = 0;

            datesComplete.forEach((d) => {
                if (dates.includes(d)) {
                    let data = groupByDate[d];

                    let active = 0;
                    let recovery = 0;
                    let death = 0;

                    let caseActive = data.find(obj => obj.HealthStatus === "ACTIVE");
                    let caseRecovery = data.find(obj => obj.HealthStatus === "RECOVERED");
                    let caseDeath = data.find(obj => obj.HealthStatus === "DIED");

                    if (caseActive !== undefined) {
                        active = caseActive.Count;
                        cumulativeActive += active;
                    }

                    if (caseRecovery !== undefined) {
                        recovery = caseRecovery.Count;
                        cumulativeRecovery += recovery;
                    }

                    if (caseDeath !== undefined) {
                        death = caseDeath.Count;
                        cumulativeDeath += death;
                    }

                    let total = active + recovery + death;
                    cumulativeTotal += total;

                    let graphData = { date: d, count: total };
                    dailyGraphData.push(graphData);

                    let counts = {
                        newCase: total,
                        recovery,
                        death,
                        cumulative: cumulativeTotal
                    };
                    dailyCounts[d] = counts;
                } else {
                    dailyGraphData.push({
                        date: d,
                        count: 0
                    });
                    dailyCounts[d] = {
                        newCase: 0,
                        recovery: 0,
                        death: 0,
                        cumulative: cumulativeTotal
                    };
                }
            });

            let weeklyCounts = {};
            let weeklyGraphData = [];

            let dayNum = 0;
            let weeklyTotal = 0;
            let weeklyRecovery = 0;
            let weeklyDeath = 0;

            datesComplete.forEach((d) => {
                let daily = dailyCounts[d];
                weeklyTotal += daily.newCase;
                weeklyRecovery += daily.recovery;
                weeklyDeath += daily.death;

                if (dayNum === 6) {
                    weeklyCounts[d] = {
                        newCase: weeklyTotal,
                        recovery: weeklyRecovery,
                        death: weeklyDeath,
                        cumulative: daily.cumulative
                    };
                    weeklyGraphData.push({
                        date: d,
                        count: weeklyTotal
                    });
                    weeklyTotal = 0;
                    weeklyRecovery = 0;
                    weeklyDeath = 0;
                    dayNum = 0;
                } else {
                    dayNum++;
                }
            });

            let newCases = groupByDate[_.last(dates)];
            let newCaseCount = _.pluck(newCases, 'Count').reduce((sum, x) => sum + x, 0);

            let outputJson = {
                counts: {
                    totalCaseCount: cumulativeTotal,
                    recoveryCount: cumulativeRecovery,
                    activeCaseCount: cumulativeActive,
                    deathCount: cumulativeDeath,
                    newCaseCount,
                    daily: dailyCounts,
                    weekly: weeklyCounts
                },
                graphData: {
                    daily: dailyGraphData,
                    weekly: weeklyGraphData
                }
            };

            fs.writeFile('./../src/assets/output.json', JSON.stringify(outputJson), (err) => {
                if (err) {
                    console.log(err.message);
                } else {
                    console.log("Wrote file 'output.json' in src/assets successfully");
                    let t1 = performance.now();
                    console.log("parser-shrinked.js took " + (t1 - t0) + " milliseconds.");
                }
            });
        });
}


// Helper functions for dates

// returns date object from date string (format: "2021-01-01")

function toDateObj(str) {
    let arr = str.split("-").map(x => parseInt(x));
    let date = new Date(arr[0], arr[1] - 1, arr[2]);
    return date;
}

// returns date string (format: "2021-01-01") from date object

function toDateStr(dateObj) {
    let year = dateObj.getFullYear().toString();
    let month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    let date = (dateObj.getDate()).toString().padStart(2, '0');
    let dateStr = [year, month, date].join("-");
    return dateStr;
}

// count number of days given 2 date objects
// https://stackoverflow.com/questions/2627473/how-to-calculate-the-number-of-days-between-two-dates

function countDays(d1, d2) {
    const oneDay = 86400000; // 24*60*60*1000 = hours*minutes*seconds*milliseconds
    const days = Math.round(Math.abs((d2 - d1) / oneDay)) + 1;
    return days;
}

// returns array of date strings given 2 date objects
// https://flaviocopes.com/how-to-get-days-between-dates-javascript/

function getDatesBetweenDates(startDate, endDate) {
    let dates = [];
    startDate = toDateObj(startDate);
    endDate = toDateObj(endDate);
    //to avoid modifying the original date
    const theDate = new Date(startDate);
    while (theDate < endDate) {
        dates = [...dates, new Date(theDate)];
        theDate.setDate(theDate.getDate() + 1);
    }
    dates = [...dates, endDate];
    dates = dates.map(d => toDateStr(d));
    return dates;
}


readData();
