const express = require('express');
const cors = require('cors');
require('dotenv').config();
const router = require('./router')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/contacts', router)

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});
