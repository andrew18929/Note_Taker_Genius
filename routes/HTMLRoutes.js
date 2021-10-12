const express = require('express');
const fs = require('fs');

const path = require('path');

// this is where I would add module.exports. Need to figure out how to code it
module.exports = function(app) {
    app.get('/api/notes', function (req, res) {
        res.sendFile(path.join(__dirname, 'public/notes.html'));
    });

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });
};