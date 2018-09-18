const has = require('has');

Date.prototype.addDays = (days) => {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

module.exports = {
    initTemplate : (state, req, res) => {
        const initState = state;

        res.send(template(initState));
    },
    
    convertObjToGetMethod : (queryObj, optionObj, viewData) => {
        for(const key in viewData) {
            if( key === 'order'  || key === 'skip' || key === 'limit') {
                optionObj[key] = JSON.parse(viewData[key]);
            } else if( key === 'sort' ) {
                optionObj[key] = viewData[key];
            }else {
                queryObj[key] = viewData[key];
            }
        }
    },
    
    getFindQuery : (query, projection, option) => {
        if(option === undefined ) {
            option = {};
        }
        
        let sortObj = {
            [option.sort]: option.order === undefined ? 1 : option.order
        };
        
        let mongoQuery = {
            query : {},
            projection : {},
            sort : option.sort !== undefined ? sortObj : {},
            skip : option.skip !== undefined ? option.skip : 0,
            limit : option.limit !== undefined ? option.limit : 0
        };
        
        mongoQuery.query = Object.assign(query);
        mongoQuery.projection = Object.assign(projection);
        
        return mongoQuery;
    },
	
	getUpdateQuery : (queryObj) => {
        let mongoQuery = {
            query : {},
            updateQuery : {},
        };
        
        mongoQuery.query = Object.assign(queryObj.query);
        mongoQuery.updateQuery = Object.assign(queryObj.updateQuery);
        
        return mongoQuery;
    },
};
