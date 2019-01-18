const db = require(__dirname + '/schema/user_info').getDB();


module.exports = {
    find : function(commandObj, callback) {
        
        console.log(commandObj);
        
        db.user.find(commandObj.query, commandObj.projection
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
    
    put : function(commandObj, callback) {
        console.log(commandObj);
        
        db.user.updateOne(commandObj.query, { $set : commandObj.updateQuery }, function (err) {
            if (err) {
                callback(false);
            } else {
                callback(true);
            }
        });
    },
    
    insert : function(snapshot, callback) {
        
        const db_snapshot = new db.user(snapshot);
        
        db_snapshot.save((err) => {
            if (err) { callback(false); }
            else { callback(true); }
        });
    },
    
    count : function(commandObj, callback) {
        db.user.find(commandObj.query, commandObj.projection).countDocuments(function (err, count) {
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
