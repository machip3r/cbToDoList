const express = require("express");
const router = express.Router();
const apiControl = require("./controller/apiControl");

router.get("/countUser/:user", apiControl.countUser);
router.get("/checkUser/:user/:password", apiControl.checkUser);
router.get("/createUser/:name/:user/:password", apiControl.createUser);
router.get("/getCategories", apiControl.getCategories);
router.get("/getIDUser/:user", apiControl.getIDUser);
router.get(
  "/createTask/:id_user/:id_category/:task/:date",
  apiControl.createTask
);
router.get("/getTodayTasks/:id_user/:date", apiControl.getTodayTasks);
router.get("/getTomorrowTasks/:id_user/:date", apiControl.getTomorrowTasks);
router.get("/getNextTasks/:id_user/:date", apiControl.getNextTasks);
router.get("/getTask/:id_task", apiControl.getTask);
router.get("/createSubtask/:id_task/:subtask", apiControl.createSubtask);
router.get(
  "/updateTask/:id_task/:id_category/:task/:date",
  apiControl.updateTask
);
router.get("/deleteTask/:id_task", apiControl.deleteTask);
router.get("/getSubtasks/:id_task", apiControl.getSubtasks);

module.exports = router;
