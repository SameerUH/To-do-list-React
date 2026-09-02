const Database = require('better-sqlite3');
const db = new Database('todos.db', { verbose: console.log });

db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task TEXT NOT NULL,
        category TEXT NOT NULL,
        date DATE NOT NULL,
        completed BOOLEAN DEFAULT 0
    )
`);

module.exports = db;