/* Translation */

/* Regex */
export const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const phoneRegex = /^\(([0-9]{2,3})\)([0-9]{3,4})-([0-9]{4})$/; // (02)123-5678, (02)1234-5678
export const mobileRegex = /^09([0-9]{2})-([0-9]{3})-([0-9]{3})$/; // 0912-345-678

export const positiveIntegerRegex = /^[1-9]\d*$/;
export const nonNegativeIntegerRegex = /^(0|[1-9]\d*)$/;

export const fullDateTimeStrFormat = 'yyyy/M/d HH:mm:ss';
export const fullDateStrFormatWithPrefix = 'yyyy/MM/dd';
export const fullDateTimeStrFormatWithPrefix = 'yyyy/MM/dd HH:mm:ss';

export const dbDateFormat = 'yyyy-MM-dd';
export const dbMonthFormat = 'yyyy-MM';
export const dbFullDateTimeFormat = 'yyyy-MM-dd HH:mm';
