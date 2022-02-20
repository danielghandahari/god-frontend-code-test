// https://usehooks.com/useWindowSize/
import { useState, useEffect } from "react";

interface Size {
  width: number | undefined;
  height: number | undefined;
}

const MOBILE_BREAKPOINT = 768;

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    windowSize,
    isMobile: windowSize.width && windowSize.width < MOBILE_BREAKPOINT,
  };
}
