import { RefObject, useEffect, useState } from "react";

export default function useCheckOverMouseOnElement<T extends HTMLElement>(ref: RefObject<T>) {

  const [isOver, setIsOver] = useState(false);

  function onMouseEnter() {
    setIsOver(true);
  }

  function onMouseLeave() {
    setIsOver(false);
  }

  useEffect(() => {
    const element = ref.current;
    element?.addEventListener('mouseenter', onMouseEnter);
    element?.addEventListener('mouseleave', onMouseLeave);

    return () => {
      element?.removeEventListener('mouseenter', onMouseEnter);
      element?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [ref]);

  return isOver;
}