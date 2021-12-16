const apiModel = require("../model/apiModel");
const apiControl = () => {};

apiControl.countUser = (request, result) => {
  //const body = request.body;
  const body = request.params;

  if (body.user)
    //apiModel.countUser([body.user], (error, rows) =>
    apiModel.countUser([body.user], (error, rows) =>
      error
        ? result.status(500).send({message: error})
        : result.status(200).send(rows)
    );
};

apiControl.checkUser = (request, result) => {
  const body = request.params;

  if (body.user && body.password)
    apiModel.checkUser([body.user, body.password], (error, rows) =>
      error
        ? result.status(500).send({message: error})
        : result.status(200).send(rows)
    );
};

apiControl.createUser = (request, result) => {
  const body = request.params;

  if (body.name && body.user && body.password)
    apiModel.createUser([body.name, body.user, body.password], (error, rows) =>
      error
        ? result.status(500).send({message: error})
        : result.status(200).send(rows)
    );
};

apiControl.getCategories = (request, result) =>
  apiModel.getCategories([], (error, rows) =>
    error
      ? result.status(500).send({message: error})
      : result.status(200).send(rows)
  );

apiControl.getIDUser = (request, result) => {
  const body = request.params;

  if (body.user)
    apiModel.getIDUser([body.user], (error, rows) =>
      error
        ? result.status(500).send({message: error})
        : result.status(200).send(rows)
    );
};

apiControl.createTask = (request, result) => {
  const body = request.params;

  if (body.id_user && body.id_category && body.task && body.date)
    apiModel.createTask(
      [body.id_user, body.id_category, body.task, body.date],
      (error, rows) =>
        error
          ? result.status(500).send({message: error})
          : rows.affectedRows > 0
          ? result.status(200).send({message: "Tarea agregada"})
          : result.status(500).send({message: "No se registró la tarea"})
    );
  else
    result.status(401).send({message: "Peticion de agregar tarea incorrecta"});
};

apiControl.getTodayTasks = (request, result) => {
  const body = request.params;

  if (body.id_user && body.date)
    apiModel.getTodayTasks([body.id_user, body.date], (error, rows) =>
      error
        ? result.status(500).send({message: error})
        : result.status(200).send(rows)
    );
};

apiControl.getTomorrowTasks = (request, result) => {
  const body = request.params;

  if (body.id_user && body.date)
    apiModel.getTomorrowTasks([body.id_user, body.date], (error, rows) =>
      error
        ? result.status(500).send({message: error})
        : result.status(200).send(rows)
    );
};

apiControl.getNextTasks = (request, result) => {
  const body = request.params;

  if (body.id_user && body.date)
    apiModel.getNextTasks([body.id_user, body.date], (error, rows) =>
      error
        ? result.status(500).send({message: error})
        : result.status(200).send(rows)
    );
};

apiControl.getTask = (request, result) => {
  const body = request.params;

  if (body.id_task)
    apiModel.getTask([body.id_task], (error, rows) =>
      error
        ? result.status(500).send({message: error})
        : result.status(200).send(rows)
    );
};

apiControl.createSubtask = (request, result) => {
  const body = request.params;

  if (body.id_task && body.subtask)
    apiModel.createSubtask([body.id_task, body.subtask], (error, rows) =>
      error
        ? result.status(500).send({message: error})
        : rows.affectedRows > 0
        ? result.status(200).send({message: "Subtarea agregada"})
        : result.status(500).send({message: "No se registró la subtarea"})
    );
  else
    result
      .status(401)
      .send({message: "Peticion de agregar subtarea incorrecta"});
};

apiControl.updateTask = (request, result) => {
  const body = request.params;

  if (body.id_category && body.task && body.date && body.id_task)
    apiModel.updateTask(
      [body.id_category, body.task, body.date, body.id_task],
      (error, rows) =>
        error
          ? result.status(500).send({message: error})
          : rows.affectedRows > 0
          ? result.status(200).send({message: "Tarea actualizada"})
          : result.status(500).send({message: "No se actualizó la tarea"})
    );
  else
    result
      .status(401)
      .send({message: "Peticion de actualizar tarea incorrecta"});
};

apiControl.deleteTask = (request, result) => {
  const body = request.params;

  if (body.id_task)
    apiModel.deleteTask([body.id_task], (error, rows) =>
      error
        ? result.status(500).send({message: error})
        : rows.affectedRows > 0
        ? result.status(200).send({message: "Tarea eliminada"})
        : result.status(500).send({message: "No se eliminó la tarea"})
    );
  else
    result.status(401).send({message: "Peticion de eliminar tarea incorrecta"});
};

apiControl.getSubtasks = (request, result) => {
  const body = request.params;

  if (body.id_task)
    apiModel.getSubtasks([body.id_task], (error, rows) =>
      error
        ? result.status(500).send({message: error})
        : result.status(200).send(rows)
    );
};

module.exports = apiControl;
