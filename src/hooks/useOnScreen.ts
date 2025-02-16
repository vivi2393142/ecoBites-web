import { MutableRefObject, useEffect, useState } from 'react';

const useOnScreen = (
  ref: MutableRefObject<HTMLElement | null>,
  options?: IntersectionObserverInit,
): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      options,
    );
    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
};

export default useOnScreen;
