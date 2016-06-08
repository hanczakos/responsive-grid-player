var app = angular.module('player-list-app', []);

app.controller('MainController', function($scope) {

    $scope.items = [
        { id: 1,  name: "Movie 1" },
        { id: 2,  name: "Movie 2" },
        { id: 3,  name: "Movie 3" },
        { id: 4,  name: "Movie 4" },
        { id: 5,  name: "Movie 5" },
        { id: 6,  name: "Movie 6" },
        { id: 7,  name: "Movie 7" },
        { id: 8,  name: "Movie 8" }
    ];
    
});


app.directive('moviePlayer', function() {
    return {
        restrict: 'E',
        template: '<div class="col-xs-12"> <p>Player for movie: <strong>{{movie.name}}</strong></p> </div>',
        scope: {
            movie: '=',
            element: '='
        },
        link: function($scope, element) {
            $scope.element = element[0];
        }
    }


});

app.directive('movieList', function($window) {
    return {
        restrict: 'E',
        templateUrl: 'movie-list.directive.html',
        scope: {
            movies: '='
        },
        link: function($scope) {
            var columns;
            var selectedElement;

            function setColumns() {
                var windowWidth = $window.innerWidth;
                if (windowWidth < 768) {
                    columns = 2;
                } else if (windowWidth < 992) {
                    columns = 3;
                } else {
                    columns = 4;
                }
            }

            angular.element($window).bind('resize', function() {
                setColumns();
                if (selectedElement) {
                    positionPlayer(selectedElement);
                }
            });

            setColumns();

            function positionPlayer(element) {
                var row = element.parentNode,
                    childNodes = [].slice.call(row.children),
                    currentIndex = +element.getAttribute('index'),
                    insertBeforeIndex = currentIndex + columns - currentIndex % columns;

                row.insertBefore($scope.playerElement,
                    childNodes.filter(function(node) {
                        return node.getAttribute('index') == insertBeforeIndex
                    })[0]
                );
            }

            $scope.playMovie = function (event, movie) {

                if ($scope.selectedMovie === movie) {
                    $scope.selectedMovie = undefined;

                } else {
                    selectedElement = event.currentTarget;
                    positionPlayer(selectedElement);

                    $scope.selectedMovie = movie;
                }
            };
        }
    }
});