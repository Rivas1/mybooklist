const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const logger = require('./middleware/logger')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// Init middleware
app.use(logger);

// Create connection
const db = mysql.createConnection({
    host    : "localhost",
    user    : 'vesper',
    password: 'test123'
});

// Connect to DB
db.connect( (err ) => {
    if ( err) {
        throw err;
    }
    else console.log("MySQL connected succesflly...");
});

// Create DB
app.get('/createdb', (request, response) => {
    let sql = 'CREATE DATABASE mybooks';
    db.query(sql, (err, result) => {
        if (err) throw err;
        else console.log(result);
        response.send('Database created successfully!');
    });
});

// Test route
app.get('/api/books', (request, response ) => {
    response.json("Welcome to the api");
});

// Set static folder
app.use(express.static(path.join(__dirname, 'client')));

app.listen( PORT, () => {
    console.log(`Started on PORT ${PORT}`)
});


