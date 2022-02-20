import React from "react";

const SCROLL_OFFSET = 250;

export default function useHorizontalScroll(
  refElement: React.MutableRefObject<HTMLElement | null>
) {
  function scroll(scrollOffset: number) {
    if (refElement && refElement.current) {
      refElement.current.scrollLeft += scrollOffset;
    }
  }

  function scrollLeft() {
    scroll(-SCROLL_OFFSET);
  }

  function scrollRight() {
    scroll(SCROLL_OFFSET);
  }

  return { scrollLeft, scrollRight };
}
