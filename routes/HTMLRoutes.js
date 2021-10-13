const express = require('express');
const app = express();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../develop/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../develop/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    const newNote = JSON.parse(fs.readFileSync('../develop/db/db.json'));
    res.json(newNote);
});

app.post('/api/notes', (req, res) => {
    const newNote = JSON.parse(fs.readFileSync('../develop/db/db.json'));
    const noteID = Object.assign(req.body, { id: `${uuidv4()}` });
    newNote.push(noteID);
    const noteString = JSON.stringify(newNote);
    fs.writeFileSync('../develop/db/db.json', noteString);
    res.json(newNote);
});

module.exports = app;