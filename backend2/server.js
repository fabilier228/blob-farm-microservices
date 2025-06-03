const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3002;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'backend2' });
});

app.get('/api/backend2/data', async (req, res) => {
  try {
    res.json({
      message: 'Data from backend2',
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Backend2 service listening on port ${port}`);
}); 