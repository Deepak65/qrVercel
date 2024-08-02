require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Value = require('./modals/index');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));
// app.use(cors({ origin: 'http://localhost:3000' }));

const port = process.env.PORT || 3011;
const initialKey = 'initialKey';
const initialValue = '10';

// Endpoint to check if the app is running
app.get('/', async (req, res) => {
  try {
    let value = await Value.findOne({ where: { key: initialKey } });
    if (!value) {
      value = await Value.create({ key: initialKey, value: initialValue });
      res.send(`Hello, the app is running and initial value is set to ${initialValue}`);
    } else {
      res.send(`${value.value}`);
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// Endpoint to fetch a value from the database
app.get('/value/:key', async (req, res) => {
  const key = req.params.key;
  try {
    const value = await Value.findOne({ where: { key } });
    if (value) {
      res.json(value);
    } else {
      res.status(404).send('Value not found');
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// Endpoint to update a value in the database
app.put('/value/:key', async (req, res) => {
  const key = req.params.key;
  const newValue = req.body.value;

  try {
    let value = await Value.findOne({ where: { key } });
    if (value) {
      value.value = newValue;
      await value.save();
      res.json(value);
    } else {
      value = await Value.create({ key, value: newValue });
      res.json(value);
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

app.post('/update/:key', async (req, res) => {
  const key = req.params.key;
  const newValue = req.body.value;

  try {
    let value = await Value.findOne({ where: { key } });
    if (value) {
      value.value = newValue;
      await value.save();
      res.json(value);
    } else {
      value = await Value.create({ key, value: newValue });
      res.json(value);
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

app.get('/values', async (req, res) => {
  try {
    const values = await Value.findAll();
    res.json(values);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

app.get('/redirect/:key', async (req, res) => {
  const key = req.params.key;
  try {
    const value = await Value.findOne({ where: { key } });
    if (value) {
      res.send(`
        <html>
          <head>
            <title>Redirecting...</title>
            <script type="text/javascript">
              setTimeout(function() {
                window.location.href = '${value.value}';
              }, 1000); // 1 second delay for demonstration
            </script>
          </head>
          <body>
            <p>Redirecting to ${value.value}...</p>
          </body>
        </html>
      `);
    } else {
      res.status(404).send('Value not found');
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
