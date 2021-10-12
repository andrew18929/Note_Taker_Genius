const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

module.exports = function (app) {
    app.get('/api/notes', function (req, res) {
        fs.readFile('db/db.json', 'utf8', function (err, data) {
            res.json(JSON.parse(data));
        });
    });

    app.post('/api/notes', function (req, res) {
        var createNewNote = req.body;
        createNewNote.id = uuidv4();
        fs.readFile('db/db.json', 'utf8', function (err, data) {
            var data = JSON.parse(data);
            data.push(createNewNote);
            fs.writeFile('db/db.json', JSON.stringify(data), function (err) {
                if (err) throw error;
                console.log('Good job!');
            });
        });
        res.json(createNewNote);
    });
}