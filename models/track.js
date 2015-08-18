var mongoose = require('mongoose')
	, db = mongoose.createConnection('localhost', 'etrack');

var ContextSchema = new mongoose.Schema({
	name  : 'string',
	value : 'string'
});

var TrackSchema = new mongoose.Schema({
    user     : 'string',
    action   : 'string',
    customer : 'string',
    player   : 'string',
    context  : [ContextSchema],
    date     : {type: Date, default: Date.now}
});
var Track = db.model('Track', TrackSchema);

exports.Track = Track;
