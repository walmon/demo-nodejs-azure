var express = require("express"),
    bodyParser = require("body-parser"),
    // creación de servidor
    app = express();
    
// Configuraciones necesarias del servidor de Node.JS con Express
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('wwwroot'));
var port = process.env.PORT || 8000;

process.on('uncaughtException', function (err) {
    console.log(err);
});

// document db
var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('./config');

var docDbClient = new DocumentDBClient(config.host, {
    masterKey: config.authKey
});

var TaskDao = require('./models/taskDao');
var taskDao = new TaskDao(docDbClient, config.databaseId, config.collectionId);
taskDao.init();



app.get('/', function (req, res) {
    res.sendfile('wwwroot/index.html');
});

app.get('/users', function (req, res) {
    
    var querySpec = {
      query: 'SELECT * FROM root r WHERE r.completed=@completed',
      parameters: [{
        name: '@completed',
        value: false
      }]
    };
    
    taskDao.find(querySpec, function(err, items) {
      if (err) {
        throw (err);
      }
      res.send(items);
    });
//    var entities = [
//        { name: "Walter", lastname: "Montes" }
//    ];
//    res.send(entities);
});

app.post('/users', function (req, res) {
    var self = this;
    var item = req.body;

    taskDao.addItem(item, function(err) {
      if (err) {
        throw (err);
      }
      res.sendStatus(200);
      });
});


// Levanta el servidor
app.listen(port, function () {
    console.log("Express server listening on port " + port);
});

