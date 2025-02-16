declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const jpgPath: string;
  export default jpgPath;
}

declare module '*.jpeg' {
  const jpegPath: string;
  export default jpegPath;
}

declare module '*.png' {
  const pngPath: string;
  export default pngPath;
}
