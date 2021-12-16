const connection = require("./connection");
const apiModel = () => {};

apiModel.countUser = (data, callback) =>
  connection.query(
    "SELECT COUNT(u_name) AS existsUser FROM user WHERE u_user = ?",
    data,
    callback
  );

apiModel.checkUser = (data, callback) =>
  connection.query(
    "SELECT id_user, u_name, COUNT(u_name) AS existsUser FROM user WHERE u_user = ? AND u_password = MD5(?)",
    data,
    callback
  );

apiModel.createUser = (data, callback) =>
  connection.query(
    "INSERT INTO user(u_name, u_user, u_password) VALUES(?, ?, MD5(?))",
    data,
    callback
  );

apiModel.getCategories = (data, callback) =>
  connection.query(
    "SELECT * FROM category ORDER BY c_category",
    data,
    callback
  );

apiModel.getIDUser = (data, callback) =>
  connection.query("SELECT id_user FROM user WHERE u_user = ?", data, callback);

apiModel.createTask = (data, callback) =>
  connection.query(
    "INSERT INTO task(id_user, id_category, t_task, t_date) VALUES(?, ?, ?, ?)",
    data,
    callback
  );

apiModel.getTodayTasks = (data, callback) =>
  connection.query(
    "SELECT t.id_task, t.t_task, c.c_category, DATE_FORMAT(t.t_date, '%d/%m/%Y') AS t_date, t.t_status FROM task t INNER JOIN category c ON(t.id_category = c.id_category) WHERE t.id_user = ? AND t.t_date = ?",
    data,
    callback
  );

apiModel.getTomorrowTasks = (data, callback) =>
  connection.query(
    "SELECT t.id_task, t.t_task, c.c_category, DATE_FORMAT(t.t_date, '%d/%m/%Y') AS t_date, t.t_status FROM task t INNER JOIN category c ON(t.id_category = c.id_category) WHERE t.id_user = ? AND t.t_date = ?",
    data,
    callback
  );

apiModel.getNextTasks = (data, callback) =>
  connection.query(
    "SELECT t.id_task, t.t_task, c.c_category, DATE_FORMAT(t.t_date, '%d/%m/%Y') AS t_date, t.t_status FROM task t INNER JOIN category c ON(t.id_category = c.id_category) WHERE t.id_user = ? AND t.t_date > ?",
    data,
    callback
  );

apiModel.getTask = (data, callback) =>
  connection.query(
    "SELECT t.id_category, t.t_task, c.c_category, DATE_FORMAT(t.t_date, '%Y-%m- %d') AS t_date, t.t_status FROM task t INNER JOIN category c ON(t.id_category = c.id_category) WHERE t.id_task = ?",
    data,
    callback
  );

apiModel.createSubtask = (data, callback) =>
  connection.query(
    "INSERT INTO subtask(id_task, st_task) VALUES(?, ?)",
    data,
    callback
  );

apiModel.updateTask = (data, callback) =>
  connection.query(
    "UPDATE task SET id_category = ?, t_task = ?, t_date = ? WHERE id_task = ?",
    data,
    callback
  );

apiModel.deleteTask = (data, callback) =>
  connection.query("DELETE FROM task WHERE id_task = ?", data, callback);

apiModel.getSubtasks = (data, callback) =>
  connection.query(
    "SELECT st.st_task FROM subtask st INNER JOIN task t ON(st.id_task = t.id_task) WHERE st.id_task = ?",
    data,
    callback
  );

module.exports = apiModel;
