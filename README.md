angular-resolve-last
===========

angular-resolve-last let's you handle only the last promise that was resolved during a batch of actions

Very useful when making several HTTP calls but only caring about the last response.
For example: search autocomplete, polling the server, requests based on current location, etc.

## Usage:

### Install
install using bower:
```
bower install angular-resolve-last
```

### Inject
include the 'angular-resolve-last' module in your dependencies:
```
angular.module('myModule', ['angular-resolve-last'])
```

inject the 'resolveLast' factory into your controller / service / whatever:
```
angular.module('myModule').controller('myController', ['resolveLast', function() {
  ...
}])
```

### Use
once resolveLast is injected it can be used around angular promises, or functions that return a promise.
You have to give a name to the batch in order for resolveLast to associate these calls together:
```
function search() {
  resolveLast('search',  $http.get('api/search'))
  .then(function() {
    console.log('search complete')
  })
}
```
Calling search() 4 times in a row will result in only 1 output line to the console:
```
search complete
```

Without resolveLast, the output would be:
```
search complete
search complete
search complete
search complete
```
