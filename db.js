var mysql = require('mysql');
// const {parse, stringify} = require('flatted');
const connection = require('./connection');

module.exports = {
    execute: async function (queryStr) {
        return new Promise((resolve, reject) => {
            connection.query(queryStr, function (error, results, fields) {
                if (error) {
                    console.log("error found:-" + JSON.stringify(error));
                    resolve(error);
                } else {
                    resolve(results);
                }
            });
        });
    },
    updateQuery: function (tableName, set, where) {

        let setval = '';
        for (let i = 0; i < set.length; i++) {
            if (i == 0) {
                setval = set[i];
            } else {
                setval += " , " + set[i];
            }
        }

        let whereVal = '';
        for (let i = 0; i < where.length; i++) {
            if (i == 0) {
                whereVal = where[i];
            } else {
                whereVal += " AND " + where[i];
            }
        }

        let queryStr = "UPDATE `" + tableName + "` SET " +
            setval
            + " WHERE " + whereVal;

        return queryStr;
    },
    insertQuery: function (tableName, data) {
        let setVal = '';
        for (let i = 0; i < data.length; i++) {
            if (i == 0) {
                setVal = "`" + data[i].set + "`";
            } else {
                setVal += " , `" + data[i].set + "`";
            }
        }

        let insertVal = '';
        for (let i = 0; i < data.length; i++) {
            if (i == 0) {
                insertVal = "'" + data[i].value + "'";
            } else {
                insertVal += " , '" + data[i].value + "'";
            }
        }
        return "INSERT INTO `" + tableName + "`(" + setVal + ") VALUES(" + insertVal + ")";

    },
    insertQueryObj: function (tableName, data) {
        let setVal = '';
        for (let i = 0; i < data.length; i++) {
            if (i == 0) {
                setVal = "`" + data[i].set + "`";
            } else {
                setVal += " , `" + data[i].set + "`";
            }
        }

        let insertVal = '';
        for (let i = 0; i < data.length; i++) {
            if (i == 0) {
                insertVal = "`" + data[i].value + "`";
            } else {
                insertVal += " , `" + data[i].value + "`";
            }
        }

        return "INSERT INTO `" + tableName + "`(" + setVal + ") VALUES(" + insertVal + ")";

    },
    deleteQuery: function (tableName, where) {

        let whereVal = '';
        for (let i = 0; i < where.length; i++) {
            if (i == 0) {
                whereVal = where[i];
            } else {
                whereVal += " AND " + where[i];
            }
        }


        return "DELETE FROM `" + tableName + "` WHERE " + whereVal;

    }
}
