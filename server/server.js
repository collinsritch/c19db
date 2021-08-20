const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const homeRouter = require('./routes/home');
const vaccinationsRouter = require('./routes/vaccinations');
const regionalRouter = require('./routes/regional');
const newsRouter = require('./routes/news')
const publicPath = path.join(__dirname, '..', 'public');

const app = express();
dotenv.config();

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "https://ph-c19db.herokuapp.com/");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header(
        "Access-Control-Allow-Headers", 
        "Content-Type, Access-Control-Allow-Headers, X-Requested-Wtih"
    );
    next();
});

app.use(
    cors({
        allowedHeaders: ["sessionId", "Content-Type"],
        exposedHeaders: ["sessionId"],
        origin:"https://ph-c19db.herokuapp.com/",
        methods:[
            "OPTIONS",
            "POST",
            "GET",
            "PUT",
            "DELETE"
        ],
        credentials:true
    })
);
//Mount routers

app.use('/home', homeRouter);
app.use('/vaccinations', vaccinationsRouter);
app.use('/regional', regionalRouter);
app.use('/news', newsRouter)

app.use(express.static(publicPath));app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

// Listen to the port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
