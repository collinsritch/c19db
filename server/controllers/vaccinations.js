const fs = require('fs');
const path = require('path');
const papa = require('papaparse');
const _ = require('underscore');
const { performance } = require('perf_hooks');

const CSV_FILE = 'Philippines OWID data clean.csv';
const CSV_PATH = '../../src/assets/' + CSV_FILE;

// @desc    This will load the data from 'Philippines OWID data clean.csv' in src/assets folder
// @route   /vaccinations
// @method  GET
const getData = async (req, res) => {
    let t0 = performance.now();

    const response = {
        success: false,
        message: ''
    };

    try {
        const data = await loadData();
        response.success = true;
        response.message = 'Successfully retrieved data from ' + CSV_FILE;
        res.status(200).json({
            ...response,
            data: data
        });
    } catch (err) {
        console.log(err.message);
        response.message = 'Failed to retrieve data';
        res.status(400).json(response);
    }

    let t1 = performance.now();
    console.log('GET /vaccinations took ' + (t1 - t0) + ' milliseconds.');
};

function loadData() {
    return new Promise((resolve, reject) => {
        // console.log(path.join(__dirname, CSV_PATH));
        papa.parse(fs.createReadStream(path.join(__dirname, CSV_PATH)), {
            delimiter: ',',
            header: true,
            dynamicTyping: true,
            complete: function (results) {
                let data = _.sortBy(results.data, 'case_date');
                let tableData = convertNullToZero(data);
                let graphData = getGraphData(tableData);
                resolve({ graphData, tableData });
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

// returns array after converting object values to 0 if "NULL"
function convertNullToZero(results) {
    results.forEach((row) => {
        // get keys of all columns expect case_date
        let nullableColumns = _.rest(Object.keys(row));

        // assign 0 if "NULL"
        nullableColumns.forEach((col) => {
            if (row[col] === 'NULL') {
                row[col] = 0;
            }
        });
    });
    return results;
}

// returns array of objects { case_date, total_vaccinations }
function getGraphData(results) {
    let data = [];
    results.forEach(({ case_date, total_vaccinations }) => {
        data.push({ case_date, total_vaccinations });
    });
    return data;
}


module.exports = getData;
