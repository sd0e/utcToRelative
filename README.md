# utcToRelative

utcToRelative is a package which converts a UTC time (in milliseconds) into a local time string which is relative to the current date. The purpose is to provide the user with an easier to understand time, such as `Tomorrow, 16:00` or `Sunday, 16:00` rather than `7 August 2022, 16:00`.

## Installation

utcToRelative can be installed by running `npm i --save utctorelative`.

It can be used by writing `import { utcToRelative } from 'utctorelative'` and calling the function `utcToRelative`.

## Parameters

### `utc`

This is the UTC time in milliseconds from which the relative date string will be calculated.

This is passed as an integer (e.g. `1659885783755`).

The default value is the current time in milliseconds.

---

### `hourFormat`

This determines whether the time will be displayed in 12-hour or 24-hour time (e.g. `4:23 pm` or `16:23` respectively).

This is passed as a string of either `"12"` or `"24"`.

The default value is `"24"`.

---

### `monthFormat`

This determines whether the month will be displayed in a full or concatenated form (e.g. `August` or `Aug` respectively).

This is passed as a string of either `"full"` or `"concat"`.

The default value is `"full"`.

---

### `currentTime`

This is the current UTC time in milliseconds, which will be compared with the `utc` parameter to create a relative date string. This only needs to be defined if you do not want to use the system time as the current time.

This is passed as an integer (e.g. `1659885783755`).

The default value is the current time in milliseconds, according to the system time.

## Examples

For the purpose of these examples, `1659885783755` is Sunday, 7 August 2022 at 4:23 pm.

The following table shows the output of the following code when it is run on the stated days:

```
import { utcToRelative } from 'utctorelative';

console.log(utcToRelative(1659885783755, '12'));
```

| Date | Output |
| --- | --- |
| 20th July, 2021 | 7 August 2022, 4:23 pm |
| 20th July, 2022 | 7 August, 4:23 pm |
| 4th August, 2022 | Sunday, 4:23 pm |
| 6th August, 2022 | Tomorrow, 4:23 pm |
| 7th August, 2022 | Today, 4:23 pm |
| 8th August, 2022 | Yesterday, 4:23 pm |
| 10th August, 2022 | Last Sunday, 4:23 pm |
| 20th August, 2022 | 7 August, 4:23 pm |
| 20th August, 2023 | 7 August 2022, 4:23 pm |