const express = require('express');
const app = express();

let PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

require('./routes/APIRoutes')(app);
require('./routes/HTMLRoutes')(app);

app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
});