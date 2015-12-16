var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var errorHandler = require('errorhandler');
var session = require('express-session');
var http = require('http');

var config = require('./config');
var io = require('./socket');
var routes = require('./routes/routes');
var anuncios = require('./routes/anuncios');

var app = express();
var server = http.createServer(app);


// session
app.use(session({
  secret: 'super.gato'
}));

// Set port
app.set('port', config.port );
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.post('/api/auth/login', routes.login);
app.get('/partials/:name.html', routes.partials);
app.use('/api/anuncios', anuncios)




// error handling middleware should be loaded after the loading the routes
if ('development' == config.env ) {
  app.use(errorHandler());
}

// Socket.IO
io.attach(server);



// Server Listener
server.listen(config.port);
server.on('listening', function(){
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
});
