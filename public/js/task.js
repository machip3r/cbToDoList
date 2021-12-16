if (sessionStorage.getItem("id_user") == null) window.location.replace("/");

document.getElementById("titleHome").innerHTML +=
  " " + sessionStorage.getItem("name");

const modalNewTask = document.getElementById("modalNewTask");
const modalTask = document.getElementById("modalTask");
const btnAddTask = document.getElementById("btnAddTask");
const closeNewTask = document.getElementById("closeNewTask");
const closeTask = document.getElementById("closeTask");
const btnCreateTask = document.getElementById("btnCreateTask");
const selectCategory = document.getElementById("selectCategory");
const editSelectCategory = document.getElementById("editSelectCategory");
const btnCloseSession = document.getElementById("btnCloseSession");

let todayTasks, tomorrowTasks, nextTasks;

const updateTaskSubtasks = async (id_task) => {
  const subtaskList = document.getElementById("subtaskList");

  taskSubtasks = await getTaskSubtasks(id_task);

  if (taskSubtasks.length !== 0) {
    subtaskList.innerHTML = "";
    taskSubtasks.forEach((element) => {
      subtaskList.innerHTML += `<div class='s-item'><p>${element.st_task}</p></div>`;
    });
  }
};

const addSubtask = async (id_task) => {
  let subtask = document.getElementById("inputSubtask").value;

  let subtaskStatus = await createSubtask(id_task, subtask);

  if (subtaskStatus == "Subtarea agregada") updateTaskSubtasks(id_task);
  else {
    alert(subtaskStatus);
  }

  updateTaskSubtasks(id_task);

  document.getElementById("inputSubtask").value = "";
};

const editTask = async (id_task, id_category, task, date) => {
  modalEditTask.style.display = "block";
  modalTask.style.display = "none";

  let categories = await getCategories();

  editSelectCategory.innerHTML += `<option value="">Selecciona una categoria</option>`;

  categories.forEach(
    (element) =>
      (editSelectCategory.innerHTML += `<option value="${element.id_category}">${element.c_category}</option>`)
  );

  document.getElementById("editIDTask").value = id_task;
  document.getElementById("editSelectCategory").value = id_category;
  document.getElementById("editTask").value = task;
  document.getElementById("editDate").value = date;
};

const eraseTask = async (id_task) => {
  let taskStatus = await deleteTask(id_task);

  if (taskStatus == "Tarea eliminada") modalTask.style.display = "none";
  else {
    alert(taskStatus);
    modalTask.style.display = "none";
  }

  updateGlobalTasks();
  window.location.reload();
};

const openTask = async (id_task) => {
  modalTask.style.display = "block";
  let task = await getTask(id_task);
  let modalTaskBody = document.getElementById("modalTaskBody");

  modalTaskBody.innerHTML = "";
  modalTaskBody.innerHTML += `<h2>${task[0]["t_task"]}</h2><div class='t-item-date'><span class='t-item-date-tag today'>${task[0]["t_date"]}</span><span class='t-item-category-tag'>${task[0]["c_category"]}</span></div><div class="c-subtask"><div class="s-item-creator"><input type="text" name="subtask" id="inputSubtask" placeholder="Agrega una subtarea" autocomplete="off"/><button type='button' onclick='addSubtask(${id_task});'>+</button></div><div class="s-items" id='subtaskList'></div></div></div><div class='dialog-actions'><button type='button' id='btnEditTask' onclick='editTask(${id_task}, ${task[0]["id_category"]}, "${task[0]["t_task"]}", "${task[0]["t_date"]}");'>Editar</button><button type='button' id='btnDeleteTask' onclick='eraseTask(${id_task});'>Eliminar</button></div>`;

  updateTaskSubtasks(id_task);
};

document.addEventListener("DOMContentLoaded", () => updateGlobalTasks());

const updateGlobalTasks = async () => {
  const todayList = document.getElementById("todayList");
  const tomorrowList = document.getElementById("tomorrowList");
  const nextList = document.getElementById("nextList");

  todayTasks = await getTodayTasks(sessionStorage.getItem("id_user"));
  tomorrowTasks = await getTomorrowTasks(sessionStorage.getItem("id_user"));
  nextTasks = await getNextTasks(sessionStorage.getItem("id_user"));

  if (todayTasks.length !== 0) {
    todayList.innerHTML = "";
    todayTasks.forEach((element) => {
      todayList.innerHTML += `<div class='t-item' onclick='openTask(${element.id_task});'><div class='t-item-info'><div class='t-item-title'><h3>${element.t_task}</h3></div><div class='t-item-date'><span class='t-item-date-tag today'>${element.t_date}</span><span class='t-item-category-tag'>${element.c_category}</span></div></div><div class='t-item-check'><label class='checkbox'><input class='checkbox-input' type='checkbox' /><span class='checkbox-checkmark-box'><span class='checkbox-checkmark'></span></span></label></div></div>`;
    });
  }

  if (tomorrowTasks.length !== 0) {
    tomorrowList.innerHTML = "";
    tomorrowTasks.forEach((element) => {
      tomorrowList.innerHTML += `<div class='t-item' onclick='openTask(${element.id_task});'><div class='t-item-info'><div class='t-item-title'><h3>${element.t_task}</h3></div><div class='t-item-date'><span class='t-item-date-tag tomorrow'>${element.t_date}</span><span class='t-item-category-tag'>${element.c_category}</span></div></div><div class='t-item-check'><label class='checkbox'><input class='checkbox-input' type='checkbox' /><span class='checkbox-checkmark-box'><span class='checkbox-checkmark'></span></span></label></div></div>`;
    });
  }

  if (nextTasks.length !== 0) {
    nextList.innerHTML = "";
    nextTasks.forEach((element) => {
      nextList.innerHTML += `<div class='t-item' onclick='openTask(${element.id_task});'><div class='t-item-info'><div class='t-item-title'><h3>${element.t_task}</h3></div><div class='t-item-date'><span class='t-item-date-tag next'>${element.t_date}</span><span class='t-item-category-tag'>${element.c_category}</span></div></div><div class='t-item-check'><label class='checkbox'><input class='checkbox-input' type='checkbox' /><span class='checkbox-checkmark-box'><span class='checkbox-checkmark'></span></span></label></div></div>`;
    });
  }
};

btnAddTask.onclick = async () => {
  modalNewTask.style.display = "block";

  let categories = await getCategories();

  selectCategory.innerHTML += `<option value="">Selecciona una categoria</option>`;

  categories.forEach(
    (element) =>
      (selectCategory.innerHTML += `<option value="${element.id_category}">${element.c_category}</option>`)
  );
};

closeNewTask.onclick = () => {
  modalNewTask.style.display = "none";
  selectCategory.innerHTML = "";
};

closeTask.onclick = () => (modalTask.style.display = "none");

closeEditTask.onclick = () => {
  modalEditTask.style.display = "none";
  editSelectCategory.innerHTML = "";
};

window.onclick = (event) => {
  if (event.target == modalNewTask) {
    modalNewTask.style.display = "none";
    selectCategory.innerHTML = "";
  }

  if (event.target == modalTask) {
    modalTask.style.display = "none";
  }

  if (event.target == modalEditTask) {
    modalEditTask.style.display = "none";
    editSelectCategory.innerHTML = "";
  }
};

btnCreateTask.onclick = async () => {
  let task = document.getElementById("inputTask").value;
  let id_category = document.getElementById("selectCategory").value;
  let date = document.getElementById("inputDate").value;
  let id_user = sessionStorage.getItem("id_user");

  let taskStatus = await createTask(task, id_category, id_user, date);

  if (taskStatus == "Tarea agregada") modalNewTask.style.display = "none";
  else {
    alert(taskStatus);
    modalNewTask.style.display = "none";
  }

  selectCategory.innerHTML = "";

  updateGlobalTasks();
};

btnUpdateTask.onclick = async () => {
  let id_task = document.getElementById("editIDTask").value;
  let id_category = document.getElementById("editSelectCategory").value;
  let task = document.getElementById("editTask").value;
  let date = document.getElementById("editDate").value;

  let taskStatus = await updateTask(id_task, id_category, task, date);

  if (taskStatus == "Tarea actualizada") modalEditTask.style.display = "none";
  else {
    alert(taskStatus);
    modalEditTask.style.display = "none";
  }

  editSelectCategory.innerHTML = "";

  updateGlobalTasks();
};

btnCloseSession.onclick = () => {
  sessionStorage.clear();
  window.location.replace("/");
};
