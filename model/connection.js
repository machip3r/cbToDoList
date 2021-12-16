const mysql = require("mysql");

const dbInfo = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "machip3r",
  database: "todolist_db",
};

const connection = mysql.createConnection(dbInfo);

connection.connect((error, connection) => {
  if (error) console.log("Error conexion base de datos" + error);
  if (connection) console.log("Servidor conectado a " + dbInfo.database);

  return;
});

module.exports = connection;
