var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var CommentModel = require('../models/comment-model.js');

module.exports = Backbone.Collection.extend({
	model: CommentModel,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/marina-instagram-comments'
})