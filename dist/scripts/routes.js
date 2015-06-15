var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

module.exports = Backbone.Router.extend({
	routes: {
		'': 'home',
		'login': 'login',
		'signup': 'registration',
		'main': 'gotoMain',
		'accounts/:userName': 'gotoUserAccount'
	},
	home: function() {
		$('section').hide();
		$('#welcome-page').show();
	},
	login: function() {
		$('section').hide();
		$('#login-page').show();
	},
	registration: function() {
		$('section').hide();
		$('#signup-page').show();
	},
	gotoMain: function() {
		$('section').hide();
		$('#main-page').show();
	},
	gotoUserAccount: function(userName) {
		$('section').hide();
		$('#profile-page').show();
	}
});

 
