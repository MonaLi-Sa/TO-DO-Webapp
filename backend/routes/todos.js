const express = require('express');
const router = express.Router();

// In-memory storage for to-dos
let todos = [];

// Route to get all to-dos
router.get('/', (req, res) => {
  res.json(todos);
});

// Route to add a new to-do
router.post('/', (req, res) => {
  const todo = {
    id: Date.now().toString(),
    text: req.body.text,
    completed: false
  };
  todos.push(todo);
  res.status(201).json(todo);
});

// Route to delete a to-do
router.delete('/:id', (req, res) => {
  todos = todos.filter(todo => todo.id !== req.params.id);
  res.status(204).end();
});

// Route to update a to-do
router.put('/:id', (req, res) => {
  const todo = todos.find(todo => todo.id === req.params.id);
  if (todo) {
    todo.text = req.body.text || todo.text;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
    res.json(todo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

module.exports = router;
