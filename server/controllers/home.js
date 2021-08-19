const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

// @desc    This will load the data from output.json in src/assets folder
// @route   /home
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
        response.message = 'Successfully retrieved data from output.json';
        res.status(200).json({
            ...response,
            data: JSON.parse(data)
        });
    } catch (err) {
        console.log(err.message);
        response.message = 'Failed to retrieve data';
        res.status(400).json(response);
    }

    let t1 = performance.now();
    console.log("GET /home took " + (t1 - t0) + " milliseconds.");
};

function loadData() {
    return new Promise((resolve, reject) => {
        // console.log(path.join(__dirname, '../../src/assets/output.json'));
        fs.readFile(path.join(__dirname, '../../src/assets/output.json'), (err, results) => {
            if (err)
                reject(err);
            else
                resolve(results);
        });
    });
}


module.exports = getData;
