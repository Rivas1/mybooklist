const express = require('express');
const path = require('path');
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

// Gets all books
// app.get('/api/books', (request, response) => {
//     response.json(books)
// });

// Set static folder
app.use(express.static(path.join(__dirname, 'client')));

app.listen( PORT, () => {
    console.log(`Started on PORT ${PORT}`)
});


