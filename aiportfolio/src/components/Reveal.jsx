import React, { forwardRef, useCallback } from "react";
import { useInView } from "../hooks/useInView";

// Wrap anything in <Reveal> to get a scroll-triggered entrance animation.
// variant="flip" (default) tilts up from below; variant="deal" slides in
// from the left like a card being dealt (used for project cards).
// Forwards refs so it can also be the target of other effects
// (e.g. useAmbientParallax) at the same time.
export const Reveal = forwardRef(function Reveal(
  { children, as: Tag = "div", variant = "flip", className = "", ...rest },
  forwardedRef
) {
  const [ref, inView] = useInView(0.2);

  const setRefs = useCallback(
    (node) => {
      ref.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [ref, forwardedRef]
  );

  return (
    <Tag ref={setRefs} className={`reveal reveal-${variant} ${inView ? "in-view" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
});
