export const isString = (value: unknown): value is string => typeof value === 'string';

export const isNumber = (value: unknown): value is number => typeof value === 'number';

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

export const isNumberString = (value: unknown): value is string =>
  isString(value) && !Number.isNaN(parseFloat(value));

export const isObject = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === 'object';

export const isArray = (value: unknown): value is unknown[] =>
  !!value && typeof value === 'object' && Array.isArray(value);

export const isStringArray = (value: unknown): value is string[] =>
  isArray(value) && value.every(isString);

export const isObjectArray = (value: unknown): value is Record<string, unknown>[] =>
  isArray(value) && value.every(isObject);
