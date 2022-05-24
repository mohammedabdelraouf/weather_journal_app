
// Setup empty JS object to act as endpoint for all routes
projectData = {} ;
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Spin up the server
const port = 3000 ;
const server = app.listen(port , listening);
// Callback to debug
function listening() {
    console.log("server is running on localhost: " + port);
}
//GET route that returns the projectData object
app.get('/all', sendData);

function sendData (request, response) {
    response.send(projectData);
   // projectData=[];
}

// POST route
app.post('/add', reciveData);

function reciveData(request, response) {
    console.log(request.body);
    let newData =
    {
        
    temperature : request.body.temperature ,
    date :request.body.date ,
    city : request.body.city,
    feelings: request.body.feeling
    } ;
    projectData=newData;
    response.end();
   // console.log(projectData);
}
 