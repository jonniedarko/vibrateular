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