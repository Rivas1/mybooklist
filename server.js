const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// app.get('/', (request, response) => {
//     response.sendFile(path.join(__dirname, 'client', 'index.html'));
// });

// Set static folder
app.use(express.static(path.join(__dirname, 'client')));

app.listen( PORT, () => {
    console.log(`Started on PORT ${PORT}`)
});


