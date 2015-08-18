
exports.track = function(req, res) {
	var type = req.params.type,
	    session = req.params.session,
	    Track = require('../models/track').Track,
	    context, track;

	track = {
		user: session, 
		action: type
	};

	// gets the customer and player querystring parameters
	_getParams(track, req, ['customer', 'player']);

	// prepares the context array
	context = req.query['context'];
	if (context) {
		track.context = [];
		for (var i in context) {
			track.context.push({
				name: i,
				value: context[i]
			});
		}
	}

	var t = new Track(track);
	t.save(function(err) {
		res.contentType('application/json');
		res.send('var etrack_ok = ' + (!err).toString() + ';');
	});
};


function _getParams(obj, req, params) {
	for (var i = 0; i < params.length; i++) {
		if (param = req.query[params[i]]) {
			obj[params[i]] = param;
		}
	}
}