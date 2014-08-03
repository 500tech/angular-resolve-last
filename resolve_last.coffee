angular.module('500tech.angular-resolve-last').factory 'resolveLast', ['$q', ($q) ->
  pendingRequests = {}
  (name, promise) ->
    pendingRequests.name ||= []
    deferred = $q.defer()
    (() ->
      requestId = Math.random()
      pendingRequests.name.push(requestId)
      if _.isFunction(promise)
        promise = promise()

      console.error('Must provide a promise or a function that returns a promise') unless promise.then
      promise.then ->
          if pendingRequests.name.last() == requestId # Only handling the last request
            deferred.resolve(arguments)
          _.remove(pendingRequests.name, (id) -> id == requestId)
    )()
    deferred.promise
]