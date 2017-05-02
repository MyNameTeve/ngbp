(function(angular){

  /**
    @name sckt
    @memberof ngbp
    @ngdoc factory
    @description uses the $websocket service to provide reuseable sockets to components
  */
  angular.module('ngbp').factory('sckt', function($q, $rootScope, $log, $websocket) {
    $log.log("sckt factory is running");

    var sockets = {};

    var connect = url => {
      var b64 = window.btoa(url);
      if (sockets[b64]) {
        sockets[b64].connections++;
        return sockets[b64];
      } else {
        var socket = $websocket(url);
        sockets[b64] = {
          'socket': socket,
          'connections' : 1
        };
        return sockets[b64];
      }
    };

    var disconnect = url => {
      var b64 = window.btoa(url);
      if (sockets[b64]) {
        sockets[b64].connections--;
      }
      if (!sockets[b64].connections) {
        sockets[b64].socket.close();
        delete sockets[b64];
      }
      $log.log(Object.keys(sockets).length, 'sockets');
    };

    return {
      connect,
      disconnect
    };

  });

}(window.angular));
