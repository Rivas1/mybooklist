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
// Set static folder
app.use(express.static(path.join(__dirname, 'client')));


// Init middleware
app.use(logger);

// Create connection
const db = mysql.createConnection({
    host    : "localhost",
    user    : 'vesper',
    password: 'test123',
    database: 'mybooks'
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

app.post('/api/create_book',  (request, response) => {
    console.log("A post request has been made to /addbook"); // to cmd
    
    const title = request.body.title;
    const author = request.body.author;
    const isbn = request.body.isbn;
    
    // Make sure parameters are being passed to server
    console.log(title);
    console.log(author);
    console.log(isbn);

    // let's add the book to the server.
    let book = {title: `${title}`, author: `${author}`, isbn: `${isbn}`};
    let sql = 'INSERT INTO books SET ?';
    let query = db.query(sql, book, (err, result) => {
        if (err) throw err;
        else console.log(result);
        response.status(200).send(`${book.title} has been added`);
    });
    
});

// Add 1 book
app.get('/addbook1', (request, response) => {
    let book = {title:'The API Book', author:'MYSQL Rivas', isbn: 9000};
    let sql = 'INSERT INTO books SET ?';
    let query = db.query(sql, book, (err, result) => {
        if (err) throw err;
        else console.log(result);
        response.send('Book 1 was added!');
    });
});

// Add 2 book
app.get('/addbook2', (request, response) => {
    let book = {title:'The Second Book', author:'Vesper', isbn: 302};
    let sql = 'INSERT INTO books SET ?';
    let query = db.query(sql, book, (err, result) => {
        if (err) throw err;
        else console.log(result);
        response.send('Book 2 was added!');
    });
});

// Test route
app.get('/api/books', (request, response ) => {
    response.json("Welcome to the api");
});

app.listen( PORT, () => {
    console.log(`Started on PORT ${PORT}`)
});


