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
    connection.insert = async function (table, values) {
        let [placeholders, fieldValues] = objectToQueryFields(values);
        let query = `INSERT INTO ${table} SET ` + placeholders.join(',');
        let result = await connection.execute(query, fieldValues);

        return result;
    }

    connection.update = async function (table, values, conditions) {
        let [placeholders, fieldValues] = objectToQueryFields(values);
        let query = `UPDATE ${table} SET ` + placeholders.join(',');
        if (conditions && Object.keys(conditions).length != 0){
            let [conditionPlaceholders, conditionValues] = objectToQueryFields(conditions);
            query += ` WHERE ` + conditionPlaceholders.join(" AND ");
        }

        console.log(query);

        //TODO: merge fieldValues and conditionValues here

        let result = await connection.execute(query, fieldValues);
        return result
    }

    connection.select = async function (table, fields, conditions, orderBy) {
        let result;
        let substitutions = [];
        let query = `SELECT `;
        if (fields && Object.keys(fields).length != 0) {
            query += fields.join(", ");
        }
        else {
            query += ` *`;
        }
        query += ` FROM ${table}`;
        if (conditions && Object.keys(conditions).length != 0){
            let [conditionPlaceholders, conditionValues] = objectToQueryFields(conditions);
            query += ` WHERE ` + conditionPlaceholders.join(" AND ");
            substitutions.push(...conditionValues);
        }

        if (orderBy && orderBy.length != 0){
            let order_properties = [];
            orderBy.forEach( order_field => {
                order_properties.push(`${order_field.field_name}  ${order_field.order}`);
            });
            query += ` ORDER BY ` + order_properties.join(", ");
        }

        console.log(query);
        if (substitutions.length == 0) {
            result = await connection.execute(query);
        }
        else {
            result = await connection.execute(query, substitutions);
        }

        return result
    }
    return connection;
})

module.exports = connection; 
