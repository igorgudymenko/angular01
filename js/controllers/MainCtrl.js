angular.module('guestList').controller('MainCtrl', ['$scope', 'guestsManager', 'syncService', function($scope, guestsManager, syncService) {

    syncService.connect();

    syncService.onGuestUpdate(function(guest) {
        $scope.$apply(function() {
            var existingGuest = _.find($scope.guests, { id: guest.id });
            if (existingGuest) {
                _.assign(existingGuest, guest);
            } else {
                $scope.guests.push(guest);
            }
        });
    });

    syncService.onGuestAdd(function(guest) {
        $scope.$apply(function() {
            var existingGuest = _.find($scope.guests, { id: guest.id });
            if (existingGuest) {
                _.assign(existingGuest, guest);
            } else {
                $scope.guests.push(guest);
            }
        });
    });

    syncService.onGuestRemove(function(guestId) {
        $scope.$apply(function () {
            _.remove($scope.guests, { id: guestId });
        });
    });

    $scope.columns = [
        {class: 'invited', inHall: false},
        {class: 'in-hall', inHall: true}
    ];

    guestsManager.getGuests().then(function(guests) {
        $scope.guests = guests;
    });

    $scope.guestUpdate = function(guest) {

        var currentStatus = _.findIndex($scope.columns, {inHall: guest.inHall});
        var status;
        if (currentStatus === 0) {
            status = currentStatus + 1;
        } else {
            status = currentStatus - 1;
        }
        _.find($scope.guests, {id: guest.id}).inHall = $scope.columns[status].inHall;

        var guestData = {
            id: guest.id,
            name: guest.name,
            inHall: guest.inHall
        };

        syncService.updateGuest(guestData);
    };

    $scope.guestRemove = function(guest) {
        syncService.removeGuest(guest.id);
        _.remove($scope.guests, {id: guest.id});
    };

    $scope.submitData = function() {
        if ($scope.name) {
            var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
            var guestData = {
                id: id,
                name: $scope.name,
                inHall: false
            };

            $scope.guests.push(guestData);
            syncService.addGuest(guestData);
            $scope.name = '';

        } else {
            window.alert('Please enter name!');
        }
    }
}]);