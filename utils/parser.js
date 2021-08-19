const csv = require('csv-parser');
const fs = require('fs');
const { performance } = require('perf_hooks');

// Reads from the csv file

function readData() {
    let t0 = performance.now();

    const results = [];

    // This is the file from src folder.
    // const CASE_DATA_PATH = './../src/assets/DOH COVID Data Drop_ 20210721 - 04 Case Information 2021 - DateRepConf July 14-21.csv';
    const CASE_DATA_PATH = './../src/assets/DOH_COVID_Data_Drop__20210725_-_04_Case_Information_2021_-_DateRepConf_June_27_-_July_25.csv';
    // const CASE_DATA_PATH = './../src/assets/DOH COVID Data Drop_ 20210721 - 04 Case Information 2021.csv';
    // const CASE_DATA_PATH = './../src/assets/DOH COVID Data Drop_ 20210804 - 04 Case Information.csv';

    fs.createReadStream(CASE_DATA_PATH)
        .pipe(csv())
        .on('data', ({ DateRepConf, HealthStatus }) => {
            results.push({ DateRepConf, HealthStatus });
        })
        .on('end', () => {

            // GET TOTAL COUNTS
            const totalCaseCount = results.length;
            const deathCount = results.filter((obj) => obj.HealthStatus === "DIED").length;
            const recoveryCount = results.filter((obj) => obj.HealthStatus === "RECOVERED").length;
            const activeCaseCount = totalCaseCount - (recoveryCount + deathCount);
            // newCaseCount is computed below in const 'counts'

            // get dates
            let dateRepConfArr = [];
            results.forEach((obj) => {
                if (obj.DateRepConf !== "") {
                    dateRepConfArr.push(obj.DateRepConf);
                }
            });
            dateRepConfArr = [...new Set(dateRepConfArr)];  //deduplicate
            dateRepConfArr.sort();
            let dateStart = dateRepConfArr[0];
            let dateEnd = dateRepConfArr[dateRepConfArr.length - 1];
            let numOfDays = countDays(dateStart, dateEnd);

            // get counts per day
            const dailyCounts = {};
            // if there are no missing dates in dateRepConfArr
            if (numOfDays === dateRepConfArr.length) {
                let cumulative = 0;
                dateRepConfArr.forEach((d) => {
                    let cases = results.filter((obj) => obj.DateRepConf === d);
                    let newCase = cases.length;
                    let recovery = cases.filter((obj) => obj.HealthStatus === "RECOVERED").length;
                    let death = cases.filter((obj) => obj.HealthStatus === "DIED").length;
                    cumulative += newCase;
                    dailyCounts[d] = {
                        newCase,
                        recovery,
                        death,
                        cumulative
                    };
                });
            } else { // if there are missing dates in dateRepConfArr
                let dateArr = getDatesBetweenDates(dateStart, dateEnd);
                let cumulative = 0;
                dateArr.forEach((d) => {
                    let newCase, recovery, death;
                    if (dateRepConfArr.includes(d)) {
                        let cases = results.filter((obj) => obj.DateRepConf === d);
                        newCase = cases.length;
                        recovery = cases.filter((obj) => obj.HealthStatus === "RECOVERED").length;
                        death = cases.filter((obj) => obj.HealthStatus === "DIED").length;
                        cumulative += newCase;
                    } else {
                        newCase = 0;
                        recovery = 0;
                        death = 0;
                    }
                    dailyCounts[d] = {
                        newCase,
                        recovery,
                        death,
                        cumulative
                    };
                });
            }

            // get counts per week
            const weeklyCounts = {};
            let counter = 0;
            let newCases = 0;
            let recoveries = 0;
            let deaths = 0;
            let dates = Object.keys(dailyCounts);

            counter = 0;
            for (let i = 0; i < dates.length; i++) {
                newCases += dailyCounts[dates[i]].newCase;
                deaths += dailyCounts[dates[i]].death;
                recoveries += dailyCounts[dates[i]].recovery;

                if (counter === 6) {  // When it is in the 7th day / 1 week
                    weeklyCounts[dates[i]] = {
                        newCase: newCases,
                        recovery: recoveries,
                        death: deaths,
                        cumulative: dailyCounts[dates[i]].cumulative
                    };
                    counter = 0;
                    newCases = 0;
                    deaths = 0;
                    recoveries = 0;
                    continue;
                }

                counter++;
            }

            // GET GRAPH DATA
            const graphDataDaily = [];
            Object.keys(dailyCounts).forEach((date) => {
                graphDataDaily.push({ date, count: dailyCounts[date].newCase });
            });

            const graphDataWeekly = [];
            Object.keys(weeklyCounts).forEach((date) => {
                graphDataWeekly.push({ date, count: weeklyCounts[date].newCase });
            });

            // WRITE COUNTS AND GRAPH DATA TO JSON FILE
            const counts = {
                totalCaseCount,
                deathCount,
                newCaseCount: dailyCounts[dateEnd].newCase,
                recoveryCount,
                activeCaseCount,
                daily: dailyCounts,
                weekly: weeklyCounts
            };

            const graphData = {
                daily: graphDataDaily,
                weekly: graphDataWeekly
            };

            fs.writeFile('./../src/assets/output.json', JSON.stringify({ counts, graphData }), (err) => {
                if (err) {
                    console.log(err.message);
                } else {
                    console.log("Wrote file 'output.json' in src/assets successfully");

                    let t1 = performance.now();
                    console.log("parser.js took " + (t1 - t0) + " milliseconds.");
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
