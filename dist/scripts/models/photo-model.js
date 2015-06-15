var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

module.exports = Backbone.Model.extend({
	defaults: {
		_id: null, 
		userId: null,
		url: null,
		likes: 0,
		createdAt: null,
		caption: null
	},
	validate: function (attr, options) {
		if((attr.url.substr(0,7) == 'http://' || attr.url.substr(0,8) == 'https://')
			&&  attr.caption.length !== 0) {
			return false;
		} else if(!(attr.url.substr(0,7) == 'http://' || attr.url.substr(0,8) == 'https://')) {
			$('#url-error').show();
			return true;
		} else if(attr.caption.length == 0) {
			$('#url-error').hide();
			$('#caption-error').show();
			return true;
		}
		return false;
	},
	urlRoot: 'http://tiny-pizza-server.herokuapp.com/collections/marina-instagram-photos',
	attributeId: '_id' 
});
