var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

module.exports = Backbone.Model.extend({
	defaults: {
		_id: null, 
		photoId: null,
		userId: null,
		text: null,
		createdAt: new Date()
	},
	validate: function(attr) {
		if(attr.text.length == 0) {
			$('.comment-error').show();
			return true;
		}
		$('.comment-error').hide();
		return false;
	},
	urlRoot: 'http://tiny-pizza-server.herokuapp.com/collections/marina-instagram-comments',
	attributeId: '_id' 
});