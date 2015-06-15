var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var PhotoModel = require('../models/photo-model.js');

module.exports = Backbone.Collection.extend({
	model: PhotoModel,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/marina-instagram-photos'
})