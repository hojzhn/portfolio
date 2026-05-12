import { useEffect, useRef } from "react";

export function useLazyAutoplay() {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {}); // ignore autoplay failures
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 },
    );

    obs.observe(video);
    return () => obs.disconnect();
  }, []);

  return ref;
}
