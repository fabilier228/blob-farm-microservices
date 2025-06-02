const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
// const fs = require('fs');
// const path = require('path');


const app = express();
const port = process.env.PORT || 3000;

// const readSecret = (secretName) => {
//   try {
//     return fs.readFileSync(path.join('/run/secrets', secretName), 'utf8').trim();
//   } catch (err) {
//     console.warn(`Secret ${secretName} not found or inaccessible. Falling back to environment variable or default.`);
//     return null;
//   }
// }


const dbConfig = {
  user: process.env.POSTGRES_USER || 'user',
  host: process.env.DB_HOST || 'db',
  database: process.env.POSTGRES_DB || 'mydatabase',
  // password: readSecret('postgres_db_password') || process.env.POSTGRES_PASSWORD || 'password',
  password: process.env.POSTGRES_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
};

const client = new Client(dbConfig);

client.connect()
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Database connection error', err));

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello from Backend API!');
});

app.get('/get-blobs', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM blobs ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching blobs');
  }
});

app.post('/create-blob', async (req, res) => {
  const { name, content } = req.body;
  if (!name || !content) {
    return res.status(400).send('Name and content are required');
  }

  try {
    const result = await client.query(
      'INSERT INTO blobs (name, content) VALUES ($1, $2) RETURNING *',
      [name, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating blob');
  }
});

app.patch('/update-blob/:id', async (req, res) => {
  const { id } = req.params;
  const { name, content } = req.body;

  if (!name && !content) {
    return res.status(400).send('At least one of name or content is required');
  }

  try {
    const fields = [];
    const values = [];
    let idx = 1;

    if (name) {
      fields.push(`name = $${idx++}`);
      values.push(name);
    }

    if (content) {
      fields.push(`content = $${idx++}`);
      values.push(content);
    }

    values.push(id);

    const query = `
      UPDATE blobs
      SET ${fields.join(', ')}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING *
    `;

    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).send('Blob not found');
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating blob');
  }
});

app.delete('/delete-blob/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query(
      'DELETE FROM blobs WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Blob not found');
    }

    res.json({ message: 'Blob deleted successfully', blob: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting blob');
  }
});


app.listen(port, '0.0.0.0', () => {
  console.log(`Backend API listening on port ${port}`);
});

