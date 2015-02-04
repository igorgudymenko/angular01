angular.module('guestList').factory('syncService', ['transportService', function (transportService) {
    var connected = false;
    var updateFn = null;
    var removeFn = null;
    var addFn = null;

    function _handleMessage(message) {
        if (message.action === 'update' && updateFn) {
            guest = _.assign(_.clone(message.guest), {id: message.guest.id});
            updateFn(guest);
        }

        if (message.action === 'remove' && removeFn) {
            removeFn(message.id);
        }

        if (message.action === 'add' && addFn) {
            guest = _.assign(_.clone(message.guest), {id: message.guest.id});
            addFn(guest);
        }
    }

    function connect() {
        transportService.openConnection();
        transportService.onMessage(_handleMessage);
        connected = true;
    }

    function removeGuest(guestId) {
        if (!connected) {
            throw new Error("You are not connected");
        }

        return transportService.sendMessage({action: 'remove', id: guestId});
    }

    function addGuest(guest) {
        if (!connected) {
            throw new Error("You are not connected");
        }
        var message = {guest: guest};

        return transportService.sendMessage(message, 'add');
    }

    function updateGuest(guest) {
        var message = {guest: guest};
        return transportService.sendMessage(message, 'update')
    }


    function onGuestUpdate(fn) {
        updateFn = fn;
    }

    function onGuestRemove(fn) {
        removeFn = fn;
    }

    function onGuestAdd(fn) {
        addFn = fn;
    }


    return {
        connect: connect,
        removeGuest: removeGuest,
        addGuest: addGuest,
        updateGuest: updateGuest,
        onGuestUpdate: onGuestUpdate,
        onGuestRemove: onGuestRemove,
        onGuestAdd: onGuestAdd
    };


}]);