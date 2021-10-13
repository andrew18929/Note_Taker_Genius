const express = require('express');
const app = express();

let PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//require('./routes/HTMLRoutes')(app);
const htmlRoutes = require('./routes/htmlRoutes');
app.use('/', htmlRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../develop/public/index.html'));
});

app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
});