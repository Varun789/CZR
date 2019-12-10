var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var path = require('path');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project_db'
});

var app = express();
module.exports = function (app) {
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('img'));

// Displaying a login page
app.get('/login', function (request, response) {
    response.sendFile(path.join(__dirname + '/Campaigner Login.html'));
});


// Created a method of login for Authentication  
app.post('/auth', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    console.log(username);
    console.log(password);
    var pass = 0;
    var quer = "SELECT * FROM `tblzoneleader` WHERE `tblzoneleader`.`zonelead_id` = '" + username + "' AND `tblzoneleader`.`zone_id` = '" + password + "'";
    var que = "SELECT * FROM `tblcampaigner` WHERE `tblcampaigner`.`campg_id` = '" + username + "' AND `tblcampaigner`.`campg_password` = '" + password + "'";
    if (username && password) {
        var zL=connection.query(quer, function (error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                // Redirect towards dashboard of Zoneleader
                response.redirect('/zoneleader');
                pass = 1;
                response.end();
            }
             return results;           
        });

        var cP = connection.query(que, function (error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                // Rediect towards dashboard of Campaigner
                response.redirect('/campaigner');

                pass = 1;
                response.end();
            }
            return results;
        });
        if (zL.length <= 0 && cP.length <= 0) {
            response.send('Incorrect Username or Password!');
            response.end();
        }
    }
});
    
var regCount, regAmount;
// Loading a campaigner page
app.get('/campaigner', (req, res) => {
    if (req.session.loggedin) {
        // Query for total Registration
        var regQu = 'SELECT COUNT(*) AS count FROM tblparticipant';
        connection.query(regQu, (err, count) => {
            if (err) throw console.log(err);
            regCount = count;
            // Query for total Collection
            var regAqu = 'SELECT SUM(total_payment) AS amount FROM tblpayment';
            connection.query(regAqu, (err, amount) => {
                if (err) throw console.log(err);
                regAmount = amount;
                res.render('campaigner', {
                    regCount: count,
                    regAmount: amount,
                });
            });
        });
    }
    else {
        res.redirect('/login');
    }
});

// Loading Zoneleader Dashboard
app.get('/zoneleader', (req, res) => {
    if (req.session.loggedin) {
        // Query for total Registration
        var regQu = 'SELECT COUNT(*) AS count FROM tblparticipant';
        connection.query(regQu, (err, count) => {
            if (err) throw console.log(err);
            regCount = count;
            // Query for total Collection
            var regAqu = 'SELECT SUM(total_payment) AS amount FROM tblpayment';
            connection.query(regAqu, (err, amount) => {
                if (err) throw console.log(err);
                regAmount = amount;
                res.render('zoneleader' , {
                    regCount: count,
                    regAmount: amount,      
                });
            });
        });
    } else {
        res.redirect('/login');
    }
});
          
// Logout module for completing data
app.post('/logout', function (request, response) {
    request.session.destroy();
    response.redirect('/login');
    respomse.end();
});
app.get('/logout', function (request, response) {
    request.session.destroy();
    response.redirect('/login');
    respomse.end();
});
}
