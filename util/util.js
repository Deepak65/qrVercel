var jwt = require('jsonwebtoken');

let getJWT = (userId) => {
    var token = jwt.sign({id: userId}, 'WTC');
    return token;
}

let environment = () => {
    // return {
    //     base_image_path: "http://www.learnobo.com/chef_api",
    //     cdnAccId: '31b3781e6d3481a66f09b1e3feb1338f',
    //     cdnToken: 'd0vBz6RPK3J1-SYvynDsAJE07OJ7egcTKTW2Aebq'
    // }
    return {
        // base_image_path: "http://localhost:3001",
        base_image_path: "https://uat.api.wethechefs.in",
        // base_image_path: "https://api.wethechefs.in/chef_api",
        cdnAccId: '31b3781e6d3481a66f09b1e3feb1338f',
        cdnToken: 'd0vBz6RPK3J1-SYvynDsAJE07OJ7egcTKTW2Aebq'
    }
}

let verifyToken = (headers) => {
    console.log("headers-" + JSON.stringify(headers));
    if (
        headers.hasOwnProperty('authorization')
        && headers.authorization.startsWith("Bearer ")
    ) {
        let authorization = headers.authorization.split(" ")[1];
        try {
            let decodedTokenValue = jwt.verify(authorization, 'WTC');
            return {
                status: true,
                userId: decodedTokenValue.id
            }
        } catch (e) {
            console.log(e.message)
            return {
                status: false,
                message: e.message
            }
        }
    } else {
        return {
            status: false,
            message: 'Invalid Authorization'
        };
    }
}

let getDTYMDHMS = () => {
    var d = new Date();
    let dtFormat = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    return dtFormat;
}
let TrygetDTYMDHMS = () => {
    var d = new Date();
    let dtFormat = properFormatNumber(d.getFullYear()) + "-" + properFormatNumber((d.getMonth() + 1)) + "-" + properFormatNumber(d.getDate()) + " " + properFormatNumber(d.getHours()) + ":" + properFormatNumber(d.getMinutes()) + ":" + properFormatNumber(d.getSeconds());
    return dtFormat;
}

let getTodayDate = () => {
    var d = new Date();
    let dtFormat = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    return dtFormat;
}

let getTodayDateTime = () => {
    var d = new Date();
    let dtFormat = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    return dtFormat;
}

let gettodaydtms = () => {
    var d = new Date();
    let dtFormat = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + "-" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    return dtFormat;
}

let getChefOrderPrice = (price, commission) => {
    return parseFloat((price - (price * (commission / 100))).toFixed(2));
}

let getDTYMDHMSDT = (dt) => {
    var d = new Date(dt);
    let dtFormat = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    return dtFormat;
}

let getHumanDTYMSHM = (dt) => {
    var d = new Date(dt);
    let dtFormat = properFormatNumber(d.getDate()) + "-" + properFormatNumber(d.getMonth() + 1) + "-" + d.getFullYear() + " " + properFormatNumber(d.getHours()) + ":" + properFormatNumber(d.getMinutes());
    return dtFormat;
}

let getCurrentDate = () => {
    var d = new Date();
    let dtFormat = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    return dtFormat;
}

let getcurrentYear = () => {
    var d = new Date();
    let year = d.getFullYear();
    return year;
}

let currentdatetime = () => {
    var d = new Date();
    let dtFormat = d.getFullYear() + "" + properFormatNumber((d.getMonth() + 1)) + "" + properFormatNumber(d.getDate()) + "-" + d.getHours();
    return dtFormat;
}

let properFormatNumber = (number) => {
    let numString = '';
    if (number < 10) {
        numString = '0' + number;
    } else {
        numString = number + '';
    }
    return numString;
}

let get15minDTYMDHMS = () => {
    var d = new Date();
    d.setMinutes(d.getMinutes() + 15);
    let dtFormat = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    return dtFormat;
}
let currentDateFileName = () => {
    var d = new Date();
    let dtFormat = d.getFullYear() + "_" + (d.getMonth() + 1) + "_" + d.getDate() + "_" + d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds();
    return dtFormat;
}

let getObj = (key, value) => {
    return "`" + key + "` = '" + value + "'";
}
let getUpdateObj = (key, value) => {
    return "`" + key + "` = `" + value + "`";
}
let getUpdate = (key, value) => {
    return "`" + key + "` = `" + value + "`";
}
let getInsertObj = (key, value) => {
    return {
        set: key,
        value: value
    };
}

let generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

let zeroFill = (number, width) => {
    width -= number.toString().length;
    if (width > 0) {
        return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + ""; // always return a string
}

let get1HourBeforeDT = (time) => {
    if (time == null || time == undefined || time == '') {
        return '-';
    }
    var d = new Date(time);

    d.setHours(d.getHours() - 1);

    let date = properFormatNumber(d.getDate());
    let month = properFormatNumber(d.getMonth() + 1);
    let year = d.getFullYear();

    let hour = properFormatNumber(d.getHours());
    let min = properFormatNumber(d.getMinutes());
    let sec = properFormatNumber(d.getSeconds());

    let finalDate = date + ' ' + getMonthName(month) + ',' + year + ' at ' + hour + ':' + min;

    return finalDate;
}

let getMonthName = (month) => {
    switch (month) {
        case '01':
            return 'Jaunurary';
        case '02':
            return 'February';
        case '03':
            return 'March';
        case '04':
            return 'April';
        case '05':
            return 'May';
        case '06':
            return 'June';
        case '07':
            return 'July';
        case '08':
            return 'August';
        case '09':
            return 'September';
        case '10':
            return 'October';
        case '11':
            return 'November';
        case '12':
            return 'December';
    }
    return 'Janurary';
}

let replaceApostrophe = (str) => {
    str = str + "";
    return str.replace(/'/g, "\\'");
}

module.exports = {
    getJWT,
    verifyToken,
    getDTYMDHMS,
    get15minDTYMDHMS,
    currentDateFileName,
    getObj,
    getInsertObj,
    generateRandomNumber,
    getUpdate,
    getUpdateObj,
    currentdatetime,
    getCurrentDate,
    zeroFill,
    getDTYMDHMSDT,
    replaceApostrophe,
    getHumanDTYMSHM,
    getChefOrderPrice,
    getTodayDate,
    getTodayDateTime,
    get1HourBeforeDT,
    gettodaydtms,
    environment,
    TrygetDTYMDHMS
};
