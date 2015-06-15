var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

module.exports = Backbone.Model.extend({
	defaults: {
		_id: null, 
		photoId: null,
		text: null,
		createdAt: new Date()
	},
	urlRoot: 'http://tiny-pizza-server.herokuapp.com/collections/marina-instagram-tags',
	attributeId: '_id' 
});