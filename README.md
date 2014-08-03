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

include the dist/resolve_last.js file from your index.html:
```
<script src="bower_components/angular-resolve-last/dist/resolve_last.js"></script>
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
function search(term) {
  resolveLast('searchAutocomplete',  $http.get('api/search?q=' + term))
  .then(function() {
    console.log('search complete')
  })
}
```
Calling:
```
search('so')
search('some')
search('someth')
search('something')
```
will result in only 1 output line to the console:
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
