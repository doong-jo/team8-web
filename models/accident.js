const db = require(__dirname + '/schema/accident_info').getDB();

module.exports = {
    find : function(commandObj, callback) {
        
        console.log(commandObj);
        
        db.accident.find(commandObj.query, commandObj.projection
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
			    console.log(data);
                callback(data);
            }
        });
    },
    
    insert : function(snapshot, callback) {
        
        const db_snapshot = new db.accident(snapshot);
        
        db_snapshot.save((err) => {
            if (err) { callback(false); }
            else { callback(true); }
        });
    },
};
