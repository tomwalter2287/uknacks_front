'use strict';

define(['angularAMD'], function(app) {
    app.controller('PostModalCtl',
        ['$scope', '$rootScope', '$resource', '$modalInstance', '$http', '$state', 'knack_action', 'knack_type' , '$stateParams',
            'localStorageService', 'rest', 'tokenError',
            function ($scope, $rootScope, $resource, $modalInstance, $http, $state, knack_action, knack_type, $stateParams) {
                $scope.knack = {
                    name: '',
                    description: '',
                    price: 0,
                    category: '',
                    type: 'O',
                    photo: ''
                };

                $scope.knack_type = knack_type; // for test
                $scope.knack_action = knack_action;

                if ($state.current.name == 'knack-offered') {
                    $scope.knack.type = 'O';
                }
                else if ($state.current.name == 'knack-wanted') {
                    $scope.knack.type = 'W';
                }
                var post_resource = $resource(":protocol://:url/api/knacks/knacks/", {
                        protocol: $scope.restProtocol,
                        url: $scope.restURL
                    }, {
                        save: {
                            method: 'POST',
                            transformRequest: transFormRequestHandler,
                            headers: {'Content-Type': undefined}
                        }
                    }
                );

                $scope.post_knack = function () {
                    if ($scope.postForm.$valid) {
                        post_resource.save($scope.knack, function (knack) {
                            $modalInstance.close(knack);
                        }, function (error) {
                            $scope.message = error.data;
                            console.log(error);
                        });
                    }
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }]);

    app.controller('EditKnackModalCtl',
        ['$scope', '$rootScope', '$resource', '$modalInstance', '$http', '$state', 'knack_item', 'knack_type', 'rest', 'tokenError',
            function ($scope, $rootScope, $resource, $modalInstance, $http, $state, knack_item, knack_type) {
                $scope.knack = angular.copy(knack_item);
                $scope.knack_type = knack_type;
                /*
                var edit_resource = $resource(":protocol://:url/api/knacks/knacks/:id", {
                        protocol: $scope.restProtocol,
                        url: $scope.restURL,
                        id: $scope.knack.id
                    }, {
                        save: {
                            method: 'PUT',
                            transformRequest: transFormRequestHandler,
                            headers: {'Content-Type': undefined}
                        }
                    }
                );

                $scope.save_knack = function () {
                    if ($scope.postForm.$valid) {
                        edit_resource.save($scope.knack, function (knack) {
                            $modalInstance.close(knack);
                        }, function (error) {
                            $scope.message = error.data;
                            console.log(error);
                        });
                    }
                };*/
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }]);

    app.controller('MakeKnackMineModalCtl',
        ['$scope', '$rootScope', '$resource', '$modalInstance', '$http', '$state', 'knack_item', 'rest', 'tokenError',
            function ($scope, $rootScope, $resource, $modalInstance, $http, $state, knack_item) {
                $scope.knack = angular.copy(knack_item);
                /*
                 var edit_resource = $resource(":protocol://:url/api/knacks/knacks/:id", {
                 protocol: $scope.restProtocol,
                 url: $scope.restURL,
                 id: $scope.knack.id
                 }, {
                 save: {
                 method: 'PUT',
                 transformRequest: transFormRequestHandler,
                 headers: {'Content-Type': undefined}
                 }
                 }
                 );

                 $scope.save_knack = function () {
                 if ($scope.postForm.$valid) {
                 edit_resource.save($scope.knack, function (knack) {
                 $modalInstance.close(knack);
                 }, function (error) {
                 $scope.message = error.data;
                 console.log(error);
                 });
                 }
                 };*/
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }]);

    app.controller('PostItemModalCtl',
        ['$scope', '$rootScope', '$resource', '$modalInstance', '$http', 'item_type', '$state', '$stateParams',
            'localStorageService', 'rest', 'tokenError',
            function ($scope, $rootScope, $resource, $modalInstance, $http, item_type, $state, $stateParams) {
                $scope.item = {
                    name: '',
                    description: '',
                    price: 0,
                    category: '',
                    type: 'O',
                    photo: ''
                };

                $scope.item_type = item_type;   // for test

                if ($state.current.name == 'item-offered') {
                    $scope.item.type = 'O';
                }
                else if ($state.current.name == 'item-wanted') {
                    $scope.item.type = 'W';
                }
                var post_resource = $resource(":protocol://:url/api/items/items/", {
                        protocol: $scope.restProtocol,
                        url: $scope.restURL
                    }, {
                        save: {
                            method: 'POST',
                            transformRequest: transFormRequestHandler,
                            headers: {'Content-Type': undefined}
                        }
                    }
                );

                $scope.post_item = function () {
                    if ($scope.postForm.$valid) {
                        post_resource.save($scope.item, function (knack) {
                            $modalInstance.close(knack);
                        }, function (error) {
                            $scope.message = error.data;
                            console.log(error);
                        });
                    }
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }]);
    app.controller('EditItemModalCtl',
        ['$scope', '$rootScope', '$resource', '$modalInstance', '$http', '$state', 'item', 'item_type', 'rest', 'tokenError',
            function ($scope, $rootScope, $resource, $modalInstance, $http, $state, item, item_type) {
                $scope.item = angular.copy(item);
                $scope.item_type = item_type;

                /*
                var edit_resource = $resource(":protocol://:url/api/items/items/:id", {
                        protocol: $scope.restProtocol,
                        url: $scope.restURL,
                        id: $scope.item.id
                    }, {
                        save: {
                            method: 'PUT',
                            transformRequest: transFormRequestHandler,
                            headers: {'Content-Type': undefined}
                        }
                    }
                );

                $scope.save_item = function () {
                    if ($scope.postForm.$valid) {
                        edit_resource.save($scope.item, function (item) {
                            $modalInstance.close(item);
                        }, function (error) {
                            $scope.message = error.data;
                            console.log(error);
                        });
                    }
                };*/

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }]);
    app.controller('LoginModalCtl',
            ['$scope', '$rootScope', '$resource', '$modalInstance',
                '$http', 'localStorageService', 'rest', '$state', 'restricted',
            function ($scope, $rootScope, $resource, $modalInstance, $http, localStorageService, $state) {
            $scope.user = {
				email: '',
				password: ''
			};
            var AuthToken =  $resource(":protocol://:url/api/accounts/login/", {
    			protocol: $scope.restProtocol,
                url: $scope.restURL
            });

            $scope.login = function () {
                $scope.authToken = AuthToken.save($scope.user, function(){
					localStorageService.add('Authorization', 'Token ' + $scope.authToken.token);
					localStorageService.add('rest_token', $scope.authToken.token);
					localStorageService.add('user_id', $scope.authToken.id);
                    localStorageService.add('full_name', $scope.authToken.full_name);
                    localStorageService.add('college', $scope.authToken.college);
                    localStorageService.add('picture', $scope.authToken.picture);

                    $modalInstance.close();
                    $rootScope.restricted();

                    // $state.go($state.current, {}, {reload: true});
                    // $state.go('knack-offered', {}, {reload: true});
                    // window.location.href='/#/knacks/offered';
                    // window.location.href='/#/';
				},function(error) {
					$scope.message = error.data;
				});
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
    app.controller('RegisterModalCtl',
            ['$scope', '$rootScope', '$resource', '$modalInstance', '$http', 'localStorageService', 'rest', 'restricted',
            function ($scope, $rootScope, $resource, $modalInstance, $http, localStorageService) {
            /*
            $scope.user = {
				email: localStorageService.get('registered_email'),
				password: '',
				gender: ''
			};
            var AuthToken =  $resource(":protocol://:url/api/accounts/register/", {
    			protocol: $scope.restProtocol,
                url: $scope.restURL
            });

            $scope.register = function () {
                $scope.authToken = AuthToken.save($scope.user, function(){
					localStorageService.add('Authorization', 'Token ' + $scope.authToken.token);
					localStorageService.add('rest_token', $scope.authToken.token);
					localStorageService.add('user_id', $scope.authToken.id);
                    localStorageService.add('full_name', $scope.authToken.full_name);
                    localStorageService.add('college', $scope.authToken.college);
                    localStorageService.add('picture', $scope.authToken.picture);

                    $modalInstance.close();
                    $rootScope.restricted();

                    localStorageService.remove('registered_email');
                    // $state.go('home', {}, {reload: true});
                    // window.location.href='/#/profile';
				},function(error) {
					$scope.message = error.data;
				});
            };
            */
            $scope.user = {
                email: '',
                password: ''
            };
            var AuthToken =  $resource(":protocol://:url/api/accounts/login/", {
                protocol: $scope.restProtocol,
                url: $scope.restURL
            });

            $scope.login = function () {
                $scope.authToken = AuthToken.save($scope.user, function(){
                    localStorageService.add('Authorization', 'Token ' + $scope.authToken.token);
                    localStorageService.add('rest_token', $scope.authToken.token);
                    localStorageService.add('user_id', $scope.authToken.id);
                    localStorageService.add('full_name', $scope.authToken.full_name);
                    localStorageService.add('college', $scope.authToken.college);
                    localStorageService.add('picture', $scope.authToken.picture);

                    $modalInstance.close();
                    $rootScope.restricted();

                    // $state.go($state.current, {}, {reload: true});
                    // $state.go('knack-offered', {}, {reload: true});
                    // window.location.href='/#/knacks/offered';
                    // window.location.href='/#/';
                },function(error) {
                    $scope.message = error.data;
                });
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);

        app.controller('RegisterEmailModalCtl',
            ['$scope', '$rootScope', '$resource', '$modalInstance', '$http', 'localStorageService', 'rest', 'restricted',
            function ($scope, $rootScope, $resource, $modalInstance, $http, localStorageService) {
            $scope.user = {
				email: $rootScope.new_email
			};
            var RegisterEmail =  $resource(":protocol://:url/api/accounts/register_email/", {
    			protocol: $scope.restProtocol,
                url: $scope.restURL
            });

            $scope.register = function () {
                $scope.email = RegisterEmail.save($scope.user, function(data){
					localStorageService.add('registered_email', data.email);
                    $modalInstance.close();
                    window.location.href='/#/profile';
				},function(error) {
					$scope.message = error.data;
				});
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);

        app.controller('PaymentModalCtl',
            ['$scope', '$rootScope', '$resource', '$modalInstance', '$modal', '$http', 'localStorageService', 'rest', 'restricted',
            function ($scope, $rootScope, $resource, $modalInstance, $modal, $http, localStorageService) {
            
            var paymentItemList = [];
            var item1 = new Object();
            item1.detail = "Send money instantly for free";
            item1.img = 'images/venmo.png';
            var item2 = new Object();
            item2.detail = "Paypal also accepts credit cards";
            item2.img = 'images/paypal.png';
            var item3 = new Object();
            item3.detail = "Pay cash on campus";
            item3.img = 'images/cash.png';
            paymentItemList.push(item1);
            paymentItemList.push(item2);
            paymentItemList.push(item3);
            $scope.paymentItemList = paymentItemList;
            $scope.activeIndex = -1;
            $scope.activeOption = function(index) {
                $scope.activeIndex = index;
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            $scope.paidCash = function () {

                $modalInstance.dismiss('cancel');
                var submodalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'views/modals/agreed-modal.html',
                    controller: 'AgreedModalCtl',
                    windowClass: 'vcenter-modal'
                });

                submodalInstance.result.then(function (data) {
                        console.log(data);
                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    }
                );
            };
        }]);
        app.controller('HireModalCtl',
            ['$scope', '$rootScope', '$resource', '$modalInstance', '$http', 'localStorageService', 'rest', 'restricted',
            function ($scope, $rootScope, $resource, $modalInstance, $http, localStorageService) {
            
            var paymentItemList = [];
            var item1 = new Object();
            item1.detail = "Send money instantly for free";
            item1.img = 'images/venmo.png';
            var item2 = new Object();
            item2.detail = "Paypal also accepts credit cards";
            item2.img = 'images/paypal.png';
            var item3 = new Object();
            item3.detail = "Pay cash on campus";
            item3.img = 'images/cash.png';
            paymentItemList.push(item1);
            paymentItemList.push(item2);
            paymentItemList.push(item3);
            $scope.paymentItemList = paymentItemList;
            $scope.activeIndex = -1;
            $scope.activeOption = function(index) {
                $scope.activeIndex = index;
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            $scope.postFunc = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
        app.controller('WriteReviewModalCtl',
            ['$scope', '$rootScope', '$resource', '$modalInstance', '$http', 'localStorageService', 'rest', 'restricted',
            function ($scope, $rootScope, $resource, $modalInstance, $http, localStorageService) {
            var ratingItemList = [ {'rate_val':'1/5', 'rate_title': 'Sucked'},
                                   {'rate_val':'2/5', 'rate_title': 'Was okay'},
                                   {'rate_val':'3/5', 'rate_title': 'Good'},
                                   {'rate_val':'4/5', 'rate_title': 'Liked it'},
                                   {'rate_val':'5/5', 'rate_title': 'Loved it!'}  ];
            $scope.ratingItemList = ratingItemList;
            $scope.isSelected = -1;
            $scope.selectItem = function(index) {
                $scope.isSelected = index;
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            $scope.postFunc = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
        app.controller('WriteReviewModalCtl',
            ['$scope', '$rootScope', '$resource', '$modalInstance', '$http', 'localStorageService', 'rest', 'restricted',
            function ($scope, $rootScope, $resource, $modalInstance, $http, localStorageService) {
            var ratingItemList = [ {'rate_val':'1/5', 'rate_title': 'Sucked'},
                                   {'rate_val':'2/5', 'rate_title': 'Was okay'},
                                   {'rate_val':'3/5', 'rate_title': 'Good'},
                                   {'rate_val':'4/5', 'rate_title': 'Liked it'},
                                   {'rate_val':'5/5', 'rate_title': 'Loved it!'}  ];
            $scope.ratingItemList = ratingItemList;
            $scope.isSelected = -1;
            $scope.selectItem = function(index) {
                $scope.isSelected = index;
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            $scope.postFunc = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
        app.controller('AgreedModalCtl',
            ['$scope', '$rootScope', '$resource', '$modalInstance', '$http', 'localStorageService', 'rest', 'restricted',
            function ($scope, $rootScope, $resource, $modalInstance, $http, localStorageService) {
            var ratingItemList = [ {'rate_val':'1/5', 'rate_title': 'Sucked'},
                                   {'rate_val':'2/5', 'rate_title': 'Was okay'},
                                   {'rate_val':'3/5', 'rate_title': 'Good'},
                                   {'rate_val':'4/5', 'rate_title': 'Liked it'},
                                   {'rate_val':'5/5', 'rate_title': 'Loved it!'}  ];
            $scope.ratingItemList = ratingItemList;
            $scope.isSelected = -1;
            $scope.selectItem = function(index) {
                $scope.isSelected = index;
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            $scope.postFunc = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
        app.controller('VideoModalCtl',
            ['$scope', '$rootScope', '$resource', '$modalInstance', '$http', 'localStorageService', 'rest', 'restricted',
                function ($scope, $rootScope, $resource, $modalInstance, $http, localStorageService) {

                }
            ]);
        var transFormRequestHandler = function (data, headersGetterFunction) {
            if (data === undefined)
                return data;

            var fd = new FormData();
            angular.forEach(data, function (value, key) {
                if (value instanceof FileList) {
                    if (value.length == 1) {
                        fd.append(key, value[0]);
                    } else {
                        angular.forEach(value, function (file, index) {
                            fd.append(key + '_' + index, file);
                        });
                    }
                } else {
                    fd.append(key, value);
                }
            });

            return fd;
        }
    return app;
});