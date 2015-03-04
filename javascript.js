var app = angular.module('myApp',[]);
app.controller('carController', ['$scope', 'speeds', function($scope, speeds){
	
	$scope.isRunning = false;
	$scope.$watch('speed', function(newValue, oldValue) {
		if(newValue !== oldValue) {
			speeds.setSpeed(parseInt(newValue));
		}
	});

	$scope.run = function(){
		var speed = speeds.getSpeed()
		if (speed) {
			$scope.isRunning = true;
			$("#car").css({left: '0%'});
			$("#car").animate({left: '40%'},speed,'linear',enableRun);
		}
	}

	function enableRun() {
		$scope.isRunning = false;
		$scope.$apply();
	}

}]);

app.provider("speeds",function(){
	this.speed = null;
	this.$get = function(){
		
		function getSpeed() {
			return this.speed;
		}
		return {
			getSpeed: getSpeed
		}
	}
});

//setting up the initial speed using config and $provider.$provide can only be inserted in config and nowhere else.
app.config(function($provide) {
	$provide.decorator('speeds', function($delegate){
		//decorating speeds service by adding a new setSpeed method .Now everywhere in the moudle can call setSpeed method through speeds service.
		$delegate.setSpeed = function(s) {
			this.speed = s;
		};
		return $delegate;
	});
})