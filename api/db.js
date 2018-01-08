const _ = require('lodash');
const mysql = require('mysql2/promise');
const config = require('./config.json');
const dbConfig = config.db;

function objectToQueryFields(fields) {
    return Object.keys(fields).map((key) => key + '= :' + key);
}

const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.pass,
    database : dbConfig.name
}).then(connection => { 
    connection.insert = async function (table, fields) {
        let assignments = objectToQueryFields(fields);
        query = `INSERT INTO ${table} SET ` + assignments.join(',');
        console.log(query);
        console.log(fields);
        let result = await connection.execute(query, fields);
        return result;
    }

    connection.update = async function (table, fields, conditions) {
        let assignments = objectToQueryFields(fields);
        console.log(assignments);
        let query = `UPDATE ${table} SET ` + assignments.join(',');
        if (conditions && Object.keys(conditions).length != 0){
            query += ` WHERE ` + assignments.join(" AND ");
        }
        console.log(query);
       // let result = await connection.execute(query, 
       //     Object.assign({}, fields, conditions)
        //);

        return result
    }
    return connection;
})

module.exports = connection; 
