const csv = require('csv-parser');
const fs = require('fs');
const { performance } = require('perf_hooks');

/* 
    Shrinks csv file (from DOH data drops)
    by selecting only columns DateRepConf and HealthStatus*
    and reducing rows by adding column Count (how many rows are similar)

    Output: 'shrinkedData.csv' in src/assets

    * HealthStatus that is not RECOVERED or DIED
    (like MILD, etc.) is changed to ACTIVE
*/

function shrinkData() {
    let t0 = performance.now();

    // const CASE_DATA_PATH = './../src/assets/DOH COVID Data Drop_ 20210721 - 04 Case Information 2021 - DateRepConf July 14-21.csv';
    // const CASE_DATA_PATH = './../src/assets/DOH_COVID_Data_Drop__20210725_-_04_Case_Information_2021_-_DateRepConf_June_27_-_July_25.csv';
    // const CASE_DATA_PATH = './../src/assets/DOH COVID Data Drop_ 20210721 - 04 Case Information 2021.csv';
    // const CASE_DATA_PATH = './../src/assets/DOH COVID Data Drop_ 20210816 - 04 Case Information.csv';
    const CASE_DATA_PATH = './../../DOH COVID Data Drop_ 20210819 - 04 Case Information.csv'

    let deduped = {};

    fs.createReadStream(CASE_DATA_PATH)
        .pipe(csv())
        .on('data', ({ DateRepConf, HealthStatus }) => {
            if (HealthStatus !== "RECOVERED" && HealthStatus !== "DIED") {
                HealthStatus = "ACTIVE";
            }

            let data = [DateRepConf, HealthStatus].toString();

            if (data in deduped) {
                deduped[data] += 1;
            } else {
                deduped[data] = 1;
            }
        })
        .on('end', () => {
            headerRow = "DateRepConf,HealthStatus,Count";
            let shrinked = [headerRow];

            Object.entries(deduped).forEach(([data, count]) => {
                row = [data, count].toString();
                shrinked.push(row);
            });

            contents = shrinked.join("\n");

            fs.writeFile('./../src/assets/shrinkedData.csv', contents, (err) => {
                if (err) {
                    console.log(err.message);
                } else {
                    console.log("Wrote file 'shrinkedData.csv' in src/assets successfully");
                    let t1 = performance.now();
                    console.log("shrinker.js took " + (t1 - t0) + " milliseconds.");
                }
            });
        });
}


shrinkData();
