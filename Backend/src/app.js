require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const authrouter = require('./routes/authrouter');
const foodrouter = require('./routes/foodroutes');
const foodpartnerrouter = require('./routes/foodpartnerroutes');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Welcome to the Zomato Clone API');
});

app.use('/api/auth', authrouter);
app.use('/api/food', foodrouter);
app.use('/api/foodpartner', foodpartnerrouter);
module.exports = app;