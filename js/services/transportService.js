angular.module('guestList').factory('transportService', ['$q', function($q) {
    var wsURL = 'ws://f2.smartjs.academy/ws';
    var ws = null;

    function getSocket() {
        if (ws) {
            return $q.when(ws);
        }

        var deferred = $q.defer();
        ws = new WebSocket(wsURL);

        ws.onopen = function() {
            ws.onopen = null;
            ws.onerror = null;
            deferred.resolve(ws);
        };
        ws.onerror = function() {
            ws.onopen = null;
            ws.onerror = null;
            deferred.reject(ws);
        };

        return deferred.promise;
    }

    function openConnection() {
        getSocket();
    }

    function sendMessage(message, action) {
        getSocket().then(function(socket) {
            socket.send(JSON.stringify(_.assign({action: action}, message)));
        });
    }

    function onMessage(fn) {
        getSocket().then(function(socket) {
            socket.onmessage = function(event) {
                fn(JSON.parse(event.data));
            }
        });
    }

    return {
        onMessage: onMessage,
        sendMessage: sendMessage,
        openConnection: openConnection
    }


}]);