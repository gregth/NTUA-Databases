class EmployeeController {
    static list(connection) {
        return connection.execute('SELECT * FROM employees').then(([rows, fields]) => {
            return rows;
        });
    }
}

module.exports = EmployeeController;
