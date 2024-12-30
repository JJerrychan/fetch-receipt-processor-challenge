const getPoints = require('./getPoints');
const processReceipt = require('./processReceipt');

function constructor(app) {
    app.use('/receipts/process', processReceipt);
    app.use('/receipts/', getPoints);
    app.use('*', async (req, res) => {
        console.log('A ' + req.method + ' for ' + req.originalUrl + ' comes from ' + req.ip);
        res.status(404).json({Error: 'Not found'});
    });
}

module.exports = constructor;