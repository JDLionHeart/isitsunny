app = angular.module('sunnyApp', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider

	.when('/', {
		templateUrl : '/partials/main.html',
		controller  : 'mainCtrl'
	});


});
