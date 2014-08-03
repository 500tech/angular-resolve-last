(function() {
  angular.module('500tech.angular-resolve-last').factory('resolveLast', [
    '$q', function($q) {
      var pendingRequests;
      pendingRequests = {};
      return function(name, promise) {
        var deferred;
        pendingRequests.name || (pendingRequests.name = []);
        deferred = $q.defer();
        (function() {
          var requestId;
          requestId = Math.random();
          pendingRequests.name.push(requestId);
          if (_.isFunction(promise)) {
            promise = promise();
          }
          if (!promise.then) {
            console.error('Must provide a promise or a function that returns a promise');
          }
          return promise.then(function() {
            if (pendingRequests.name.last() === requestId) {
              deferred.resolve(arguments);
            }
            return _.remove(pendingRequests.name, function(id) {
              return id === requestId;
            });
          });
        })();
        return deferred.promise;
      };
    }
  ]);

}).call(this);

/*
//@ sourceMappingURL=resolve_last.js.map
*/