var express = require('express');
var app = express();

console.log('Server is up');


app.use(express.static('public'));
app.listen(process.env.PORT || 5555);
