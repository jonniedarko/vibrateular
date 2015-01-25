/**
 * Created by jonnie on 16 Jan 2015.
 */
angular.module('vibratular', [])
	.directive('vb', require('./vb.directive.js'))
	.controller('test', function($scope){
		$scope.hello = "Hello World!!"
		$scope.pattern = [50, 100, 200, 400, 800, 1000];
		$scope.pattern2 = [{on:50, off:0}, {on:100, off:100}, {on:200, off:200}, {on:400, off:400}, {on:800, off:800}, {on:1000, off:1000}];
	});
