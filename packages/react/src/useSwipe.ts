import { useEffect, useRef } from 'react';

export function useSwipe(
  ref: React.RefObject<HTMLDivElement | null>,
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
  threshold = 50,
) {
  const startX = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onTouchStart(e: TouchEvent) {
      startX.current = e.touches[0].clientX;
    }

    function onTouchEnd(e: TouchEvent) {
      const dx = e.changedTouches[0].clientX - startX.current;
      if (Math.abs(dx) > threshold) {
        dx > 0 ? onSwipeRight() : onSwipeLeft();
      }
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [ref, onSwipeLeft, onSwipeRight, threshold]);
}
