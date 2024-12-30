const {v4: uuidv4} = require('uuid');

const receipts = {};

function checkReceiptId(receiptId) {
    return receipts[receiptId];
}

function processReceipt(receipt) {
    const receiptId = uuidv4();
    receipts[receiptId] = calculatePoints(receipt);
    return receiptId;
}

function calculatePoints(receipt) {
    let points = 0;

    // 1 point for every alphanumeric character in the retailer name
    points += receipt.retailer.replace(/[^a-z0-9]/gi, '').length;

    // 50 points if the total is a round dollar amount with no cents
    if (parseFloat(receipt.total) % 1 === 0) {
        points += 50;
    }

    // 25 points if the total is a multiple of 0.25
    if (parseFloat(receipt.total) % 0.25 === 0) {
        points += 25;
    }

    // 5 points for every two items on the receipt
    points += Math.floor(receipt.items.length / 2) * 5;

    // 0.2*price points for item descriptions that are a multiple of 3 in length
    receipt.items.forEach(item => {
        if (item.shortDescription.trim().length % 3 === 0) {
            points += Math.ceil(parseFloat(item.price) * 0.2);
        }
    });

    // 6 points if the day in the purchase date is odd
    const purchaseDate = new Date(receipt.purchaseDate);
    if (purchaseDate.getDate() % 2 !== 0) {
        points += 6;
    }

    // 10 points if the time of purchase is after 2:00pm and before 4:00pm
    const [hours, minutes] = receipt.purchaseTime.split(':').map(Number);
    if (hours === 14 || (hours === 15 && minutes < 60)) {
        points += 10;
    }

    return points;
}

function getPoints(receiptId) {
    return receipts[receiptId];
}

module.exports = {
    processReceipt, getPoints, checkReceiptId
};