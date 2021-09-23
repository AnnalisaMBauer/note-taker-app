const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// links to my assets
app.use(express.static('public'));

// page will load with index.html 
app.get('/',(req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

// then with notes.html
app.get('/notes',(req, res) => {
res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// GET, POST, DELETE Notes

app.get('/api/notes', (req, res) => {
    res.json(`${req.method} request received to notes.`)

    console.log(`${req.method} request received to notes.`)
});

app.post('/api/notes', (req, res) => {

    console.log(`${req.method} request received to add a note`)
});

fs.readFile('./db', 'utf8', function(err, data){
    const notes = JSON.parse(data);

    notes.push();

    const noteString = JSON.stringify(notes);

    fs.writeFile(`./db`, noteString, (err) =>
    err
    ? console.error(err)
    :console.log(`New note has been written to JSON file`)
    );

 
})

app.listen(PORT, () =>
 console.log(`App listening at http://localhost:${PORT}  🚀`)
);