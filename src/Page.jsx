import queryString from 'querystring';

const timeFormatter = (o) => {
    let time = '';
    let timeObj;
    let todayMonth;
    if (o) {
        timeObj = new Date(o);
        todayMonth = timeObj.getMonth() + 1;
        time =
            `${timeObj.getFullYear()}/${todayMonth}/${timeObj.getDate()}
            ${timeObj.getHours()}:${timeObj.getMinutes()}`;
    }
    return time;
};

const getFullUri = (uri, queryObj) => `${uri}?${queryString.stringify(queryObj)}`;

const getISOToDateTimeLocale = time => {
    time = time.split('.')[0].split(':');
    time = time.splice(0, 2);
    time = time.join(':');
    
    return time;
}

module.exports = {
    timeFormatter, getISOToDateTimeLocale, getFullUri,
};
