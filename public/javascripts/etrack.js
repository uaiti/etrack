
function eTrack(srv_addr, $) {
	this.session = null;
	this.customer = null;
	this.player = null;
	this.actions = {};

	var that = this;
	var address = (srv_addr ? srv_addr : 'http://localhost:3030/track/');

	function connect(addr) {
		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', addr);
		script.onload = function() {
			console.log('registered');
		}
		document.body.appendChild(script);
	}

	// saves the action user executed
	// {action} is a string that makes sense to your system
	this.save = function(action, context) {
		var addr = address + action + '/' + this.session;

		var params = {customer: this.customer, player: this.player, context: context};

		addr += "?" + $.param(params);

		connect(addr);
	};

	// tracks the links with data-action="" automatically
	this.trackLinks = function(attr) {
		if (!attr)
			attr = 'action';
		$(document).on('click', 'a[data-' + attr + ']', function() {
			that.save($(this).attr('data-' + attr));
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
};