import { jsx } from "react/jsx-runtime";
import { useRef, useEffect } from "react";
import katex from "katex";
function MathRenderer({ math, block = false, className = "" }) {
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(math, containerRef.current, {
          displayMode: block,
          throwOnError: false,
          strict: false,
          trust: true
        });
      } catch (err) {
        console.error("KaTeX rendering error:", err);
        containerRef.current.textContent = math;
      }
    }
  }, [math, block]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: containerRef,
      className: `${block ? "math-block" : "inline-block"} ${className}`
    }
  );
}
export {
  MathRenderer as M
};
