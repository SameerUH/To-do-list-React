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
  const result = db.prepare(
    'INSERT INTO todos (task, category, date) VALUES (?, ?, ?)'
  ).run(task, category, date);
  res.json({ id: result.lastInsertRowid, task, category, date, completed: 0 });
});

// Toggle/update a todo
app.put('/api/todos/:id', (req, res) => {
  const { completed } = req.body;
  db.prepare('UPDATE todos SET completed = ? WHERE id = ?')
    .run(completed ? 1 : 0, req.params.id);
  res.json({ success: true });
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  db.prepare('DELETE FROM todos WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

app.listen(3000, () => console.log('Server running on port 3000'));