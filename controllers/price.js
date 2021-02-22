const fetch = require('node-fetch');

const handleGetPriceHistory = async (req, res) => {
    //destructure start and end dates from request params
    const { startDate, endDate } = req.params;
    try {
        //multiplied bitcoin price index object
        const multipliedIndexes = {};

        //fetch coindesk api with dates
        const response = await fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`);
        const data = await response.json();

        //add multiplied bpi's to multipliedIndexes obj
        for (let i in data.bpi) {
            multipliedIndexes[i] = (data.bpi[i] * 1000).toFixed(2);
        };

        //send object
        res.send(multipliedIndexes);

    } catch (error) {
        console.log(error);
    };
}

module.exports = {
    handleGetPriceHistory
};