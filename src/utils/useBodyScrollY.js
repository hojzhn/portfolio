import { useEffect, useState } from "react";

export function useBodyScrollY() {
  const [y, setY] = useState(0);

  useEffect(() => {
    const read = () => {
      const v =
        window.scrollY ??
        document.documentElement.scrollTop ??
        document.body.scrollTop ??
        0;
      setY(v);
    };

    read(); // initial
    window.addEventListener("scroll", read, { passive: true });
    return () => window.removeEventListener("scroll", read);
  }, []);

  return y;
}
