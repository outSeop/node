var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/hello', (req, res) => {
	res.render('hello', {name:req.query.nameQuery});
});

app.get('/hello/:nameParam', (req, res) => {
	res.render('hello', {name:req.params.nameParam});
});

var port = 3000;
app.listen(port, () => {
	console.log('Servse on! http://localhost:' + port);
});