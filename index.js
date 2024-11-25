const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

// data
const tasks = require('./data/tasks');

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(cors());

//
app.get('/', (req, res) => {
  res.json({ tasks: tasks });
});

// API ENDPOINT 1
// <http://localhost:3000/tasks/add?taskId=4&text=Review%20code&priority=1>

app.get('/tasks/add', (req, res) => {
  const { taskId, text, priority } = req.query;

  let newTask = {
    taskId: parseFloat(taskId),
    text: text,
    priority: parseFloat(priority),
  };

  tasks.push(newTask);
  res.json({ tasks: tasks });
});

// API ENDPOINT 2
// <http://localhost:3000/tasks>
app.get('/tasks', (req, res) => {
  res.json({ tasks: tasks });
});

// API ENDPOINT 3
// <http://localhost:3000/tasks/sort-by-priority>

app.get('/tasks/sort-by-priority', (req, res) => {
  let tasksSortedPriorityAsc = tasks.sort((a, b) => a.priority - b.priority);

  res.json({ tasks: tasksSortedPriorityAsc });
});

// API ENDPOINT 4
// <http://localhost:3000/tasks/edit-priority?taskId=1&priority=1>

app.get('/tasks/edit-priority', (req, res) => {
  const { taskId, priority } = req.query;

  try {
    let taskFound = tasks.find((task) => task?.taskId === parseFloat(taskId));
    let taskIndex = tasks.findIndex(
      (task) => taskFound.taskId === parseFloat(task.taskId)
    );
    taskFound.priority = priority;

    tasks[taskIndex] = taskFound;

    res.json({ tasks: tasks });
  } catch (error) {
    res.json({ error: error });
  }
});

// API ENDPOINT 5
// <http://localhost:3000/tasks/edit-text?taskId=3&text=Update%20documentation>

app.get('/tasks/edit-text', (req, res) => {
  const { taskId, text } = req.query;

  try {
    let taskFound = tasks.find((task) => task?.taskId === parseFloat(taskId));
    let taskIndex = tasks.findIndex(
      (task) => taskFound.taskId === parseFloat(task.taskId)
    );
    taskFound.text = text;

    tasks[taskIndex] = taskFound;

    res.json({ tasks: tasks });
  } catch (error) {
    res.json({ error: error });
  }
});

// API ENDPOINT 6
// <http://localhost:3000/tasks/delete?taskId=2>

app.get('/tasks/delete', (req, res) => {
  const { taskId } = req.query;

  try {
    deletedfromTasks = tasks.filter(
      (task) => task.taskId !== parseFloat(taskId)
    );
    res.json({ tasks: deletedfromTasks });
  } catch (error) {
    res.json({ error: error });
  }
});

// API ENDPOINT 7
// <http://localhost:3000/tasks/filter-by-priority?priority=2>

app.get('/tasks/filter-by-priority', (req, res) => {
  const { priority } = req.query;

  try {
    matchedPriority = tasks.filter(
      (task) => task.priority === parseFloat(priority)
    );
    res.json({ tasks: matchedPriority });
  } catch (error) {
    res.json({ error: error });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
