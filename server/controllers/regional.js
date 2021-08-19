const fs = require('fs');
const path = require('path');
const papa = require('papaparse');
const _ = require('underscore');
const { performance } = require('perf_hooks');

const REGIONAL_FILE = 'RegionalData2020-Present.csv';
const REGIONAL_PATH = '../../src/assets/' + REGIONAL_FILE;

const PROVINCIAL_FILE = 'ProvincialData2020-Present.csv';
const PROVINCIAL_PATH = '../../src/assets/' + PROVINCIAL_FILE;

const REGIONAL_TOTALS_FILE = 'RegionalTotals.csv';
const REGIONAL_TOTALS_PATH = '../../src/assets/' + REGIONAL_TOTALS_FILE;

const provinceList = getProvinceList();  //get the list of provinces per region

// @desc    This will load the data from regional and provincial CSV files in src/assets folder
// @route   /regional
// @method  GET
const getData = async (req, res) => {
    let t0 = performance.now();

    const response = {
        success: false,
        message: ''
    };

    try {
        const regionalData = await loadRegionalData();
        const provincialData = await loadProvincialData();
        const regionalTotals = await loadRegionalTotalsByStatus();

        let daily = _.sortBy(regionalData, 'Date');
        // let totals = getTotalPerRegion(daily);
        let totals = getRegionalTotalsByStatus(regionalTotals);
        let topRegionTotals = _.first(totals, 4);
        let provinceTotals = getProvinceTotalsPerRegion(topRegionTotals, provincialData);

        response.success = true;
        response.message = 'Successfully retrieved data';

        res.status(200).json({
            ...response,
            data: { totals, provinceTotals, daily }
        });
    } catch (err) {
        console.log(err.message);
        response.message = 'Failed to retrieve data';
        res.status(400).json(response);
    }

    let t1 = performance.now();
    console.log('GET /regional took ' + (t1 - t0) + ' milliseconds.');
};

/* 
    loads data from the CSV file for regional data in src/assets folder,
    returns an array of objects {Date, <region1>, <region2>, ...}
*/
function loadRegionalData() {
    return new Promise((resolve, reject) => {
        console.log(path.join(__dirname, REGIONAL_PATH));
        papa.parse(fs.createReadStream(path.join(__dirname, REGIONAL_PATH)), {
            delimiter: ',',
            header: true,
            dynamicTyping: true,
            complete: function (results) {
                resolve(results.data);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

/* 
    loads data from the CSV file for provincial data in src/assets folder,
    returns an array of objects {Date, <province1>, <province2>, ...}
*/
function loadProvincialData() {
    return new Promise((resolve, reject) => {
        console.log(path.join(__dirname, PROVINCIAL_PATH));
        papa.parse(fs.createReadStream(path.join(__dirname, PROVINCIAL_PATH)), {
            delimiter: ',',
            header: true,
            dynamicTyping: true,
            complete: function (results) {
                resolve(results.data);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

/* 
    loads regional cases (recoveries, deaths, total)
*/
function loadRegionalTotalsByStatus() {
    return new Promise((resolve, reject) => {
        console.log(path.join(__dirname, REGIONAL_TOTALS_PATH));
        papa.parse(fs.createReadStream(path.join(__dirname, REGIONAL_TOTALS_PATH)), {
            delimiter: ',',
            header: true,
            dynamicTyping: true,
            complete: function (results) {
                resolve(results.data);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

/*
    returns regional totals (recoveries, deaths, total, active cases)
    per region
*/
function getRegionalTotalsByStatus(results) {
    results.forEach((data) => {
        let activeCases = data.Total - (data.Recoveries + data.Deaths);
        data['Active Cases'] = activeCases;
    })
    totals = _.sortBy(results, 'Total');
    return totals.reverse();
}

/*
    computes total case count per region from daily data,
    returns an array of objects { region, cases },
    sorted in descending order
*/
function getTotalPerRegion(dailyData) {
    let regions = _.rest(Object.keys(dailyData[0]));
    let totals = [];
    regions.forEach((region) => {
        // get all case counts in 'region'
        let counts = _.pluck(dailyData, region);

        // get sum of array 'counts'
        let cases = _.reduce(counts, (sum, x) => sum + x, 0);

        totals.push({ region, cases });
    });
    totals = _.sortBy(totals, 'cases');
    return totals.reverse();
}

/*
    computes total case count per province per region (top 4),
    returns an object of format:
    {
        <region1> : { total, <province1>, <province2>, ... },
        <region2> : { total, <province1>, <province2>, ... },
        ...
    }
*/
function getProvinceTotalsPerRegion(regionTotals, provincialData) {
    let results = {};
    regionTotals.forEach(({ Region, Total }) => {
        results[Region] = { total: Total };
        let provinces = getProvinces(Region);
        provinces.forEach((province) => {
            let cases = getProvinceTotal(province, provincialData);
            results[Region][province] = cases;
        });
    });
    return results;
}

/*
    returns total case count of province
*/
function getProvinceTotal(province, provincialData) {
    let counts = _.pluck(provincialData, province);
    let cases = _.reduce(counts, (sum, x) => sum + x, 0);
    return cases;
}

/*
    returns an array of provinces (string) of a region
*/
function getProvinces(region) {
    return provinceList[region];
}

/*
    returns an object/dictionary,
    mapping a region to an array of its provinces
*/
function getProvinceList() {
    return {
        NCR: ['NCR'],
        CAR: ['Abra', 'Apayao', 'Benguet', 'Ifugao', 'Kalinga', 'Mtn Province'],
        R1: ['Ilocos Norte', 'Ilocos Sur', 'La Union', 'Pangasinan'],
        R2: ['Batanes', 'Cagayan', 'City of Isabela', 'Nueva Vizcaya', 'Quirino'],
        R3: ['Aurora', 'Bataan', 'Bulacan', 'Nueva Ecija', 'Pampanga', 'Tarlac', 'Zambales'],
        R4a: ['Batangas', 'Cavite', 'Laguna', 'Quezon', 'Rizal'],
        R4b: ['Marinduque', 'Occidental Mindoro', 'Oriental Mindoro', 'Palawan', 'Romblon'],
        R5: ['Albay', 'Camarines Norte', 'Camarines Sur', 'Catanduanes', 'Masbate', 'Sorsogon'],
        R6: ['Aklan', 'Antique', 'Capiz', 'Guimaras', 'Iloilo', 'Negros Occidental'],
        R7: ['Bohol', 'Cebu', 'Negros Oriental', 'Siquijor'],
        R8: ['Biliran', 'Eastern Samar', 'Leyte', 'Samar (Western Samar)', 'Northern Samar', 'Southern Leyte'],
        R9: ['Zamboanga del Norte', 'Zamboanga del Sur', 'Zamboanga Sibugay'],
        R10: ['Bukidnon', 'Camiguin', 'Lanao del Norte', 'Misamis Occidental', 'Misamis Oriental'],
        R11: ['Davao de Oro', 'Davao del Norte', 'Davao del Sur', 'Davao Occidental', 'Davao Oriental'],
        R12: ['Cotabato (North Cotabato)', 'Sarangani', 'Cotabato City (Not a province)', 'Sultan Kudarat'],
        CARAGA: ['Agusan del Norte', 'Agusan del Sur', 'Dinagat Islands', 'Surigao del Norte', 'Surigao del Sur'],
        BARMM: ['Basilan', 'Lanao del Sur', 'Maguindanao', 'Sulu', 'Tawi-Tawi'],
        ROF: []
    };
}

module.exports = getData;
