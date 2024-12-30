const express = require('express');
const router = express.Router();
const {processReceipt} = require('../data/receiptsStore');

router.post('/', async (req, res) => {
    try {
        const receiptId = processReceipt(req.body);
        res.json({id: receiptId});
    } catch (error) {
        console.error('Error processing receipt:', error.message);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;