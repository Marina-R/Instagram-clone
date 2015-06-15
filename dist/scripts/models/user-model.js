var $ = require('jquery');
var validator = require('validator');
var Backbone = require('backbone');
Backbone.$ = $;

module.exports = Backbone.Model.extend({
	defaults: {
		_id: null, 
		username: null,
		password: null,
		email: null,
		fullName: null,
		createdAt: new Date()
	},
	urlRoot: 'http://tiny-pizza-server.herokuapp.com/collections/marina-instagram-users',
	attributeId: '_id',
	validate: function(attr) {
		if(!attr.username) {
			return 'You must enter a username.';
		}
		else if(!attr.password) {
			return 'You must enter a password.';
		}
		else if(!validator.isAlphanumeric(attr.username)) {
			return 'Username must conly contain letters and numbers.';
		}
		else if(attr.password.length < 6) {
			return 'Your password must be at least six characters.';
		}
		return false;
	}
});