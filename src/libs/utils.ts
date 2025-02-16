export const safeCreateDate = (value: string) => {
  const dateValue = new Date(value);

  if (dateValue.toString() === 'Invalid Date') return undefined;
  return dateValue;
};

export const capitalize = (value: string): string =>
  `${value.slice(0, 1).toUpperCase()}${value.slice(1).toLowerCase()}`;

export const pick = <T extends Record<string, unknown>>(object: T, pickKeys: (keyof T)[]) => {
  const newObject: Partial<T> = {};
  (Object.entries(object) as [keyof T, T[keyof T]][]).forEach(([key, value]) => {
    if (pickKeys.includes(key)) {
      newObject[key] = value;
    }
  });

  return newObject as Pick<T, keyof T>;
};

export const omit = <T extends Record<string, unknown>>(object: T, omitKeys: (keyof T)[]) => {
  const newObject: Partial<T> = {};
  (Object.entries(object) as [keyof T, T[keyof T]][]).forEach(([key, value]) => {
    if (!omitKeys.includes(key)) {
      newObject[key] = value;
    }
  });

  return newObject as Omit<T, keyof T>;
};

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Omit<T, Keys> &
  {
    [K in Keys]: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, never>>;
  }[Keys];

export type PartialRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export const mapEnumValues = <
  T extends Record<string, string | number>,
  K extends (v: T[keyof T]) => unknown,
>(
  enumObj: T,
  valueGetter: K,
) => {
  return (Object.values(enumObj) as T[keyof T][]).reduce<Record<T[keyof T], ReturnType<K>>>(
    (acc, curr) => {
      acc[curr] = valueGetter(curr) as ReturnType<K>;
      return acc;
    },
    {} as Record<T[keyof T], ReturnType<K>>,
  );
};
