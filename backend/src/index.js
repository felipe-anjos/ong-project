const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

//iformar a porta que aplicação vai rodar
app.listen(3333);
