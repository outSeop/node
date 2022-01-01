var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

redirectContacts();
app.use('/', require('./routes/home'));
app.use('/contacts', require('./routes/contacts'));

openPort();




function redirectContacts() {
	app.get('/', (req, res) => {
		res.redirect('/contacts');
	});
}


function openPort() {
	var port = 3000;
	app.listen(port, () => {
		console.log('Servse on! http://localhost:' + port);
	});
}