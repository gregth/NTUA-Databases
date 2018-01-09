const _ = require('lodash');
const mysql = require('mysql2/promise');
const config = require('./config.json');
const dbConfig = config.db;

function objectToQueryFields(fields) {
    let keys = Object.keys(fields);
    let placeholders = keys.map((key) => key + ' = ?');
    let fieldValues = keys.map((key) => fields[key]);

    return [placeholders, fieldValues]
}

const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.pass,
    database : dbConfig.name
}).then(connection => { 
    connection.insert = async function (table, fields) {
        let [placeholders, fieldValues] = objectToQueryFields(fields);
        let query = `INSERT INTO ${table} SET ` + placeholders.join(',');
        let result = await connection.execute(query, fieldValues);

        return result;
    }

    connection.update = async function (table, fields, conditions) {
        let [placeholders, fieldValues] = objectToQueryFields(fields);
        let query = `UPDATE ${table} SET ` + placeholders.join(',');
        if (conditions && Object.keys(conditions).length != 0){
            let [conditionPlaceholders, conditionValues] = objectToQueryFields(conditions);
            query += ` WHERE ` + conditionPlaceholders.join(" AND ");
        }

        console.log(query);

        //TODO: merge fieldValues and conditionValues here

        return result
    }
    return connection;
})

module.exports = connection; 
