const express = require('express');
const path = require('path');
const logger = require('morgan');

const qualityAdsRouter = require('./routes/qualityAds')
const adsRouter = require('./routes/ads')
const scoreRouter = require('./routes/calculateScore')

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Endpoints
app.use('/ads', adsRouter)
app.use('/qualityAds', qualityAdsRouter)
app.use('/calculateScore', scoreRouter)


// catch 404 error
app.use((req, res, next) => {
  res.statusCode = 404
  res.end(`Path ${req.path} not found `)
})



module.exports = app;
