'use strict';
define(['app', 'WOW', 'owl.carousel'], function(app, WOW, owlCarousel) {
    app.register.controller('indexCtrl', [
        'localStorageService',
        '$scope',
        '$rootScope','$timeout', '$state',
        function(localStorageService, $scope, $rootScope, $timeout, $state) {
            $rootScope.currentMenu = "home";
            if (typeof WOW === 'function') {
				new WOW({
					boxClass:     'wow',      // default
					animateClass: 'animated', // default
					offset:       0          // default
				}).init();
			}

            $timeout(function(){jQuery('.tweet_list').owlCarousel({
	            loop:true,
				margin:0,
				responsiveClass:true,
				nav:false,
				dots: true,
				autoplay: true,
				autoplayTimeout: 20000,
				autoHeight: false,
				smartSpeed: 400,
				responsive:{
					0: {
						items:1
					},
					768: {
						items:2
					},
					1200: {
						items:3
					}
				}
	        });});/**/

            $scope.getStart = function () {
                $timeout(function() {
                    if(!$rootScope.is_authenticated) {
                        angular.element("#id-sign-up").triggerHandler('click');
                    } else {
                        $state.go("knack-offered");
                    }
                }, 0);
            }
    }]);
});