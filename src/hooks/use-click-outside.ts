import { useEffect, useLayoutEffect, useRef } from 'react';

type TUseClickOutsideProps = (e: Event) => void;

export function useClickOutside<T extends HTMLElement>(
  cb: TUseClickOutsideProps,
) {
  const ref = useRef<T>(null);
  const refCb = useRef(cb);

  useLayoutEffect(() => {
    refCb.current = cb;
  });

  useEffect(() => {
    const handler = (e: Event) => {
      const element = ref.current;
      if (element && !element.contains(e.target as HTMLElement)) {
        refCb.current(e);
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    document.addEventListener('focusin', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
      document.addEventListener('focusin', handler);
    };
  }, []);

  return ref;
}
