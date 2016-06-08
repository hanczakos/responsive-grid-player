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
        template: '<div class="col-sm-12 col-xs-12"> <p>Player for movie: <strong>{{movie.name}}</strong></p> </div>',
        scope: {
            movie: '=',
            element: '='
        },
        link: function($scope, element) {
            $scope.element = element[0];
        }
    }


});

app.directive('movieList', function() {
    return {
        restrict: 'E',
        templateUrl: 'movie-list.directive.html',
        scope: {
            movies: '='
        },
        link: function($scope) {
            $scope.playMovie = function (event, movie) {
                if ($scope.selectedMovie === movie) {
                    $scope.selectedMovie = undefined;
                } else {
                    event.currentTarget.parentNode.insertBefore($scope.playerElement, event.currentTarget.nextSibling);
                    $scope.selectedMovie = movie;

                }

            };
        }
    }
});