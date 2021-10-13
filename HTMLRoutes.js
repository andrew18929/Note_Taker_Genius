const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    const note = JSON.parse(fs.readFileSync('Develop/db/db.json'));
    res.json(note);
});

app.post('/api/notes', (req, res) => {
    const note = JSON.parse(fs.readFileSync('Develop/db/db.json'));
    const noteID = Object.assign(req.body, { id: `${uuidv4()}` });
    note.push(noteID);
    const noteString = JSON.stringify(note);
    fs.writeFileSync('Develop/db/db.json', noteString);
    res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
    const note = JSON.parse(fs.readFileSync('Develop/db/db.json'));
    const noteID = req.params.id;
    for (let i = 0; i < note.length; i++) {
        if (note[i].id === noteID) {
            note.splice(i, 1);
            const newNote = JSON.stringify(note);
            fs.writeFileSync('Develop/db/db.json', newNote);
            return res.json(note);
        }
    }
});

module.exports = app;