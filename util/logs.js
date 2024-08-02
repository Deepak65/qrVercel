const fs = require('fs');
const util = require('../util/util');

let generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

let checkForFile = (fileName) => {
    fs.exists("logs/" + fileName, function (exists) {
        if (!exists) {
            fs.writeFile("logs/" + fileName, {flag: 'wx'}, function (err, data) {
                console.log("Log file created");
            })
        }
    });
}

let saveLog = (log) => {
    let fileName = "log-" + util.getTodayDate() + ".txt";
    checkForFile(fileName);

    let data = "\n[" + util.getTodayDateTime() + "] - " + log;

    fs.appendFile('logs/' + fileName, data, function (err) {
        if (err) throw err;
        // console.log('Saved!');
    });
}

let savePaymentFailureLog = (log) => {
    let fileName = "failure-payment.txt";
    checkForFile(fileName);

    let data = "\n[" + util.getTodayDateTime() + "] - " + log;

    fs.appendFile('logs/' + fileName, data, function (err) {
        if (err) throw err;
        // console.log('Saved!');
    });
}

module.exports = {
    saveLog,
    savePaymentFailureLog
};
