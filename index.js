const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//app start
//npm run dev
//docker start mongodb
const app = express();
app.use(express.json());
//libera acesso a todos os dominios
app.use(cors());

//database initialize
mongoose.connect('mongodb://localhost:27017/nodeapi', {useNewUrlParser: true});

require('./src/models/Product');
require('./src/models/User');


//routes
app.use('/api', require('./src/routes'));

app.listen(3001);