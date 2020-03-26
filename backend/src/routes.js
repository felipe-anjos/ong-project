const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileConttoller');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();

//Login
routes.post('/sessions', SessionController.create);

//Ongs Routes
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

//Incidents Routes
routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);

//Profile
routes.get('/profile', ProfileController.index);
module.exports = routes;

