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

databaseSetting();
var Contact = contactSchemaSetting();
redirectContacts();
renderIndex();
renderNewPage();
createNewUser();
show();
edit();
update();
destroy();
openPort();



function databaseSetting() {
	mongoose.connect("mongodb+srv://inssong:seop@cluster0.lhcrl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
	var db = mongoose.connection;
	db.once('open', () => {
		console.log('DB connected');
	});
	db.on('error', (err) => {
		console.log('DB ERROR: ', err);
	});
}

function contactSchemaSetting() {
	var contactSchema = mongoose.Schema({
		name:{type:String, require:true, unique:true},
		email:{type:String},
		phone:{tpye:String}
	});
	return Contact = mongoose.model('contact', contactSchema);

}
function redirectContacts() {
	app.get('/', (req, res) => {
		res.redirect('/contacts');
	});
}

function renderIndex() {
	app.get('/contacts', (req, res) => {
		Contact.find({}, (err, contacts) => {
			if (err) return res.json(err);
			res.render('contacts/index', {contacts:contacts});
		});
	});
}

function renderNewPage() {
	app.get('/contacts/new', (req, res) => {
		res.render('contacts/new');
	});
}

function createNewUser() {
	app.post('/contacts', (req, res) => {
		Contact.create(req.body, (err, contact) => {
			res.redirect('/contacts');
		});
	});
}

function show() {
	app.get('/contacts/:id', (req, res) => {
		Contact.findOne({_id:req.params.id}, (err, contact) => {
			if (err) return res.json(err);
			res.render('contacts/show', {contact:contact});
		});
	});
}

function edit() {
	app.get('/contacts/:id/edit', (req, res) => {
		Contact.findOne({_id:req.param.id}, (err, contact) => {
			if (err) return res.json(err);
			res.render('contacts/edit', {contact:contact});
		});
	});
}

function update() {
	app.put('/contacts/:id', (req, res) => {
		Contact.findOneAndeUpdate({_id:req.params.id}, req.body, (err, contat) => {
			if (err) return res.json(err);
			res.redirect('/contacts/'+ req.params.id);
		});
	});
}

function destroy() {
	app.delete('/contacts/:id', (req, res) => {
		Contact.deleteOne({_id:req.params.id}, (err) => {
			if (err) return res.json(err);
			console.log("Destroy user data!");
			res.redirect('/contacts');
		});
	});
}

function openPort() {
	var port = 3000;
	app.listen(port, () => {
		console.log('Servse on! http://localhost:' + port);
	});
}