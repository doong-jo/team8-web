const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override');

const path = require('path'),
    fs = require('fs'),
    has = require('has'),
    os = require('os'),
    http = require('http'),
    https = require('https'),
    mongoose = require('mongoose');

const SSLoptions = {  
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

// TODO : use process.env
const port1 = 1212,
    // port2 = 443,
    tempDir = __dirname + '/temp_files/',
    mongoURI = 'mongodb://josungdong:01034823161@localhost:25321/admin';
	  
//mongoose.connect('mongodb://username:password@host:port/database?options...');
// const category = require('./routes/api/category');

/*---------------------------------SETUP----------------------------------*/

//////////////////////////////////SET EXPRESS CONFIGS///////////////////////////

app.locals.mongodb = 'mongodb';

app.use(express.static(path.resolve('public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(tempDir));

if ('development' == app.get('env')) {
    app.use(errorHandler());
}

process.on('uncaughtException', function(err) {
    console.log(err.stack);
});

////////////////////////////////////////////////////////////////////////////////

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
	
    // db.createCollection("tracking");
});


const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    useNewUrlParser: true
};

mongoose.connect(mongoURI, option).then(function(){
    //connected successfully
    console.log('connect successfully');
}, function(err) {
    //err handle
});

// const authApi = require('./routes/api/auth'),
const mainRouter = require('./routes/index');

// authApi.setRedisStore(redisStoreInfo);
/*----------------------------------------------------------------------------*/


// include connections of socket, mongodb

/*-------------------------AUTHENTIFICATION FUNCTIONS-------------------------*/


/*----------------------------------------------------------------------------*/

/*--------------------------------ROUTING-------------------------------------*/


// app.get('/', (req, res) => {
// 	res.send("Hello seoul fooding!");
// });
// app.all('*', checkAuth);
app.use(express.static('public'));
app.use('/', mainRouter);


http.createServer(app).listen(port1, () => {
    console.log("Express server listening on port " + port1);
});

// https.createServer(SSLoptions, app).listen(port2, () => {
//     console.log("Express server listening on port " + port2);
// });
/*----------------------------------------------------------------------------*/

/*--------------------------------EXECUTE-------------------------------------*/

// const fork = function() { };

// const numCPUs = os.cpus().length;

// if (numCPUs === 1) {
// // 	fork();	
// } else {
// 	if (cluster.isMaster) {
// 		for (var i = 0; i < numCPUs; i++) {
// 			cluster.fork();
// 		}

// 		cluster.on('exit', (worker, code, signal) => {
// 			var exitCode = worker.process.exitCode;
// 			console.log('DEV ( app.js / fork ) worker ' + worker.process.pid + ' died ('+exitCode+'). restarting...');
// 			cluster.fork();
// 		});

// 		cluster.on('online', (worker) => {
// 			console.log("DEV ( app.js / fork ) worker %s (%s) online", worker.id, worker.process.pid);
// 		});

// 		cluster.on('listening', (worker, address) => {
// 			console.log("DEV ( app.js / fork ) worker %s listening %s:%s", worker.id, address.address, address.port);
// 		});
// 	} 
// 	else {
// 	// 	fork();
// 	}	
// }

//Error: listen EADDRINUSE :::4000
//$ ps -ef | grep app.js 
//kill -9 pid

/*----------------------------------------------------------------------------*/