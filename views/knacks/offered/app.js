'use strict';
define(['app'], function (app) {
    app.register.controller('offeredCtrl', [
        'localStorageService', '$rootScope', '$scope', '$resource', '$modal', '$state', '$stateParams', '$window', '$timeout',
        'restricted', 'rest',
        function (localStorageService, $rootScope, $scope, $resource, $modal, $state ,$stateParams, $window, $timeout) {

            var knack_item_resource = $resource(":protocol://:url/api/knacks/knacks?id=:id",{
                protocol: $scope.restProtocol,
                url: $scope.restURL,
                id: '@id'
            });

            init();

            function init(){
                $rootScope.currentMenu = 'knacks';
                $scope.current_page = $state.current.name;
                console.log('current page -> ' + $scope.current_page);
                $scope.knacks = [];
                $scope.page = 1;
                $scope.page_size = 6;
                $scope.knacks_total = 0;
                $scope.show_mode = 'all';
                // $scope.item_id = $stateParams.id;
                $scope.single_knack = null;
                $scope.categories = $rootScope.knackCategories;
                $scope.years = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Grad', 'Professor'];
                $scope.genderList = ['Male', 'Female'];
                $scope.sortList = ['Most Recent', 'Highest rated', 'My Connections'];
                $scope.selectedItem = 'Most recent';
                $scope.isFlip = false;

                $scope.filter = {
                    'age': {
                        'from': 6,
                        'to': 52
                    },
                    'price': {
                        'from': 0,
                        'to': 200
                    },
                    'gender': '',
                    'type': 'O',
                    'sort_by': 'recently',
                    'search_text': ''
                }
                if($stateParams.id != null){
                    $scope.single_knack = {
                        title: 'Traveling to Utha this week end, need online Math tutor',
                        created_at: 'Posted 5 hours ago',
                        category_name: 'Ustudy',
                        views: 1256,
                        description: 'Hello! I’m Automn, and I go tto Harvard. I have a passion for nails. I can do your nail one a monthly basis or one time if you want to try me. Refund guaranteed if you’re not satisfied. I study Law in Harvard. Yeah I know, very far away from nails. Fashion is my passion, law is my security net. Where will I end up in lfe? Let’s see. Maybe make female lawyers beautiful to win court case. Seem pretty far fetched.',
                        schedule: 'Busy injecting tons of laws in my brain :)  Fridays and week-ends are better',
                        delivered: '5 miles',
                        cost: 25,
                        profile: {
                            name: 'Automn Barnsby',
                            avatar: 'images/users/user5.jpg',
                            college: 'Harvard University',
                            skill: 'Sophomore',
                            age: 22,
                            rate: 4,
                            cost: 2014,
                            created: 'Since dec 2014',
                            last_seen: 'Last seen: 2 hours ago',
                            connections: ['images/users/user1.jpg', 'images/users/user2.jpg', 'images/users/user3.jpg', 'images/users/user4.jpg'],
                            conn_more_count: 34
                        },
                        reviews: [
                            {
                                avatar: 'images/users/user1.jpg',
                                name: 'Derek Wilson',
                                college: 'Fisher college',
                                rate: 4,
                                content: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy.'
                            },
                            {
                                avatar: 'images/users/user2.jpg',
                                name: 'James Poter',
                                college: 'Harvard university',
                                rate: 5,
                                content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout going to use a passage of Lorem Ipsum, you need.'
                            }
                        ]
                    };
                   /*
                    knack_item_resource.get({'id': $stateParams.id}, function(result){
                        $scope.single_knack = result.results[0];
                    }, function(error){
                        console.log(error);
                    });
                    */
                }

                $scope.restricted();

                $scope.knacks.push(
                    {
                        id: 1,
                        title: 'I will deliver food with my bike anywhere in campus',
                        thumb_photo: 'images/sample/knack1.jpg',
                        rate: 4,
                        category_name: 'Udelivery',
                        description: 'In only 20 minutes I can deliver you anything you need for your studies just let... Let me know what you need and I’ll get back...',
                        type: 'knack',
                        price: 30,
                        flip: false,
                        profile: {
                            name: 'Automn Barnsby',
                            avatar: 'images/users/user5.jpg',
                            college: 'Harvard University',
                            skill: 'Sophomore',
                            age: 22,
                            rate: 4,
                            cost: 2014,
                            created: 'Since dec 2014',
                            last_seen: 'Last seen: 2 hours ago',
                            connections: ['images/users/user1.jpg', 'images/users/user2.jpg', 'images/users/user3.jpg', 'images/users/user4.jpg'],
                            conn_more_count: 34
                        }
                    },
                    {
                        id: 2,
                        title: 'I will deliver food with my bike anywhere in campus',
                        thumb_photo: 'images/sample/knack1.jpg',
                        rate: 4,
                        category_name: 'Udelivery',
                        description: 'In only 20 minutes I can deliver you anything you need for your studies just let... Let me know what you need and I’ll get back...',
                        type: 'knack',
                        price: 30,
                        flip: false,
                        profile: {
                            name: 'Automn Barnsby',
                            avatar: 'images/users/user5.jpg',
                            college: 'Harvard University',
                            skill: 'Sophomore',
                            age: 22,
                            rate: 4,
                            cost: 2014,
                            created: 'Since dec 2014',
                            last_seen: 'Last seen: 2 hours ago',
                            connections: ['images/users/user1.jpg', 'images/users/user2.jpg', 'images/users/user3.jpg', 'images/users/user4.jpg'],
                            conn_more_count: 34
                        }
                    },
                    {
                        id: 3,
                        title: 'I will deliver food with my bike anywhere in campus',
                        thumb_photo: 'images/sample/knack1.jpg',
                        rate: 4,
                        category_name: 'Udelivery',
                        description: 'In only 20 minutes I can deliver you anything you need for your studies just let... Let me know what you need and I’ll get back...',
                        type: 'ideas',
                        price: 30,
                        flip: false,
                        profile: {
                            name: 'Automn Barnsby',
                            avatar: 'images/users/user5.jpg',
                            college: 'Harvard University',
                            skill: 'Sophomore',
                            age: 22,
                            rate: 4,
                            cost: 2014,
                            created: 'Since dec 2014',
                            last_seen: 'Last seen: 2 hours ago',
                            connections: ['images/users/user1.jpg', 'images/users/user2.jpg', 'images/users/user3.jpg', 'images/users/user4.jpg'],
                            conn_more_count: 34
                        }
                    },
                    {
                        id: 4,
                        title: 'I\\’ll be your sports buddy, and teach you climbing',
                        thumb_photo: 'images/sample/knack2.jpg',
                        rate: 4,
                        category_name: ' Usport',
                        description: 'I will teach you how to take better shots with DSLR camera you own or mine. Feel free to contact me.',
                        type: 'knack',
                        price: 30,
                        flip: false,
                        profile: {
                            name: 'Automn Barnsby',
                            avatar: 'images/users/user5.jpg',
                            college: 'Harvard University',
                            skill: 'Sophomore',
                            age: 22,
                            rate: 4,
                            cost: 2014,
                            created: 'Since dec 2014',
                            last_seen: 'Last seen: 2 hours ago',
                            connections: ['images/users/user1.jpg', 'images/users/user2.jpg', 'images/users/user3.jpg', 'images/users/user4.jpg'],
                            conn_more_count: 34
                        }
                    },
                    {
                        id: 5,
                        title: 'I will deliver food with my bike anywhere in campus',
                        thumb_photo: 'images/sample/knack1.jpg',
                        rate: 4,
                        category_name: 'Udelivery',
                        description: 'In only 20 minutes I can deliver you anything you need for your studies just let... Let me know what you need and I’ll get back...',
                        type: 'knack',
                        price: 30,
                        flip: false,
                        profile: {
                            name: 'Automn Barnsby',
                            avatar: 'images/users/user5.jpg',
                            college: 'Harvard University',
                            skill: 'Sophomore',
                            age: 22,
                            rate: 4,
                            cost: 2014,
                            created: 'Since dec 2014',
                            last_seen: 'Last seen: 2 hours ago',
                            connections: ['images/users/user1.jpg', 'images/users/user2.jpg', 'images/users/user3.jpg', 'images/users/user4.jpg'],
                            conn_more_count: 34
                        }
                    },
                    {
                        id: 6,
                        title: 'I will deliver food with my bike anywhere in campus',
                        thumb_photo: 'images/sample/knack1.jpg',
                        rate: 4,
                        category_name: 'Usport',
                        description: 'In only 20 minutes I can deliver you anything you need for your studies just let... Let me know what you need and I’ll get back...',
                        type: 'ideas',
                        price: 30,
                        flip: false,
                        profile: {
                            name: 'Automn Barnsby',
                            avatar: 'images/users/user5.jpg',
                            college: 'Harvard University',
                            skill: 'Sophomore',
                            age: 22,
                            rate: 4,
                            cost: 2014,
                            created: 'Since dec 2014',
                            last_seen: 'Last seen: 2 hours ago',
                            connections: ['images/users/user1.jpg', 'images/users/user2.jpg', 'images/users/user3.jpg', 'images/users/user4.jpg'],
                            conn_more_count: 34
                        }
                    }
                );
                //show_knacks('init');
            }

            function show_knacks(type){
                if(type == 'more') {
                    $scope.page += 1;
                } else {
                    $scope.knacks = [];
                    $scope.page = 1;
                }
                var knacks_resource =  $resource(
                    ":protocol://:url/api/knacks/knacks?page=:page&page_size=:page_size&type=:type&" +
                    "gender=:gender&min_price=:min_price&max_price=:max_price&min_age=:min_age&max_age=:max_age&categories=:categories&college=:college&search_text=:search_text",
                    {
                        protocol: $scope.restProtocol,
                        url: $scope.restURL,
                        page: $scope.page,
                        page_size: $scope.page_size,
                        gender: $scope.filter.gender,
                        min_price: $scope.filter.price.from,
                        max_price: $scope.filter.price.to,
                        min_age: $scope.filter.age.from,
                        max_age: $scope.filter.age.to,
                        type: $scope.filter.type,
                        categories: $scope.filter.selected_categories,
                        college: $scope.filter.college ? $scope.filter.college.name: '',
                        search_text: $scope.filter.search_text
                    }
                );
                knacks_resource.get(function (result) {
                    $scope.knacks_total = result.count;
                    $scope.knacks = $scope.knacks.concat(result.results);
                }, function (error) {
                    $scope.message = error.data;
                    console.log(error);
                });
            }

            $scope.selectItem = function(index) {
                $scope.selectedItem = $scope.sortList[index];
                $scope.isShowSortContent = false;
            };

            $scope.show_more = function(){
                show_knacks('more');
            };

            $scope.close_single = function(){
                $scope.single_knack = null;
            };

            $scope.openPostModal = function () {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/views/modals/post-knack-modal.html',
                    controller: 'PostModalCtl',
                    windowClass: 'vcenter-modal'
                });
                modalInstance.result.then(function (data) {
                        // [].push.apply($scope.knacks, data);
                        $scope.knacks.splice(0, 0, data);
                        $scope.knacks_total += 1;
                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    }
                );
            };

            $scope.full_search = function(){
                show_knacks('init');
            }

            // Watch filters
            $scope.$watch('filter.age.from', function (newVal, oldVal) {
                var divHandles = angular.element("#age-slider .noUi-handle");
                angular.element(divHandles[0]).empty();
                angular.element(divHandles[0]).append('<div>' + newVal + '</div>');
                if(newVal!=oldVal)
                    show_knacks('init');
            });
            $scope.$watch('filter.age.to', function (newVal, oldVal) {
                var divHandles = angular.element("#age-slider .noUi-handle");
                angular.element(divHandles[1]).empty();
                angular.element(divHandles[1]).append('<div>' + newVal + '</div>');
                if(newVal!=oldVal)
                    show_knacks('init');
            });

            $scope.$watch('filter.price.from', function (newVal, oldVal) {
                var divHandles = angular.element("#price-slider .noUi-handle");
                angular.element(divHandles[0]).empty();
                angular.element(divHandles[0]).append('<div>$' + newVal + '</div>');
                if(newVal!=oldVal)
                    show_knacks('init');
            });
            $scope.$watch('filter.price.to', function (newVal, oldVal) {
                var divHandles = angular.element("#price-slider .noUi-handle");
                angular.element(divHandles[1]).empty();
                angular.element(divHandles[1]).append('<div>$' + newVal + '</div>');
                if(newVal!=oldVal)
                    show_knacks('init');
            });
            $scope.$watch('filter.college', function (newVal, oldVal) {
                if(newVal!=oldVal)
                    show_knacks('init');
            });
            $scope.mainLeftLoaded = function() {
                var divHandles = angular.element("#price-slider .noUi-handle");
                angular.element(divHandles[0]).append('<div>$' + $scope.filter.price.from + '</div>');
                angular.element(divHandles[1]).append('<div>$' + $scope.filter.price.to + '</div>');
                divHandles = angular.element("#age-slider .noUi-handle");
                angular.element(divHandles[0]).append('<div>' + $scope.filter.age.from + '</div>');
                angular.element(divHandles[1]).append('<div>' + $scope.filter.age.to + '</div>');
            };

            $scope.$watchCollection('filter.selected_categories', function(newVal, oldVal) {
                if(newVal!=oldVal)
                    show_knacks('init');
            });
            $scope.$watchCollection('filter.gender', function(newVal, oldVal) {
                if(newVal!=oldVal)
                    show_knacks('init');
            });

            $scope.$watchCollection('filter.sort_by', function(newVal, oldVal) {
                if(newVal!=oldVal)
                    show_knacks('init');
            });

            $scope.selectAllCategories = function (isSelect) {
                if (!$scope.categories) { return; }
                if (isSelect) {
                    $scope.filter.selected_categories = $scope.categories.map(function(category) { return category.id; });
                } else {
                    $scope.filter.selected_categories.splice(0, $scope.filter.selected_categories.length);
                }
            };

            $scope.isAllCategorySelected = function () {
                if (!$scope.categories) { return; }
                return angular.equals($scope.filter.selected_categories, $scope.categories.map(function(category) { return category.id; }));
            }

            $scope.openPostModal = function(knack_type, knack_action){
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'views/modals/post-knack-modal.html',
                    controller: 'PostModalCtl',
                    windowClass: 'vcenter-modal',
                    resolve: {
                        knack_type: function () {
                            return knack_type;
                        },
                        knack_action: function () {
                            return knack_action;
                        }
                    }
                });
                modalInstance.result.then(function (data) {

                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    }
                );
            };

            $scope.flip = function(item) {
                item.flip = !item.flip;
            };
            $scope.videoIndex = -1;
            $scope.showKnackVideo = function(index, evt) {
                evt.preventDefault();
                evt.stopPropagation();
                $scope.videoIndex = index;
            };
            $scope.hideKnackVideo = function() {
                $scope.videoIndex = -1;
            };
            $scope.flipAll = function() {
                angular.forEach($scope.knacks, function(knack, inx) {
                    knack.flip = !knack.flip;
                });
            };

            $scope.showIdeas = function() {
                if($scope.show_mode == 'all')
                    $scope.show_mode = 'ideas';
                else
                    $scope.show_mode = 'all';
            };

            $scope.showVideoModal = function() {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'views/modals/video-modal.html',
                    controller: 'VideoModalCtl',
                    windowClass: 'vcenter-modal',
                    resolve: {
                    }
                });
                modalInstance.result.then(function (data) {

                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    }
                );
            }

        }]);
    return app;
});