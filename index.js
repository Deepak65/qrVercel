require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Value = require('./modals/index');
const Firm = require('./modals/firm')
const User = require('./modals/user')
const ScanLog = require('./modals/logs')
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { Sequelize, Op } = require('sequelize');
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
      // value = await Value.create({ key: initialKey, value: initialValue });
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
  console.log(key,"key")
  try {
    const value = await Value.findOne({ where: { key } });
    if (value) {
      await ScanLog.create({
        key: key,
        date: new Date(), // Record the exact time of the scan
      });
      console.log(value,"value")
      res.send(`
        <html>
          <head>
            <title>Redirecting...</title>
            <script type="text/javascript">
           
                window.location.href = '${value.value}';
            
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
// app.get('/count/:key', async (req, res) => {
//   const { key } = req.params;

//   // Validate query parameter
//   if (!key) {
//     return res.status(400).json({ error: 'Key is required.' });
//   }

//   try {
//     // Query to count entries grouped by date
//     const counts = await ScanLog.findAll({
//       attributes: [
//         [Sequelize.fn('DATE', Sequelize.col('date')), 'date'],
//         [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
//       ],
//       where: { key },
//       group: [Sequelize.fn('DATE', Sequelize.col('date'))],
//       order: [[Sequelize.fn('DATE', Sequelize.col('date')), 'ASC']],
//     });

//     res.json(counts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while counting the entries.' });
//   }
// });
app.get('/count/:key', async (req, res) => {
  const { key } = req.params;

  // Validate query parameter
  if (!key) {
    return res.status(400).json({ error: 'Key is required.' });
  }

  try {
    // Query to count entries grouped by date and time
    const counts = await ScanLog.findAll({
      attributes: [
        [Sequelize.fn('DATE_FORMAT', Sequelize.col('date'), '%Y-%m-%d %H:%i:%s'), 'date'], // Format date with time
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
      ],
      where: { key },
      group: [Sequelize.fn('DATE_FORMAT', Sequelize.col('date'), '%Y-%m-%d %H:%i:%s')],
      order: [[Sequelize.fn('DATE_FORMAT', Sequelize.col('date'), '%Y-%m-%d %H:%i:%s'), 'ASC']],
    });

    res.json(counts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while counting the entries.' });
  }
});
app.post('/register-firm', async (req, res) => {
    const { firm_name, email, phone, pan, status, created_by } = req.body;

    try {
        const existingFirm = await Firm.findOne({ where: { email } });
        if (existingFirm) {
            return res.status(400).json({
                status: 'error',
                message: 'Firm with this email already exists',
                data: null
            });
        }

        const newFirm = await Firm.create({ firm_name, email, phone, pan, status, created_by });
        return res.status(201).json({
            status: 'success',
            message: 'Firm successfully registered',
            data: newFirm
        });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            data: null
        });
    }
});
app.get('/getAllFirm', async (req, res) => {
    try {
      const values = await Firm.findAll();
      res.json({
        status: 'true',
        message: 'Firm Found',
        data: values
    });
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  });
  // Assuming you have already required necessary modules and initialized app

  function hashPasswordMD5(password) {
    return crypto.createHash('md5').update(password).digest('hex');
  }
// Endpoint for user login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found',
          data: null,
        });
      }
  
      // Hash the provided password and compare with stored hash
      const hashedPassword = hashPasswordMD5(password);
  
      if (hashedPassword !== user.password) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid password',
          data: null,
        });
      }
  
      // Return user details
      return res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: {
          email: user.email,
          name: user.name, // Include other user details as needed
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        data: null,
      });
    }
  });
  app.get('/getFirmAndQRCode/:firm_name', async (req, res) => {
    const firmName = req.params.firm_name;
  
    try {
      // Find the firm by name with case sensitivity
      const firm = await Firm.findOne({ 
        where: Sequelize.where(
          Sequelize.fn('BINARY', Sequelize.col('firm_name')), 
          firmName
        )
      });
  
      if (!firm) {
        return res.status(404).json({
          status: 'error',
          message: 'Firm not found',
          data: null,
        });
      }
  
      // Find QR code associated with the firm
      const qrCode = await Value.findOne({ 
        where: { 
          key: firmName 
        } 
      });
  
      // Prepare the response
      const response = {
        firm: firm,
        qr_code: qrCode ? qrCode.value : null // Assuming `value` is the column in qr_codes table
      };
  
      return res.status(200).json({
        status: 'success',
        message: 'Data retrieved successfully',
        data: response,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        data: null,
      });
    }
  });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
