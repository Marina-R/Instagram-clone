var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('../node_modules/backbone/node_modules/underscore');
var moment = require('moment');
Backbone.$ = $;

$(document).ready(function() {
	var UserCollection = require('./collections/users-collection.js');
	var PhotoCollection = require('./collections/photos-collection.js');
	var CommentCollection = require('./collections/comments-collection.js');
	var TagCollection = require('./collections/photoTags-collection.js');
	var UserModel = require('./models/user-model.js');
	var PhotoModel = require('./models/photo-model.js');
	var CommentModel = require('./models/comment-model.js');
	var TagModel = require('./models/photoTag-model.js');
	var Routes = require('./routes.js');
	var PhotoBoard = new PhotoCollection();
	var CommentBoard = new CommentCollection();

	var app = new Routes();
	Backbone.history.start();

	var users = new UserCollection();
	var loggedInUser = false;

	users.fetch({
		success: function (newlyFetchedCollection) {
			$('#register-form').on('submit', function(e) {
				e.preventDefault();
				$('#register-error').html('');
				var newUser = new UserModel({
					username: $('#register-username').val(),
					password: $('#register-password').val(),
					email: $('#register-email').val(),
					fullName: $('#register-fullname').val(),
					createdAt: new Date()	
				});

				if(!newUser.isValid()) {
					$('#register-error').html(newUser.validationError);
				}
				else {
					var existedUser = false;
					for(var i=0; i<newlyFetchedCollection.models.length; i++) {
						if(newUser.attributes.username == newlyFetchedCollection.models[i].attributes.username) {
							existedUser = true;
							break;
						}
					}
					if(existedUser)	{
						$('#register-error').html('Please choose another username');
					} else {
						$('#personal-username').html(newUser.attributes.username);
						$('#accounts').html(newUser.attributes.username);
						newUser.save();
						app.navigate('main', {trigger: true});
						PhotoBoard.fetch({
							success: function() {
								CommentBoard.fetch();
								// code for taking all af the pics with comments from server
							}
						})
					}
				}
			});

			$('#login-form').on('submit', function(e) {
				e.preventDefault();
				$('#login-error').html('');
				var currentUser = new UserModel({
					username: $('#login-username').val(),
					password: $('#login-password').val()	
				});

				if(!currentUser.isValid()) {
					$('#login-error').html(currentUser.validationError);
				}
				else {
					loggedInUser = users.findWhere({
						username: $('#login-username').val(),
						password: $('#login-password').val()
					});
					if(loggedInUser) {
						$('#personal-username').html(currentUser.attributes.username);
						$('#main-username').html(currentUser.attributes.username);
						app.navigate('main', {trigger: true});
						PhotoBoard.fetch({
							success: function() {
								CommentBoard.fetch();
							}
						})
					}
					else {
						$('#login-error').html('Your username / password combination is incorrect.');
					}
				}
			});
		}
	});

	$('#login-register-button').click(function() {
		app.navigate('signup', {trigger: true});
	});

	var photoPoster = _.template($('#to-post').html());
	var comPoster = _.template($('#comments').html());

	$('#add').click(function() {
		$('#add-post').show();
	});

	$('#btn1').click(function(e) {
		e.preventDefault();
		var Photo = new PhotoModel({
			url: $('#img-url').val(),
			caption: $('#img-text').val(),
			createdAt: (function setTime() {
					var date = new Date();
					var today = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
					return today;
				})(),
			likes: 0,
			userId: $('#personal-username').html()
		});
		if(Photo.isValid()) {
			PhotoBoard.comparator = '_id';
			PhotoBoard.add(Photo);
			Photo.save();
			$('#img-url').val('');
			$('#img-text').val('');
			$('#add-post').hide();
		} 
	});
	$('#btn2').click(function(e) {
		e.preventDefault();
		$('#img-url').val('');
		$('#img-text').val('');
		$('#url-error').hide();
		$('#caption-error').hide();
		$('#add-post').hide();
	});	

	PhotoBoard.on('add', function(photo){
		$('#main-page-content').append(photoPoster({model: photo}));
		$('[data-form-cid="' + photo.cid + '"]').on('submit', function(e) {
			e.preventDefault();
			var $commentInput = $(this).find('.comment-input');
			var UserComment = new CommentModel({
				userId: $('#personal-username').html(),
				text: $commentInput.val(),
				photoId: photo.get('_id')
			});
			if(UserComment.isValid()) {
				CommentBoard.comparator = '_id';
				CommentBoard.add(UserComment);
				UserComment.save();
				$('.comment-input').val('');
			};
		})
	});

	CommentBoard.on('add', function(addedComment) {
		var photoId = addedComment.get('photoId');
		console.log(photoId);
		console.log(PhotoBoard)
		var photoModel = PhotoBoard.get(photoId);
		console.log(photoModel.cid);
		
		if(photoModel) {
			$('[data-cid="' + photoModel.cid + '"] .user-comments').append(comPoster({model: addedComment}));
		};
		// $('[data-btn-cid="' + addedComment.cid + '"]').on('click', function() {
		// 	var likes = addedComment.get('likes');
		// 	likes++;
		// 	console.log(likes);
		// 	addedComment.set({likes: likes});
		// 	var $numOfLikes = $('[data-cid="' + imageModel.cid + '"] .like-counter').html();
		// 	$numOfLikes = likes;
		// 	// $numOfLikes.html()
		// 	// console.log($numOfLikes);

		// });
	});
	$('#main-username').click(function() {
		app.navigate('accounts/' + $('#personal-username').html(), {trigger: true});
		$('#user-feed').html('');
		PhotoBoard.fetch({
			success: function(photoCollection) {
				var photoArray = photoCollection.models;
				for(var i=0; i<photoArray.length; i++) {
					var photo = null;
					if(photoArray[i].attributes.userId == $('#personal-username').html()) {
						photo = photoArray[i];
						$('#user-feed').append(photoPoster({model: photo}));
					}
				}
			}
		});
	})
})