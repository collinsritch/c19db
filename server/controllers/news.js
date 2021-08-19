const fs = require('fs')
const path = require('path');

async function getNews(req,res) {
    
    console.log(req.params.date)
    const requestedDate = req.params.date
    try {
        const JSONdata = await loadData()
        const dates = JSON.parse(JSONdata)
        console.log(dates[requestedDate])
        
        if(!dates[requestedDate]) {
            res.status(200).json({
                success: true,
                data: [],
                message: 'No news at that certain date'
            })
        }

        res.status(200).json({
            success: true,
            data: dates[requestedDate],
            message: `Successfully retrieved news at ${requestedDate}`
        })

    } catch(err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

function loadData() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '../../src/assets/news_events.json'), (err, results) => {
            if (err)
                reject(err);
            else
                resolve(results);
        });
    });
}

module.exports = getNews