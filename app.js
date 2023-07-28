// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Middleware for parsing incoming data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Sample initial tasks
let tasks = [];

// Routes
app.get('/', (req, res) => {
  res.render('index', { tasks });
});

app.get('/addTask', (req, res) => {
  const newTask = req.query.newTask;
  if (newTask) {
    tasks.push(newTask);
  }
  res.redirect('/');
});

app.get('/deleteTask', (req, res) => {
  const taskIndex = req.query.taskIndex;
  if (taskIndex !== undefined && taskIndex >= 0 && taskIndex < tasks.length) {
    tasks.splice(taskIndex, 1);
  }
  res.redirect('/');
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
