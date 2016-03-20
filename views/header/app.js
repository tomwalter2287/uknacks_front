define(['angularAMD'], function(app) {
    app.controller('headerCtrl', [
        'localStorageService',
        '$scope',
        '$rootScope',
        '$modal',
        '$timeout',
        '$resource',
        '$state',
        'tokenError',
        function(localStorageService, $scope, $rootScope, $modal, $timeout, $resource, $state) {

            $rootScope.new_message_count = 0;
            $scope.new_messages = null;

            var new_messages_resource = $resource(":protocol://:url/api/chat/new_messages",{
                protocol: $scope.restProtocol,
                url: $scope.restURL
            },{
                'query': {method: 'GET', isArray: true, ignoreLoadingBar: true }
            });
            if($rootScope.profile_user) {
                (function tick() {
                    new_messages_resource.query(function (result) {
                        $scope.new_messages = result;
                        $rootScope.new_message_count = result.length;
                        $timeout(tick, 5000);
                    }, function (error) {
                        $timeout(tick, 5000);
                    });
                })();
            }
            
            $scope.openLoginModal = function () {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'views/modals/register-modal.html',
                    controller: 'LoginModalCtl',
                    windowClass: 'vcenter-modal'
                });

                modalInstance.result.then(function (data) {
                        console.log(data);
                        $state.go('private-profile');
                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    }
                );
            };
             
            /*
            $scope.openLoginModal = function () {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'views/modals/login-modal.html',
                    controller: 'LoginModalCtl',
                    windowClass: 'vcenter-modal'
                });

                modalInstance.result.then(function (data) {
                        console.log(data);
                        $state.go('private-profile');
                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    }
                );
            };
            */
            $scope.registerModal = function () {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'views/modals/register-email-modal.html',
                    controller: 'RegisterEmailModalCtl',
                    windowClass: 'vcenter-modal'
                });

                modalInstance.result.then(function (data) {
                        console.log(data);
                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    }
                );
            };
            
            $scope.signout = function() {
                localStorageService.clearAll();
                $rootScope.restricted();
                $state.go('home');
            };
            $scope.$on('$destroy', function(){
                if (angular.isDefined(promise)) {
                    $interval.cancel(promise);
                    promise = undefined;
                }
            });

            $scope.toggleResponsiveSidebar = function() {
                $rootScope.isResponsiveSideShow = !$rootScope.isResponsiveSideShow;
            };
            $scope.isShowPaymentBox = false;
            $scope.isShowNotificationBox =false;
            $scope.showPaymentBox = function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                $scope.isShowPaymentBox = true;
                $scope.isShowNotificationBox = false;
            };
            $scope.showNotificationBox = function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                $scope.isShowNotificationBox = true;
                $scope.isShowPaymentBox = false;
            };
            $scope.hideDropDownBox = function() {
                $scope.isShowPaymentBox = false;
                $scope.isShowNotificationBox = false;
            };

            $scope.toggleSidebar = function() {
                $rootScope.isSidebarOpen = !$rootScope.isSidebarOpen;
            }
            

    }]);
});