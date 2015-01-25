(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./app/vibratular":[function(require,module,exports){
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

},{"./vb.directive.js":"/Users/i311181/Repo/mine/slush/vibrateular/app/vibratular/vb.directive.js"}],"/Users/i311181/Repo/mine/slush/vibrateular/app/vibratular/vb.directive.js":[function(require,module,exports){
/**
 * Created by jonnie on 25 Jan 2015.
 */

module.exports = function ($window){
	//var vb =

	function vibrate(time, pattern, loop){
		var _time = time || 100;

		if(!pattern && !loop ) {
			console.log('pattern', pattern);
			console.log('loop', loop);
			$window.navigator.vibrate(_time);
			return;
		}
		if(pattern){
			var count = loop || 1;
			console.log('pattern', pattern);
			vibratePattern(pattern);
			/*for(var i = 0; i < count; i++){
				for(var index = 0, len = pattern.length; index < len ; index++){
					console.log('index['+index+']', pattern[index]);
					setTimeout($window.navigator.vibrate(pattern[index]), pattern[index] + 100);
				}
			}*/
		}
	}// end vibrate

	function vibratePattern (pattern, index) {

		var i = index || 0;
		var timeout = //pattern[i] ||
			i > 0 ? pattern[i - 1] +200 : 0;

		setTimeout(function () {
			$window.navigator.vibrate(pattern[i]);
			console.log('i = ' + i + ' | pattern['+i+'] = '+pattern[i]+ ' | timeout = '+timeout);
			if (i < pattern.length - 1) vibratePattern(pattern, i+1);      //  decrement i and call myLoop again if i > 0
		}, timeout);
	};

	return{
		restrict: 'A',
		scope:{
			time: '@vbTime',
			pattern: '=vbPattern'
		},
		link: function(scope, elem, attrs){
			console.log('scope.vbTime', scope.time);
			//elem[0].onclick($window.navigator.vibrate(1000));
			elem.bind('click', function(){

				vibrate(scope.time, scope.pattern, null);
				scope.$apply();
			})

		}
	}

};
},{}]},{},["./app/vibratular"]);

//# sourceMappingURL=vibratular.js.map