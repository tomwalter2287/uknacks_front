'use strict';
define(['app'], function (app) {
    app.register.controller('publicCtrl', [
        'localStorageService', '$rootScope', '$scope', '$resource', '$modal', '$stateParams',
        'restricted', 'rest',
        function (localStorageService, $rootScope, $scope, $resource, $modal, $stateParams) {
            var private_profile_resource = $resource(":protocol://:url/api/accounts/profile",{
                protocol: $scope.restProtocol,
                url: $scope.restURL
            });

            var private_profile_edit_resource = $resource(":protocol://:url/api/accounts/profile/edit",{
                protocol: $scope.restProtocol,
                url: $scope.restURL
            }, {
                save: {
                    method: 'PUT',
                    transformRequest: function(data, headersGetterFunction) {
                        if (data === undefined)
                          return data;

                        var fd = new FormData();
                        fd.append("social_links", JSON.stringify(data.social_links));
                        fd.append("descriptions", JSON.stringify(data.descriptions));
                        angular.forEach(data, function(value, key) {
                          if (value instanceof FileList) {
                            if (value.length == 1) {
                              fd.append(key, value[0]);
                            } else {
                              angular.forEach(value, function(file, index) {
                                fd.append(key + '_' + index, file);
                              });
                            }
                          } else {
                              if( key != "social_links" && key != "descriptions") {
                                  fd.append(key, value);
                              }
                          }
                        });
                        return fd;
                    },
                    headers: {'Content-Type': undefined}
                }
            });

            var public_profile_resource = $resource(":protocol://:url/api/accounts/profile?user_id=:id",{
                protocol: $scope.restProtocol,
                url: $scope.restURL,
                id: '@id'
            });

            var knack_item_resource = $resource(":protocol://:url/api/knacks/knacks?id=:id",{
                protocol: $scope.restProtocol,
                url: $scope.restURL,
                id: '@id'
            });

            init();

            function init(){
                $scope.knacks = [];           // knacks list
                $scope.knacks_total = 0;      // total knacks
                $scope.items_total = 0;      // total knacks
                $scope.single_knack = null;   // a knack to show single knack page
                $scope.edit_field = null;     // a profile field to edit
                $scope.user = null;           // profile info
                $scope.is_public = false;     // boolean if this page is for public or private profile.
                $scope.user_post_data = {}; // data to post for profile edit
                $scope.edit_item= null;       // An user's item or knack to edit
                $scope.active_tab = 'knacks';
                $scope.active_r_tab = 'connections';
                $scope.isCollegeBoxOpened = false;
                $scope.isLocationBoxOpened = false;

                $scope.locations = [];
                $scope.locations.push({name: 'Freshman'});
                $scope.locations.push({name: 'Sophomore'});
                $scope.locations.push({name: 'Junior'});
                $scope.locations.push({name: 'Senior'});
                $scope.locations.push({name: 'Grad'});
                $scope.locations.push({name: 'Professor'});

                $scope.connections = [];
                $scope.connections.push({name: 'Derek Wilson', picture: 'images/users/user1.jpg', college: 'Fisher College', category_name: 'Sophomore', age: 22, price: 2014, from_date: 'Since dec 2014', score: 4, last_seen: '2 hours ago', status: 'on'});
                $scope.connections.push({name: 'James Poter', picture: 'images/users/user2.jpg', college: 'Harvard University', category_name: 'Sophomore', age: 21, price: 2014, from_date: 'Since dec 2014', score: 4, last_seen: '2 hours ago', status: 'off'});
                $scope.connections.push({name: 'Jennifer Parker', picture: 'images/users/user3.jpg', college: 'Harvard University', category_name: 'Sophomore', age: 23, price: 14, from_date: 'Since dec 2014', score: 4, last_seen: '2 hours ago', status: 'on'});
                $scope.connections.push({name: 'Jack Mandosa', picture: 'images/users/user4.jpg', college: 'Boston University', category_name: 'Sophomore', age: 25, price: 214, from_date: 'Since dec 2014', score: 4, last_seen: '2 hours ago', status: 'off'});
                $scope.connections.push({name: 'Joel Stakham', picture: 'images/users/user5.jpg', college: 'Stanford University', category_name: 'Sophomore', age: 27, price: 101, from_date: 'Since dec 2014', score: 4, last_seen: '2 hours ago', status: 'off'});
                $scope.connections.push({name: 'Derek Wilson', picture: 'images/users/user1.jpg', college: 'Fisher College', category_name: 'Sophomore', age: 29, price: 2014, from_date: 'Since dec 2014', score: 4, last_seen: '2 hours ago', status: 'on'});
                $scope.connections.push({name: 'James Poter', picture: 'images/users/user2.jpg', college: 'Harvard University', category_name: 'Sophomore', age: 23, price: 2014, from_date: 'Since dec 2014', score: 4, last_seen: '2 hours ago', status: 'off'});
                $scope.connections.push({name: 'Jennifer Parker', picture: 'images/users/user3.jpg', college: 'Harvard University', category_name: 'Sophomore', age: 22, price: 4, from_date: 'Since dec 2014', score: 4, last_seen: '2 hours ago', status: 'on'});
                $scope.connections.push({name: 'Jack Mandosa', picture: 'images/users/user4.jpg', college: 'Boston University', category_name: 'Sophomore', age: 21, price: 20, from_date: 'Since dec 2014', score: 4, last_seen: '2 hours ago', status: 'off'});
                $scope.connections.push({name: 'Joel Stakham', picture: 'images/users/user5.jpg', college: 'Stanford University', category_name: 'Sophomore', age: 29, price: 1, from_date: 'Since dec 2014', score: 4, last_seen: '2 hours ago', status: 'off'});

                $scope.user_post_data.descriptions = [];
                $scope.user_post_data.descriptions.push({description: 'I\'m an awsome knacker'});
                $scope.user_post_data.descriptions.push({description: 'Who absolutely loves what I do'});
                $scope.user_post_data.descriptions.push({description: 'I\'m fun, fair and honest'});
                $scope.user_post_data.descriptions.push({description: 'I\'ll do a great job everytime'});
                $scope.user_post_data.descriptions.push({description: 'you\'ll really love your knack'});

                console.log($scope.connections);

                $scope.user_not_found = false;

                if ($stateParams.id) {
                    $rootScope.currentMenu = 'profile';
                } else {
                    $rootScope.currentMenu = 'profile_edit';
                }

                $scope.registered_email = localStorageService.get('registered_email');

                if( $scope.registered_email && $scope.registered_email !=''){
                    $rootScope.is_authenticated = true;
                    show_welcome_popup();
                } else {
                    
                    $scope.restricted();

                    if ($stateParams.id) {
                        $scope.is_public = true;
                        $scope.user = public_profile_resource.get({id: $stateParams.id}, function (result) {
                            $scope.user.picture = result.picture ? result.picture : 'images/users/no_avatar.png'
                            $scope.user.college = result.college == "null" ? "" : result.college;
                            $scope.knacks_total = result.knacks.length;
                            $scope.items_total = result.items.length;
                        }, function () {
                            $scope.user_not_found = true;
                        });
                    } else {
                        $scope.user = private_profile_resource.get(function (result) {
                            $scope.user.picture = result.picture ? result.picture : 'images/users/no_avatar.png'
                            $scope.user.college = result.college == "null" ? "" : result.college;
                            $scope.user_post_data = angular.copy($scope.user);
                            $scope.knacks_total = result.knacks.length;
                            $scope.items_total = result.items.length;

                            // $scope.user_post_data._method = 'POST';
                        }, $scope.checkTokenError);


                    }
                    
                    var knackList = [{'name': 'Learn photography tricks and take your best shots',
                                     'photo': 'images/knacks/grid/item4.jpg','price': '55','fav_count': '4',
                                      'description': 'sLorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
                                      'category_name': 'Technology'},
                                      {'name': 'Learn photography tricks and take your best shots',
                                     'photo': 'images/knacks/grid/item1.jpg','price': '55','fav_count': '4',
                                      'description': 'sLorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
                                      'category_name': 'Technology'}];

                    $scope.knackList = knackList;      

                    var storeItemList = [{'name': 'Learn photography tricks and take your best shots',
                                     'photo': 'images/sample/2.jpg','price': '55','fav_count': '4',
                                      'description': 'sLorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
                                      'category_name': 'Technology'},
                                      {'name': 'Learn photography tricks and take your best shots',
                                     'photo': 'images/knacks/grid/item1.jpg','price': '55','fav_count': '4',
                                      'description': 'sLorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
                                      'category_name': 'Technology'}];

                    $scope.storeItemList = storeItemList;              

                }

                var reasonList = [{'reason': 'I\'m really ambicious'},
                                  {'reason': 'My passion is what I\'m offering'},
                                  {'reason': 'I\'ll never late and do everything on time'},
                                  {'reason': 'I\'m super hard working'},
                                  {'reason': 'My cat is really funny and love her'}];
                $scope.reasonList = reasonList;
            };

            function show_welcome_popup(){
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/views/modals/register-modal.html',
                    controller: 'RegisterModalCtl',
                    windowClass: 'vcenter-modal',
                    backdrop: 'static'
                });

                modalInstance.result.then(function (data) {
                        console.log(data);
                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    }
                );
            }

            $scope.toggleCollegeBox = function() {
                $scope.isCollegeBoxOpened = !$scope.isCollegeBoxOpened;
            };

            $scope.toggleLocationBox = function() {
                $scope.isLocationBoxOpened = !$scope.isLocationBoxOpened;
            };

            $scope.close_single = function(){
                $scope.single_knack = null;
            };

            $scope.edit_profile = function(field_name, evt){
                /*
                evt.preventDefault();
                evt.stopPropagation();
                if(!$scope.user_not_found)
                    $scope.edit_field = field_name;
                */
                
                //This is the Payment modal

                
                /*
                //This is the Hire modal

                */
                    
                /*
                //This is the Write a Review modal

                */

                /*
                //This is the Agreed modal
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'views/modals/agreed-modal.html',
                    controller: 'AgreedModalCtl',
                    windowClass: 'vcenter-modal'
                });

                modalInstance.result.then(function (data) {
                        console.log(data);
                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    }
                );
                */
            };
            $scope.openHireModal = function() {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'views/modals/hire-modal.html',
                    controller: 'HireModalCtl',
                    windowClass: 'vcenter-modal'
                });

                modalInstance.result.then(function (data) {
                        console.log(data);
                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    }
                );
            }
            $scope.openWriteAReviewModal = function() {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'views/modals/write-review-modal.html',
                    controller: 'WriteReviewModalCtl',
                    windowClass: 'vcenter-modal'
                });

                modalInstance.result.then(function (data) {
                        console.log(data);
                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    }
                );
            };
            $scope.openByItemModal = function() {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'views/modals/payment-modal.html',
                    controller: 'PaymentModalCtl',
                    windowClass: 'vcenter-modal'
                });

                modalInstance.result.then(function (data) {
                        console.log(data);
                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    }
                );
            };
            $scope.openIndex = -1;
            $scope.toggleSocialBox = function(index, evt) {
                evt.preventDefault();
                evt.stopPropagation();
                $scope.openIndex = index;
               
            };
            $scope.openIndexInStore = -1;
            $scope.toggleSocialBoxInStore = function(index, evt) {
                evt.preventDefault();
                evt.stopPropagation();
                $scope.openIndexInStore = index;
            };
            $scope.closeSocialBox = function() {
                $scope.openIndex = -1;
                $scope.openIndexInStore = -1;
            };
            $scope.save_profile = function(){
                if($scope.profileForm.$valid) {
                    private_profile_edit_resource.save($scope.user_post_data, function (user) {
                        $scope.user = user;
                        if(user.college == "null")
                            $scope.user.college = null;
                        $scope.edit_field = null;
                        localStorageService.set('full_name', $scope.user.full_name);
                        localStorageService.set('college', $scope.user.college);
                        localStorageService.set('picture', $scope.user.picture);

                        $rootScope.restricted();
                    }, function (error) {
                        $scope.message = error.data;
                        console.log(error);
                    });
                } else {
                   console.log($scope.profileForm.$error);
                }
            }

            $scope.close_edit = function(){
                $scope.edit_field = null;
            }

            $scope.add_more_description = function(){
                $scope.user_post_data.descriptions.push({});
            }

            $scope.activate_knacks = function(){
                $scope.active_tab = 'knacks';
            }
            $scope.activate_items = function(){
                $scope.active_tab = 'items';
            }

            $scope.activate_connections = function(){
                $scope.active_r_tab = 'connections';
            }
            $scope.activate_reviews = function(){
                $scope.active_r_tab = 'reviews';
            }

            $scope.toggleCollegeBox = function() {
                $scope.isCollegeBoxOpened = !$scope.isCollegeBoxOpened;
            };

        }]);
    return app;
});