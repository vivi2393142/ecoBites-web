export const capitalize = (value: string): string =>
  `${value.slice(0, 1).toUpperCase()}${value.slice(1).toLowerCase()}`;

export const uploadPhotoFile = (): Promise<File> =>
  new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*,video/*');

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
        resolve(result);
      } else {
        reject(new Error('Failed to read file as Base64'));
      }
    };

    reader.readAsDataURL(file);
  });
