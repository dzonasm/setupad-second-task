const express = require('express');
const compression = require('compression');
const price = require('./controllers/price');
const ipfilter = require('express-ipfilter').IpFilter;
const rateLimit = require("express-rate-limit");


const app = express();
const port = 3000;

//ip blacklist
const ips = ["127.0.0.1"];

//rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

//deny blacklist ips
app.use(ipfilter(ips));

//use rate limiter
app.use(limiter);

//using compresion middleware
app.use(compression());


//app endpont
app.get(`/api/getPriceHistory/:startDate/:endDate`, (req, res) => {
    // handle api call to get bci for dates
    price.handleGetPriceHistory(req, res);
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});