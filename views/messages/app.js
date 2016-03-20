'use strict';
define(['app'], function (app) {
    app.register.controller('messagesCtrl', [
        'localStorageService', '$rootScope', '$scope', '$resource',
        '$modal', '$stateParams', 'Message',
        'restricted', 'rest',
        function (localStorageService, $rootScope, $scope, $resource,
                  $modal, $stateParams, Message) {

            var private_profile_resource = $resource(":protocol://:url/api/accounts/profile",{
                protocol: $scope.restProtocol,
                url: $scope.restURL
            });

            var messages_resource = $resource(":protocol://:url/api/chat/messages?companion=:companion",{
                protocol: $scope.restProtocol,
                url: $scope.restURL,
                companion: '@companion'
            });

            var contacts_resource = $resource(":protocol://:url/api/chat/message_contacts",{
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

            init();

            function init(){
                $scope.edit_field = null;     // a profile field to edit
                $scope.user = null;           // profile info
                $scope.is_public = false;     // boolean if this page is for public or private profile.
                $scope.user_post_data = null; // data to post for profile edit
                $scope.edit_item= null;       // An user's item or knack to edit
                $scope.Message = null;
                $scope.selected_user = null;
                // $scope.old_messages = null;

                $scope.restricted();

                $rootScope.currentMenu = 'profile_edit';
                $scope.user = private_profile_resource.get(function(result){
                    $scope.user.picture = result.picture ? result.picture:'images/users/no_avatar.png'
                    $scope.user.college = result.college == "null" ? "": result.college;
                    $scope.user_post_data = angular.copy($scope.user);

                    // $scope.user_post_data._method = 'POST';
                }, $scope.checkTokenError);

                $scope.contacts = contacts_resource.get(function(result){
                    $scope.contacts = result.results;
                }, $scope.checkTokenError);
            };

            $scope.edit_profile = function(field_name, evt){
                evt.preventDefault();
                evt.stopPropagation();
                if(!$scope.user_not_found)
                    $scope.edit_field = field_name;
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

            $scope.select_contact = function(user){
                var room_id = generateRoomID(user.id, $rootScope.profile_user.user_id);
                $scope.selected_user = user;
                $scope.Message = Message($rootScope.token, room_id);

                $scope.old_messages = messages_resource.get({'companion': user.id}, function(result){
                    $scope.old_messages = result.results;
                }, $scope.checkTokenError);
            }
            /* Websocket chat */
            //$scope.username = 'anonymous';
            //
            //$scope.Message = Message($rootScope.token);
            //
            $scope.submit = function(new_message) {
                if (!new_message || !$scope.Message) { return; }
                $scope.Message.send({
                    sender_data: $rootScope.profile_user,
                    receipt_data: $scope.selected_user,
                    message: new_message
                });
                $scope.new_message = '';
            };
            function generateRoomID(sender, receipt){
                if(sender > receipt){
                    return sender + '&' + receipt;
                } else {
                    return receipt + '&' + sender;
                }
            }

        }]);
    return app;
});