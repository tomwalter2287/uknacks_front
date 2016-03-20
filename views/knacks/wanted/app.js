'use strict';
define(['app'], function (app) {
    app.register.controller('wantedCtrl', [
        'localStorageService', '$rootScope', '$scope', '$resource', '$modal', '$state', '$stateParams',
        'restricted', 'rest',
        function (localStorageService, $rootScope, $scope, $resource, $modal, $state, $stateParams) {

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
                $scope.show_mode = 'grid';
                // $scope.item_id = $stateParams.id;
                $scope.single_knack = null;
                $scope.categories = $rootScope.knackCategories;
                $scope.sortList = ['Most Recent', 'Highest rated', 'My Connections'];
                $scope.selectedItem = 'Most recent';

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
                    'type': 'W',
                    'sort_by': 'recently',
                    'search_text': ''
                }
                if($stateParams.id != null){
                    knack_item_resource.get({'id': $stateParams.id}, function(result){
                        $scope.single_knack = result.results[0];
                    }, function(error){
                        console.log(error);
                    });
                }

                $scope.restricted();

                $scope.knacks.push(
                    {
                        id: 1,
                        title: 'Looking for someone to write my thesis',
                        thumb_photo: 'images/sample/knack3.jpg',
                        rate: 4,
                        category_name: 'Udelivery',
                        description: 'I need help writing my thesis due next week. I’ll provide all materials and notes. I’d like to meet you on campus before.',
                        price: 30,
                        flip: false,
                        profile: {
                            name: 'Automn Barnsby',
                            avatar: 'images/users/user5.jpg',
                            college: 'Suffolk University',
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
                        title: 'I need someone to deliver a package Monday at 11pm to BU',
                        thumb_photo: 'images/sample/knack4.jpg',
                        rate: 4,
                        category_name: 'Udelivery',
                        description: 'In only 20 minutes I can deliver you anything you need for your studies just let... Let me know what you need and I’ll get back...',
                        price: 30,
                        flip: false,
                        profile: {
                            name: 'Automn Barnsby',
                            avatar: 'images/users/user5.jpg',
                            college: 'Suffolk University',
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
                        title: 'I am looking for someone to repair my macbook air',
                        thumb_photo: 'images/sample/knack5.jpg',
                        rate: 4,
                        category_name: 'Udelivery',
                        description: 'Don’t know what’s wrong with it. The screen all of sudden became black. Sometimes I am able to turn it on, sometimes not... Help!',
                        price: 30,
                        flip: false,
                        profile: {
                            name: 'Automn Barnsby',
                            avatar: 'images/users/user5.jpg',
                            college: 'Emerson University',
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
                        title: 'I need someone to help me install 150 chairs for an event',
                        thumb_photo: 'images/sample/knack6.jpg',
                        rate: 4,
                        category_name: ' Usport',
                        description: 'I am having a party and need someone to help me install 150 chairs on Saturday. We need to start at 8am. Should take 2 hours',
                        price: 30,
                        flip: false,
                        profile: {
                            name: 'Automn Barnsby',
                            avatar: 'images/users/user5.jpg',
                            college: 'Emerson University',
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
                        title: 'I need to get an A in math next Semester. Need a Math tutor',
                        thumb_photo: 'images/sample/knack7.jpg',
                        rate: 4,
                        category_name: 'Udelivery',
                        description: 'I need to get an A next semester in Math. I am a B right now, but I am motivated. Show me the beauty of Math, I am willing to pay $40/Hr',
                        price: 30,
                        flip: false,
                        profile: {
                            name: 'Automn Barnsby',
                            avatar: 'images/users/user5.jpg',
                            college: 'Emerson University',
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
                        title: 'I need someone to teach me Rock Climbing',
                        thumb_photo: 'images/sample/knack4.jpg',
                        rate: 4,
                        category_name: 'Uride',
                        description: 'I have always dreamed to know how to rock climb outside. I have tried inside several times but never outside.',
                        price: 30,
                        flip: false,
                        profile: {
                            name: 'Automn Barnsby',
                            avatar: 'images/users/user5.jpg',
                            college: 'Budget: $50',
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
                        id: 7,
                        title: 'I need a ride from Evertt to Bu every week day at 8am',
                        thumb_photo: 'images/sample/knack9.jpg',
                        rate: 4,
                        category_name: 'Utech',
                        description: 'Hello, I need a ride everyday from Evertee to BU. Would rather commute than taing the boring  T. Willing to pay $20/week',
                        price: 30,
                        flip: false,
                        profile: {
                            name: 'Automn Barnsby',
                            avatar: 'images/users/user5.jpg',
                            college: 'Budget: $600',
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
                        id: 8,
                        title: 'Looking for a nice leather couch for the chess club',
                        thumb_photo: 'images/sample/knack10.jpg',
                        rate: 4,
                        category_name: 'Ufurniture',
                        description: 'I am the president of the chessclub. We’re looking to get a nice leather couch for the office. We have a budget of $150.',
                        price: 30,
                        flip: false,
                        profile: {
                            name: 'Automn Barnsby',
                            avatar: 'images/users/user5.jpg',
                            college: 'Budget: $150',
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
            };

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
            };

            $scope.selectItem = function(index) {
                $scope.selectedItem = $scope.sortList[index];
                $scope.isShowSortContent = false;
            };

            $scope.applyFlip = function(index) {
                $scope.isFlip = !$scope.isFlip;
            };

            $scope.show_more = function(){
                show_knacks('more');
            };

            $scope.close_single = function(){
                $scope.single_knack = null;
            }

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
            $scope.show_grid = function(){
                $scope.show_mode = 'grid';
                $scope.page_size = 6;
            };
            $scope.show_list = function(){
                $scope.show_mode = 'list';
                $scope.page_size = 3;
            };

            $scope.full_search = function(){
                if( $scope.filter.search_text)
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

            $scope.flip = function(item) {
                item.flip = !item.flip;
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