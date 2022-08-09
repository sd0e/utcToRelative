import { utcToRelative } from '../index';

const getTwoDigitInteger = (integer: number) => {
	if (integer <= 9) {
		return `0${integer}`;
	} else {
		return `${integer}`;
	}
};

test('No Input', () => {
	expect(utcToRelative()).toBe(`Today, ${new Date().getHours()}:${getTwoDigitInteger(new Date().getMinutes())}`);
});
