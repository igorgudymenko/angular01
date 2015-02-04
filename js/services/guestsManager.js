angular.module('guestList').factory('guestsManager', ['$http', function($http) {
    var URL = 'http://f2.smartjs.academy/list';

    function getGuests() {
        return $http.get(URL).then(function(response) {
            return response.data;
        });
    }

    return {
        getGuests: getGuests
    }
}]);