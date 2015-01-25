/**
 * Created by jonnie on 16 Jan 2015.
 */
angular.module('vibratular', [])
	.directive('vb', require('./vb.directive.js'))
	.controller('test', function($scope){
		$scope.hello = "Hello World!!"
		$scope.pattern = [50, 100, 200, 100, 400, 100, 800, 100, 1000];
		$scope.pattern2 = [1000];
	});
