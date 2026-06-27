import { useEffect, useState } from 'react';

export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches || window.innerWidth <= 768);

    onChange();
    try {
      mq.addEventListener('change', onChange);
    } catch (e) {
      // Safari fallback
      mq.addListener(onChange);
    }

    const onResize = () => setReduced(mq.matches || window.innerWidth <= 768);
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      try {
        mq.removeEventListener('change', onChange);
      } catch (e) {
        mq.removeListener(onChange);
      }
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return reduced;
}
