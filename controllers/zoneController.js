var bodyParser = require('body-parser');
var mySQL = require('mysql');

// Connect to the database
var connection = mySQL.createPool({
    connectTimeout: 50,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project_db',
    multipleStatements: true
});

// Use body-parser
var urlencodedParser = bodyParser.urlencoded({ extended: true });

// All querry
module.exports = function (app) {
    app.get('/zoneleader/:id', (req, res) => {
        console.log('Here......');
        var sqlQueery = 'SELECT * FROM tblcollege WHERE zone_id = ?';
        connection.query(sqlQueery, [req.params.id], (err, rows, fields) => {
            var d = []
            for (var x of rows) {
                d.push(x)
            }
            if (err) throw err;
            console.log(rows);
            
            res.render('zoneleader',{zleader: d}); 
        });
    });
};
