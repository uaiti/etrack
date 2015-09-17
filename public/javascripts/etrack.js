( function( global, undefined ) {

	global.$ = global.$ || function (query) {

		return document.querySelectorAll(query);
	};

	global.$.param = global.$.param || function(obj, prefix) {
		var str = [];
		for(var p in obj) {
			var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
			if(v){
				str.push(typeof v == "object" ?global.$.param(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
			}
		}
		return str.join("&");
	};

	function eTrack(srv_addr, $) {
		this.session = null;
		this.customer = null;
		this.player = null;
		this.actions = {};

		var that = this;
		var address = (srv_addr ? srv_addr : 'http://localhost:3030/track/');

		function connect(addr, callback) {
			var script = document.createElement('script');
			script.setAttribute('type', 'text/javascript');
			script.setAttribute('src', addr);

			script.onload = function() {
				document.body.removeChild(script);

				if(typeof(callback) == 'function')
					callback(null);
			}

			script.onerror = function(err) {
				document.body.removeChild(script);

				if(typeof(callback) == 'function')
					callback(err);
			}

			document.body.appendChild(script);
		}

		// saves the action user executed
		// {action} is a string that makes sense to your system
		this.save = function(action, context, callback) {
			var addr = address + action + '/' + this.session;

			var params = {customer: that.customer, player: that.player, route: that.route, context: context};
			addr += "?" + global.$.param(params);

			connect(addr, callback);
		};

		// tracks the links with data-action="" automatically
		this.trackLinks = function(attr) {
			if (!attr)
				attr = 'action';

			[].slice.call(global.$('a[data-' + attr + ']')).forEach(function(el,i){
				el.addEventListener('click', function(){
					that.save(el.getAttribute('data-' + attr));
				})
			});
		};

		this.setSession = function(sessionId) {
			that.session = sessionId;
		};
		this.setCustomer = function(customer) {
			that.customer = customer;
		};
		this.setPlayer = function(player) {
			that.player = player;
		};
		this.setRoute = function(route) {
			that.route = route;
		};
	}

	// expose access to the constructor
	window.eTrack = eTrack;

} )( window );
