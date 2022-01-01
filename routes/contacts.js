var express = require('express');
var router = express.Router();
var Contact = require('../models/Contacts');

renderIndex();
renderNewPage();
createNewUser();
show();
edit();
update();
destroy();

function renderIndex() {
	router.get('/', (req, res) => {
		Contact.find({}, (err, contacts) => {
			if (err) return res.json(err);
			res.render('contacts/index', {contacts:contacts});
		});
	});
}

function renderNewPage() {
	router.get('/new', (req, res) => {
		res.render('contacts/new');
	});
}

function createNewUser() {
	router.post('/', (req, res) => {
		Contact.create(req.body, (err, contact) => {
			res.redirect('/contacts');
		});
	});
}

function show() {
	router.get('/:id', (req, res) => {
		Contact.findOne({_id:req.params.id}, (err, contact) => {
			if (err) return res.json(err);
			res.render('contacts/show', {contact:contact});
		});
	});
}

function edit() {
	router.get('/:id/edit', (req, res) => {
		Contact.findOne({_id:req.params.id}, (err, contact) => {
			if (err) return res.json(err);
			res.render('contacts/edit', {contact:contact});
		});
	});
}

function update() {
	router.put('/:id', (req, res) => {
		Contact.findOneAndUpdate({_id:req.params.id}, req.body, (err, contat) => {
			if (err) return res.json(err);
			res.redirect('/contacts/'+ req.params.id);
		});
	});
}

function destroy() {
	router.delete('/:id', (req, res) => {
		Contact.deleteOne({_id:req.params.id}, (err) => {
			if (err) return res.json(err);
			console.log("Destroy user data!");
			res.redirect('/contacts');
		});
	});
}

module.exports = router;