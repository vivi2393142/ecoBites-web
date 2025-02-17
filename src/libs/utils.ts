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

export const uploadPhotoFile = (): Promise<File> =>
  new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*,video/*');

    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

    if (isMobile) {
      input.setAttribute('capture', 'environment');
    }

    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];

      if (!file) {
        reject(new Error('No file selected'));
        return;
      }

      resolve(file);
    };

    input.click();
  });

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        resolve(result); // 回傳 Base64
      } else {
        reject(new Error('Failed to read file as Base64'));
      }
    };

    reader.readAsDataURL(file); // 轉 Base64
  });
