var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var TagModel = require('../models/photoTag-model.js');

module.exports = Backbone.Collection.extend({
	model: TagModel,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/marina-instagram-tags'
})