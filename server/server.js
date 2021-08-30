const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const homeRouter = require('./routes/home');
const vaccinationsRouter = require('./routes/vaccinations');
const regionalRouter = require('./routes/regional');
const newsRouter = require('./routes/news')
const path = require('path')

const app = express();
dotenv.config();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(cors());
//Mount routers

app.use('/home', homeRouter);
app.use('/vaccinations', vaccinationsRouter);
app.use('/regional', regionalRouter);
app.use('/news', newsRouter)

// Listen to the port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
