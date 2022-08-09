enum HourFormat {
	t12 = '12',
	t24 = '24',
}

enum MonthFormat {
	full = 'full',
	concat = 'concat',
}

export const utcToRelative = (
	utc: number = new Date().getTime(),
	hourFormat: HourFormat = HourFormat.t24,
	monthFormat = MonthFormat.full,
	currentTime: number = new Date().getTime(),
) => {
	const currentDate: Date = new Date(currentTime);

	const getDayName = (dayDate: Date) => {
		const day: number = dayDate.getDay();
		return monthFormat === 'full'
			? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day]
			: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][day];
	};

	const getMonthName = (monthDate: Date) => {
		const month: number = monthDate.getMonth();
		return [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		][month];
	};

	const getTwoDigitInteger = (integer: number) => {
		if (integer <= 9) {
			return `0${integer}`;
		} else {
			return `${integer}`;
		}
	};

	const daysDiff = (utc - Date.now()) / 86400000;

	const date: Date = new Date(utc);
	const dayOfMonth: number = date.getDate();
	const currentDayOfMonth: number = currentDate.getDate();

	let returnString: string = '';
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

		returnString += `${isAM ? date.getHours() : date.getHours() - 12}:${getTwoDigitInteger(date.getMinutes())} ${
			isAM ? 'am' : 'pm'
		}`;
	}

	return returnString;
};
