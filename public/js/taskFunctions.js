const getCategories = async () => {
  try {
    let categories = await axios.get("/api/getCategories/");

    return categories.data;
  } catch (e) {
    console.log(e.message);
  }
};

const createTask = async (task, id_category, id_user, date) => {
  try {
    let taskStatus = await axios.get(
      "/api/createTask/" + id_user + "/" + id_category + "/" + task + "/" + date
    );

    return taskStatus.data.message;
  } catch (e) {
    console.log(e.message);
  }
};

const getTodayTasks = async (id_user) => {
  try {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let tasks = await axios.get("/api/getTodayTasks/" + id_user + "/" + date);

    return tasks.data;
  } catch (e) {
    console.log(e.message);
  }
};

const getTomorrowTasks = async (id_user) => {
  try {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      (today.getDate() + 1);
    let tasks = await axios.get(
      "/api/getTomorrowTasks/" + id_user + "/" + date
    );

    return tasks.data;
  } catch (e) {
    console.log(e.message);
  }
};

const getNextTasks = async (id_user) => {
  try {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      (today.getDate() + 1);
    let tasks = await axios.get("/api/getNextTasks/" + id_user + "/" + date);

    return tasks.data;
  } catch (e) {
    console.log(e.message);
  }
};

const getTask = async (id_task) => {
  try {
    let task = await axios.get("/api/getTask/" + id_task);

    return task.data;
  } catch (e) {
    console.log(e.message);
  }
};

const createSubtask = async (id_task, subtask) => {
  try {
    let subTaskStatus = await axios.get(
      "/api/createSubtask/" + id_task + "/" + subtask
    );

    return subTaskStatus.data.message;
  } catch (e) {
    console.log(e.message);
  }
};

const updateTask = async (id_task, id_category, task, date) => {
  try {
    let taskStatus = await axios.get(
      "/api/updateTask/" + id_task + "/" + id_category + "/" + task + "/" + date
    );

    return taskStatus.data.message;
  } catch (e) {
    console.log(e.message);
  }
};

const deleteTask = async (id_task) => {
  try {
    let taskStatus = await axios.get("/api/deleteTask/" + id_task);

    return taskStatus.data.message;
  } catch (e) {
    console.log(e.message);
  }
};

const getTaskSubtasks = async (id_task) => {
  try {
    let subtasks = await axios.get("/api/getSubtasks/" + id_task);

    return subtasks.data;
  } catch (e) {
    console.log(e.message);
  }
};
