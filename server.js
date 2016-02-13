// server.js

/**
 * BASE SETUP
 */

var mongoose   = require('mongoose');

var DB_HOST = process.env.DB_HOST;
var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;
var DB_DATABASE = process.env.DB_DATABASE;

var connectionString = 'mongodb://' + 
                       DB_USER + 
                       ':' + 
                       DB_PASSWORD +
                       '@' +
                       DB_HOST +
                       '/' +
                       DB_DATABASE;
console.log('Connecting to database with ', connectionString);

mongoose.connect(connectionString);

var Bear       = require('./app/models/bear');

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let use get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

/**
 * Routes for our API
 */
var router = express.Router();

router.use(function(request, response, next) {
  console.log('Incoming request: ' + request.originalUrl);
  next();
});

router.route('/bears')
  .post(function(request, response) {
    var bear = new Bear();
    bear.name = request.body.name;

    bear.save(function(error) {
      if (error) {
        response.send(error);
      }

      response.json({ message: 'Bear created' });
    });
  })
  .get(function(request, response) {
    Bear.find(function(error, bears) {
      if (error) {
        response.send(error);
      }

      response.json(bears);
    });
  });


router.route('/bears/:bearId')
  .get(function(request, response) {
    Bear.findById(request.params.bearId, function(error, bear) {
      if (error) {
        response.send(error);
      }

      response.json(bear);
    });
  })

  .put(function(request, response) {
    Bear.findById(request.params.bearId, function(error, bear) {
      if (error) {
        response.send(error);
      }

      bear.name = request.body.name;

      bear.save(function(error) {
        if (error) {
          response.send(error);
        }

        response.send({ message: 'Bear updated!' });
      });
    });
  })

  .delete(function(request, response) {
    Bear.remove({
      _id: request.params.bearId
    }, function(error, bear) {
      if (error) {
        response.send(error);
      }

      response.json({ message: 'Successfully deleted' });
    })
  });

// test route (accessed at GET http://localhost:8080/api)
router.get('/', function(request, response) {
  response.json({ message: 'Bears API!' });
});

// more routes will go here

app.use('/api', router);

// start the server
app.listen(port);
console.log('Listening on port ' + port);
