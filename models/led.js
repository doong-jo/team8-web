const db = require(__dirname + '/schema/led_info').getDB();


module.exports = {
    find : function(commandObj, callback) {
        
        console.log(commandObj);
        
        db.led.find(commandObj.query, commandObj.projection
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
    
    downloadCount : function(commandObj, callback) {
        console.log("downloadCount", commandObj.query, { $inc : { downloadcnt : commandObj.updateQuery.downloadcnt } });
        db.led.update(commandObj.query, { $inc : { downloadcnt : commandObj.updateQuery.downloadcnt } }, function (err) {
            if(err) {
                callback(false);
            } else {
                callback(true);
            }
        })
    },
    
    put : function(commandObj, callback) {
        console.log(commandObj);
        
        db.led.updateOne(commandObj.query, { $set : commandObj.updateQuery }, function (err) {
            if (err) {
                callback(false);
            } else {
                callback(true);
            }
        });
    },
    
    insert : function(snapshot, callback) {
        
        const db_snapshot = new db.led(snapshot);
        
        db_snapshot.save((err) => {
            if (err) { callback(false); }
            else { callback(true); }
        });
    },
    
    count : function(commandObj, callback) {
        db.led.find(commandObj.query, commandObj.projection).count(function (err, count) {
            if (err) {
                console.log('led.js:count fail', err);
                callback(0);
            }
            else {
                callback(count);
            }
        });
    },
};
