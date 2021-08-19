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

app.use(cors());
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
