var mongoose = require('mongoose');

databaseSetting();
contactSchemaSetting();

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
		phone:{type:String}
	});
	return Contact = mongoose.model('contact', contactSchema);

}

module.exports = Contact;