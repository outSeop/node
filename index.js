var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
	res.redirect('/contacts');
});

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