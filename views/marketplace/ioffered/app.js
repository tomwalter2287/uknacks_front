'use strict';
define(['app'], function (app) {
    app.register.controller('iofferedCtrl', [
        'localStorageService', '$rootScope', '$scope', '$resource', '$modal', '$state', '$stateParams',
        'restricted', 'rest',
        function (localStorageService, $rootScope, $scope, $resource, $modal, $state ,$stateParams) {

            var item_resource = $resource(":protocol://:url/api/items/items?id=:id",{
                protocol: $scope.restProtocol,
                url: $scope.restURL,
                id: '@id'
            });

            init();

            function init(){
                $rootScope.currentMenu = 'marketplace';
                $scope.current_page = $state.current.name;
                console.log('current page -> ' + $scope.current_page);
                $scope.items = [];
                $scope.page = 1;
                $scope.page_size = 6;
                $scope.items_total = 0;
                $scope.show_mode = 'grid';
                // $scope.item_id = $stateParams.id;
                $scope.single_item = null;
                $scope.categories = $rootScope.itemCategories;
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
                    item_resource.get({'id': $stateParams.id}, function(result){
                        $scope.single_item = result.results[0];
                    }, function(error){
                        console.log(error);
                    });
                }

                $scope.restricted();

                show_items('init');
            }

            function show_items(type){
                if(type == 'more') {
                    $scope.page += 1;
                } else {
                    $scope.items = [];
                    $scope.page = 1;
                }
                var items_resource =  $resource(
                    ":protocol://:url/api/items/items?page=:page&page_size=:page_size&type=:type&" +
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
                items_resource.get(function (result) {
                    $scope.items_total = result.count;
                    $scope.items = $scope.items.concat(result.results);
                }, function (error) {
                    $scope.message = error.data;
                    console.log(error);
                });
            }

            $scope.show_more = function(){
                show_items('more');
            };

            $scope.close_single = function(){
                $scope.single_item = null;
            };

            $scope.openPostModal = function () {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/views/modals/post-item-modal.html',
                    controller: 'PostItemModalCtl',
                    windowClass: 'vcenter-modal'
                });
                modalInstance.result.then(function (data) {
                        // [].push.apply($scope.items, data);
                        $scope.items.splice(0, 0, data);
                        $scope.items_total += 1;
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
                    show_items('init');
            }

            // Watch filters
            $scope.$watch('filter.age.from', function (newVal, oldVal) {
                var divHandles = angular.element("#age-slider .noUi-handle");
                angular.element(divHandles[0]).empty();
                angular.element(divHandles[0]).append('<div>' + newVal + '</div>');
                console.log(newVal);
                if(newVal!=oldVal)
                    show_items('init');
            });
            $scope.$watch('filter.age.to', function (newVal, oldVal) {
                var divHandles = angular.element("#age-slider .noUi-handle");
                angular.element(divHandles[1]).empty();
                angular.element(divHandles[1]).append('<div>' + newVal + '</div>');
                if(newVal!=oldVal)
                    show_items('init');
            });

            $scope.$watch('filter.price.from', function (newVal, oldVal) {
                var divHandles = angular.element("#price-slider .noUi-handle");
                angular.element(divHandles[0]).empty();
                angular.element(divHandles[0]).append('<div>$' + newVal + '</div>');
                if(newVal!=oldVal)
                    show_items('init');
            });
            $scope.$watch('filter.price.to', function (newVal, oldVal) {
                var divHandles = angular.element("#price-slider .noUi-handle");
                angular.element(divHandles[1]).empty();
                angular.element(divHandles[1]).append('<div>$' + newVal + '</div>');
                if(newVal!=oldVal)
                    show_items('init');
            });
            $scope.$watch('filter.college', function (newVal, oldVal) {
                if(newVal!=oldVal)
                    show_items('init');
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
                    show_items('init');
            });
            $scope.$watchCollection('filter.gender', function(newVal, oldVal) {
                if(newVal!=oldVal)
                    show_items('init');
            });

            $scope.$watchCollection('filter.sort_by', function(newVal, oldVal) {
                if(newVal!=oldVal)
                    show_items('init');
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
        }]);
    return app;
});