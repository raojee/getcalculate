import { jsx } from "react/jsx-runtime";
function GlassCard({ children, className = "", onClick, hover = true }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      onClick,
      className: `rounded-3xl glass p-6 transition-all duration-300 ${onClick ? "cursor-pointer" : ""} ${className} ${hover ? "hover:-translate-y-1 hover:shadow-lg" : ""}`,
      style: { boxShadow: "var(--shadow-card)" },
      children
    }
  );
}
export {
  GlassCard as G
};
