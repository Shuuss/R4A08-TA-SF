const express = require('express');
const { Pool } = require('pg');
const app = express();


app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const port = 3000;

//on se connecte à postgresql avec le login mot de passe définis dans le docker compose
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'todolist',
  password: 'postgres',
  port: 5432,
});

app.use(express.json());


// afficher les taches
app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks');
    res.json(result.rows);
  } catch (err) {
    console.log(err)
    console.error(err);
    res.status(500).send('Error fetching tasks');
  }
});

// ajouter une tache avec comme description le body de la requête et on l'initialise comme non complétée, logique
app.post('/tasks', async (req, res) => {
  const { description } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO tasks (description, completed) VALUES (${description}, false) RETURNING *`
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding task');
  }
});

// valider une tache
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params; // mettre :id dans la route signifie que c'est dynamique et on y récupère dans la constante id
  try {
    const result = await pool.query(
      `UPDATE tasks SET completed = true WHERE idtask = ${id} RETURNING *`
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating task');
  }
});

app.listen(port, () => {
});
