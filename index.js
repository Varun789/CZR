const express = require('express');
const login = require('./app');
const campgController = require('./controllers/campaignerController');
const zoneController = require('./controllers/zoneController');
var app = express();
 
const port = 5000;

app.set('view engine', 'ejs');

// Make static folder in use
app.use('/assets', express.static('assets'));

// Call controllers
login(app);
campgController(app);
zoneController(app);

// Listing on a port no 
app.listen(port);
console.log('Your app is running on ' + port);


