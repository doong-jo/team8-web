import queryString from 'querystring';

const formattedNumberTwoDigit = (number) => ("0" + number).slice(-2);

const timeFormatter = (o) => {
    let time = '';
    let timeObj;
    let todayMonth;
    if (o) {
        timeObj = new Date(o);
        todayMonth = timeObj.getMonth() + 1;
        time =
            `${timeObj.getFullYear()}-${formattedNumberTwoDigit(todayMonth)}-${formattedNumberTwoDigit(timeObj.getDate())}T${formattedNumberTwoDigit(timeObj.getHours())}:${formattedNumberTwoDigit(timeObj.getMinutes())}`;
    }
    return time;
};

const getFullUri = (uri, queryObj) => `${uri}?${queryString.stringify(queryObj)}`;

const getFullUriNotStringify = (uri, queryObj) => `${uri}?${queryObj}`;

const getISOToDateTimeLocale = (time) => {
    let convertTime = time.split('.')[0].split(':');
    convertTime = convertTime.splice(0, 2);
    convertTime = convertTime.join(':');

    return convertTime;
};

module.exports = {
    timeFormatter, getISOToDateTimeLocale, getFullUri, getFullUriNotStringify,
};
