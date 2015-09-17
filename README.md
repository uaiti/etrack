REAME
==========

eTrack is a nodejs application to capture basic metrics for your software.

You can set the links your user accessed and actions he executed by calling a function that saves the action in a mongodb collection.

By now, it only saves the information. In a near future we will have an analytical module.

eTrack depends expressjs and mongoose in the server. The client side is stand alone, although it has a optional dependecy of jQuery for automatic links tracking.


Usage
------

To use eTrack you will need nodejs and npm to be installed. To start your server:

```shell
$ git clone https://github.com/charlesschaefer/etrack.git etrack
$ cd etrack
$ npm -d install
$ node app.js
Express server listening on port 3030 in development mode
```

In your application HTML, you need to call the etrack.js file:

```html
<script type="text/javascript" src="http://localhost:3030/javascripts/etrack.js"></script>
```

You can listen to your user actions automatically by using the eTrack's trackLinks() function:

```html
<script type="text/javascript">
	var track = new eTrack('http://localhost:3030/track/', jQuery);
	track.trackLinks('action'); // will catch the data-action="" attribute
</script>
<!-- ..... -->
<a href="an_awesome_page.html" data-action="awesome_page">Visit this awesome Page</a>
```

You can also trigger an action manually, calling the save() method:

```html
<a href="#awesome_action" onclick="track.save('awesome_action')">Be surprised</a>
```


Functional Example
------------------

```javascript
var track = new eTrack('http://localhost:3030/track/', jQuery);
track.trackLinks('action'); // will catch the data-action="" attribute
track.setSession('etrack-user');
track.setCustomer('new-customer');
track.setPlayer('the-computer-id');
track.setAction('the-action');
track.save("startingAPP", {productId: 12, dayOfMonth: (new Date()).getDate()});
```



Fetching Data by Context
------------------------

Consider the document:
```json
{
	"action": "show",
	"user": "john",
	"context": [{
		"name": "product",
		"value": "12"
	},{
		"name": "service",
		"value": "18"
	}]
}
```

To fetch only the documents where context is of product=12, you should use the following query:
```js
db.tracks.find({"context": {$elemMatch: {"name":"product", "value": "12"}}});
```
