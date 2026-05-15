import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
function FAQSection({ items, title = "Frequently Asked Questions" }) {
  const [open, setOpen] = useState(null);
  return /* @__PURE__ */ jsxs("section", { className: "w-full", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-6", style: { color: "var(--text-primary)" }, children: title }),
    /* @__PURE__ */ jsx("div", { className: "space-y-2", children: items.map((item, i) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "rounded-2xl overflow-hidden transition-all duration-200",
        style: {
          background: "var(--bg-surface)",
          border: `1px solid ${open === i ? "var(--amber)" : "var(--border)"}`
        },
        children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setOpen(open === i ? null : i),
              className: "w-full flex items-center justify-between px-5 py-4 text-left gap-4",
              "aria-expanded": open === i,
              children: [
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm", style: { color: "var(--text-primary)" }, children: item.q }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    style: {
                      color: "var(--text-muted)",
                      transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                      flexShrink: 0
                    },
                    children: /* @__PURE__ */ jsx("path", { d: "m6 9 6 6 6-6" })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                maxHeight: open === i ? "400px" : "0",
                overflow: "hidden",
                transition: "max-height 0.3s ease"
              },
              children: /* @__PURE__ */ jsx("p", { className: "px-5 pb-4 text-sm leading-relaxed", style: { color: "var(--text-secondary)" }, children: item.a })
            }
          )
        ]
      },
      i
    )) })
  ] });
}
export {
  FAQSection as F
};
