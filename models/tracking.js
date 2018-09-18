const db = require(__dirname + '/schema/trackingInfo').getDB();


module.exports = {
    find : function(commandObj, callback) {
        
        db.tracking.find(commandObj.query, commandObj.projection
        ).limit(
			commandObj.limit
		).skip(
			commandObj.skip
		).sort(
			commandObj.sort
		).exec(function(err, data){
			if (err) {
				callback(null);
			} else {
				callback(data);
			}
		});
    },
    
    insert : function(snapshot, callback) {
        
        const db_snapshot = new db.tracking(snapshot);
        
        db_snapshot.save((err) => {
            if (err) { callback(false); }
            else { callback(true); }
        });
    },
    
    count : function(commandObj, callback) {
        db.user.find(commandObj.query, commandObj.projection).count(function (err, count) {
			if (err) {
				console.log('user.js:count fail', err);
				callback(0);
			}
			else {
				callback(count);
			}
		});
    },
};
