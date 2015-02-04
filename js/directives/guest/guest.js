angular.module('guestList').directive('guest', [function() {
    return {
        restrict: 'A',
        templateUrl: 'js/directives/guest/guest.html',
        scope: {
            guest: '=',
            onUpdate: '=',
            onRemove: '='
        },
        controller: function($scope) {
            $scope.moveToHall = function() {
                $scope.onUpdate($scope.guest);
            };
            $scope.remove = function() {
                $scope.onRemove($scope.guest);
            }
        }
    }
}]);