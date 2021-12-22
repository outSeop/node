var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://inssong:seop@cluster0.5wcrw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
var db = mongoose.connection;
db.once('open', () => {
	console.log('DB connected');
});
db.on('error', (err) => {
	console.log('DB ERROR: ', err);
});
var contactSchema = mongoose.Schema({
	name:{type:String, require:true, unique:true},
	email:{type:String},
	phone:{tpye:String}
});
var Contact = mongoose.model('contact', contactSchema);


app.get('/', (req, res) => {
	res.redirect('/contacts');
});
app.get('/contacts', (req, res) => {
	Contact.find({}, (err, contacts) => {
		if (err) return res.json(err);
		res.render('contacts/index', {contacts:contacts});
	});
});

app.get('/contacts/new', (req, res) => {
	res.render('contacts.new');
});

app.post('/contacts', (req, res) => {
	Contact.create(req.body, (err, contact) => {
		res.redirect('/contacts');
	});
});

var port = 3000;
app.listen(port, () => {
	console.log('Servse on! http://localhost:' + port);
});