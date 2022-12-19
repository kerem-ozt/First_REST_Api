//Include HTTP module and app file
const http = require('http');
const app = require('./app');

//Specify 8080 port for run
const port = process.env.PORT || 8080;

//Create server and listen for requests
const server = http.createServer(app);
server.listen(port);