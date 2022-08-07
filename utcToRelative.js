module.exports = function utcToRelative(utc = new Date().getTime(), hourFormat = '24', monthFormat = 'full', currentTime = new Date().getTime()) {
    const currentDate = new Date(currentTime);

    const getDayName = date => {
        const day = date.getDay();
        return monthFormat === 'full' ? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day] : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][day];
    }

    const getMonthName = date => {
        const month = date.getMonth();
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month];
    }

    const getTwoDigitInteger = integer => {
        if (integer <= 9) {
            return `0${integer}`;
        } else {
            return `${integer}`;
        }
    }

    const daysDiff = (utc - Date.now()) / 86400000;

    const date = new Date(utc);
    const dayOfMonth = date.getDate();
    const currentDayOfMonth = currentDate.getDate();

    let returnString = '';
    if (daysDiff <= 6 && daysDiff >= -6) {
        if (dayOfMonth === currentDayOfMonth) {
            returnString += 'Today';
        } else if (currentDayOfMonth - dayOfMonth === 1) {
            returnString += 'Yesterday';
        } else if (currentDayOfMonth - dayOfMonth === -1) {
            returnString += 'Tomorrow';
        } else {
            returnString += getDayName(date);
    
            if (daysDiff < 0) returnString = 'Last ' + returnString;
        }
    } else {
        const isSameYear = date.getFullYear() === currentDate.getFullYear();

        returnString += `${dayOfMonth} ${getMonthName(date)}${isSameYear ? '' : ' ' + date.getFullYear()}`;
    }

    returnString += ', ';

    if (hourFormat === '24') {
        returnString += `${date.getHours()}:${getTwoDigitInteger(date.getMinutes())}`;
    } else {
        const isAM = date.getHours() / 12 < 1;

        returnString += `${isAM ? date.getHours() : date.getHours() - 12}:${getTwoDigitInteger(date.getMinutes())} ${isAM ? 'am' : 'pm'}`;
    }

    return returnString;
}