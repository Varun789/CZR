var bodyParser = require('body-parser');
var mySQL = require('mysql');

// Connect to the database 
var connection = mySQL.createPool({
    connectTimeout: 50,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'czrmanagement',
    multipleStatements: true
});

// Use body-parser
var urlencodedParser = bodyParser.urlencoded({
    extended: true
});
var regCount, regAmount;
// Module of app
module.exports = function (app) {
    /*// Loading a campaigner page
    app.get('/campaigner0', (req, res) => {
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
                    res.render('campaigner', { regCount: count, regAmount: amount });
                });
        });
    });*/

    // Displaying all card information in each participant
    app.get('/campaigner/:id', (req, res) => {

        // First query for finding data from tempID
        var tempData = 'SELECT * FROM tblparticipant WHERE temp_id = ?';
        connection.query(tempData, [req.params.id], (err, rows, field) => {
            if (err) throw err;

            // Second Query for get the value of payment flag
            var payFlagQ = 'SELECT payment_flag AS payFLAG FROM tblpayment WHERE temp_id  = ?';
            connection.query(payFlagQ, [req.params.id], (err, result) => {  
                var d = []
                for (var x of rows) {
                    d.push(x)
                }
                if (err) throw err;
                res.render('campaigner', { pds :d, regCount: regCount, regAmount: regAmount ,payF: result, tempID:req.params.id});
            });
        });
    });

    // For update a payment flag
    app.put('/campaigner/payment/:id', (req, res) => {
        var updF = 'UPDATE tblpayment SET payment_flag = 1 WHERE temp_id = ?';
        connection.query(updF, [req.params.id], (err, result) => {
            if (err) throw console.log(err);
        });
    });
};