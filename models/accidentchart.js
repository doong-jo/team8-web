const db = require(__dirname + '/schema/accidentchart_info').getDB();

module.exports = {
    find : function(commandObj, callback) {
        
        console.log(commandObj);
        
        db.accidentchart.find(commandObj.query, commandObj.projection
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
        const db_snapshot = new db.accidentchart(snapshot);            
        
        db_snapshot.save((err) => {
            if (err) { callback(false); }
            else { callback(true); }
        });
    },
    
    updateOne : (commonObj, callback) => {
        db.accidentchart.updateOne(commonObj.query, commonObj.updateQuery,commonObj.upsert).exec((err, data) => {
            if (err) {
                callback(false);
            } else {
                console.log(data);
                callback(true);
            }
        });
    },
    count : function(commandObj, callback) {
        db.accidentchart.find(commandObj.query, commandObj.projection).countDocuments(function (err, count) {
            if (err) {
                console.log('accidentchart.js:count fail', err);
                callback(-1);
            }
            else {
                callback(count);
            }
        });
    },
};
