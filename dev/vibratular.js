(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./app/vibratular":[function(require,module,exports){
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

},{"./vb.directive.js":"/Users/i311181/Repo/mine/slush/vibrateular/app/vibratular/vb.directive.js"}],"/Users/i311181/Repo/mine/slush/vibrateular/app/vibratular/vb.directive.js":[function(require,module,exports){
/**
 * Created by jonnie on 25 Jan 2015.
 */

module.exports = function(){

	function vibrate(pattern, _sleep, delay, loop, animation){

		if(_sleep){
			pattern = addSleepAndLoops(pattern, _sleep, delay, loop);
		}
		console.log('pattern', pattern);
		window.navigator.vibrate(pattern);
		setShakeInterval(pattern, delay, animation);

	}

	var body = document.getElementsByTagName('body')[0];

	function setShakeInterval(intervals, initialWait){
		var animate;

		var index = 0;
		var len = intervals.length;
		var callback = function( ){
			if( index < len ) {
				if (animate) {
					body.classList.add(animation);
					animate = false;
				} else {
					body.classList.remove(animation);
					animate = true;
				}
				index++;
				setTimeout(callback, intervals[index]);
			}else {
				body.classList.remove(animation);
			}
		};

		if(initialWait){
			setTimeout(callback(intervals[index]))
			index++
		}
		else{
			callback(intervals[index]);
		}
	};

	function addSleepAndLoops(pattern, sleeptime, intialSleep, loops){
		var start = intialSleep ? 0 : 1;
		var numOfLoops = loops || 1;
		var p = pattern.slice();
		for(var i = start; i < p.length +1 ; i++){
			p.splice(i,0, sleeptime);
			i++;
		};
		if(!loops || loops === 1) return p;

		var loopedPattern = [];
		for(var i = 0; i < numOfLoops; i++) {
			var loop = p.slice();
			loopedPattern = loopedPattern.concat(loop);
		}

		return loopedPattern;
	}


	return {
		restrict: 'A',
		scope:{
			time: '@vbTime',
			pattern: '=vbPattern',
			vbSleep: '@vbSleep',
			vbLoop: '@vbLoop'
		},
		link: function(scope, elem, attrs){
			elem.bind('click', function(){
				vibrate(scope.pattern, scope.vbSleep, false, 1, 'vibrate');
				scope.$apply();
			});
		}
	};

};
},{}]},{},["./app/vibratular"]);

//# sourceMappingURL=vibratular.js.map