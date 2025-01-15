const express = require("express");
const itemsRouter = express.Router();
const itemsController = require('../controllers/itemsController');

itemsRouter.post("/todos", itemsController.postTodoItem);
itemsRouter.get("/todos", itemsController.getTodoItems);
itemsRouter.delete("/todos/:id" , itemsController.deleteTodoItem);
itemsRouter.patch("/todos/:id" , itemsController.updateTodoItem);

module.exports = itemsRouter;
