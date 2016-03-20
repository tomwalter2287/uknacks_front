'use strict';
define(['app'], function (app) {
    app.register.controller('profileCtrl', [
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
                $scope.user_post_data = null; // data to post for profile edit
                $scope.edit_item= null;       // An user's item or knack to edit
                $scope.active_tab = 'knacks';

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
                }
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

            $scope.close_single = function(){
                $scope.single_knack = null;
            };

            $scope.edit_profile = function(field_name, evt){
                evt.preventDefault();
                evt.stopPropagation();
                if(!$scope.user_not_found)
                    $scope.edit_field = field_name;
            };

            $scope.edit_knack = function(knack_item){
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/views/modals/edit-knack-modal.html',
                    controller: 'EditKnackModalCtl',
                    windowClass: 'vcenter-modal',
                    resolve: {
                        knack_item: function () {
                          return knack_item;
                        }
                    }
                });
                modalInstance.result.then(function (data) {
                        angular.extend(knack_item, data);
                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    }
                );
            };
            $scope.edit_item = function(item){
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/views/modals/edit-item-modal.html',
                    controller: 'EditItemModalCtl',
                    windowClass: 'vcenter-modal',
                    resolve: {
                        item: function () {
                          return item;
                        }
                    }
                });
                modalInstance.result.then(function (data) {
                        angular.extend(item, data);
                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    }
                );
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

        }]);
    return app;
});