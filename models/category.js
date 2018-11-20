const db = require(__dirname + '/schema/category_info').getDB();


module.exports = {
    find : function(commandObj, callback) {
        
        console.log(commandObj);
        
        db.category.find(commandObj.query, commandObj.projection
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
        
        db.category.findOne(commandObj.query).exec(function (err, data) {
            if (err) {
                return callback(false);
            }
            
            if (!data) {
                return callback(false);
            }
            
            db.category.update(commandObj.query, { $set : commandObj.updateQuery }, function (err) {
                if (err) {
                    callback(false);
                } else {
                    callback(true);
                }
            });
        });
    },
    
    insert : function(snapshot, callback) {
        
        const db_snapshot = new db.category(snapshot);
        
        db_snapshot.save((err) => {
            if (err) { callback(false); }
            else { callback(true); }
        });
    },
    
    count : function(commandObj, callback) {
        db.category.find(commandObj.query, commandObj.projection).count(function (err, count) {
            if (err) {
                console.log('category.js:count fail', err);
                callback(0);
            }
            else {
                callback(count);
            }
        });
    },
};
