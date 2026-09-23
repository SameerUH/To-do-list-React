const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Get all todos
app.get('/api/todos', (req, res) => {
  const todos = db.prepare('SELECT * FROM todos').all();
  res.json(todos);
});

// Add a todo
app.post('/api/todos', (req, res) => {
  const { task, category, date } = req.body;
  const description = req.body.description || '';
  const priority = req.body.priority || 'Low';
  const result = db.prepare(
    'INSERT INTO todos (task, category, date, description, priority) VALUES (?, ?, ?, ?, ?)'
  ).run(task, category, date, description, priority);
  res.json({ id: result.lastInsertRowid, task, category, date, description, priority, completed: 0 });
});

// Toggle/update a todo
app.put('/api/todos/:id', (req, res) => {
  const {task, category, date, description, priority} = req.body;
  db.prepare('UPDATE todos SET task = ?, category = ?, date = ?, description = ?, priority = ? WHERE id = ?')
    .run(task, category, date, description, priority, req.params.id);
  res.json({ id: req.params.id, task, category, date, description, priority});
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  db.prepare('DELETE FROM todos WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

app.listen(3000, () => console.log('Server running on port 3000'));