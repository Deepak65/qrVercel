var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '',
    // host: '127.0.0.1',
    user: '',
    // user: 'root',
    password: '',
    database: '',
    multipleStatements: true
});

connection.connect((err)=>{
    if(!err){
        console.log('connected to db');
    }else{
        console.log('error on connecting to db:-'+err.message);
    }
});

module.exports = connection;
