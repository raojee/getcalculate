import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { G as GlassCard } from "./GlassCard-BneF3lW9.js";
function PercentageCalculator() {
  const [val1, setVal1] = useState(20);
  const [val2, setVal2] = useState(150);
  const [change1, setChange1] = useState(100);
  const [change2, setChange2] = useState(120);
  const whatIsXOfY = val1 * val2 / 100;
  const percentChange = (change2 - change1) / Math.abs(change1) * 100;
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs(GlassCard, { className: "glass-amber flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold uppercase tracking-widest mb-6", style: { color: "var(--text-muted)" }, children: "What is X% of Y?" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsx("input", { type: "number", value: val1, onChange: (e) => setVal1(Number(e.target.value)), className: "w-24 px-3 py-3 rounded-xl bg-display border-strong outline-none font-bold text-center", style: { background: "var(--bg-display)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" } }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-muted", children: "% of" }),
            /* @__PURE__ */ jsx("input", { type: "number", value: val2, onChange: (e) => setVal2(Number(e.target.value)), className: "w-32 px-3 py-3 rounded-xl bg-display border-strong outline-none font-bold text-center", style: { background: "var(--bg-display)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" } })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase tracking-widest text-muted mb-1", children: "Result" }),
          /* @__PURE__ */ jsx("div", { className: "text-4xl font-extrabold", style: { color: "var(--amber)" }, children: parseFloat(whatIsXOfY.toFixed(4)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(GlassCard, { className: "flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold uppercase tracking-widest mb-6", style: { color: "var(--text-muted)" }, children: "Percentage Increase/Decrease" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-muted", children: "From" }),
            /* @__PURE__ */ jsx("input", { type: "number", value: change1, onChange: (e) => setChange1(Number(e.target.value)), className: "w-24 px-3 py-3 rounded-xl bg-display border-strong outline-none font-bold text-center", style: { background: "var(--bg-display)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" } }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-muted", children: "to" }),
            /* @__PURE__ */ jsx("input", { type: "number", value: change2, onChange: (e) => setChange2(Number(e.target.value)), className: "w-24 px-3 py-3 rounded-xl bg-display border-strong outline-none font-bold text-center", style: { background: "var(--bg-display)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" } })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase tracking-widest text-muted mb-1", children: "Result" }),
          /* @__PURE__ */ jsxs("div", { className: "text-4xl font-extrabold flex items-baseline gap-2", style: { color: percentChange >= 0 ? "#4ade80" : "#f87171" }, children: [
            percentChange >= 0 ? "+" : "",
            parseFloat(percentChange.toFixed(2)),
            "%",
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase", style: { color: "var(--text-muted)" }, children: percentChange >= 0 ? "Increase" : "Decrease" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6", children: [
      { label: "Tip (15%)", val: val2 * 0.15 },
      { label: "Tip (18%)", val: val2 * 0.18 },
      { label: "Tip (20%)", val: val2 * 0.2 }
    ].map((tip) => /* @__PURE__ */ jsxs(GlassCard, { className: "py-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-[10px] font-bold uppercase tracking-widest text-muted mb-1", children: [
        tip.label,
        " on ",
        val2
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", style: { color: "var(--text-primary)" }, children: parseFloat(tip.val.toFixed(2)) })
    ] }, tip.label)) })
  ] });
}
function PercentagePage() {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 py-10 animate-fade-in", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-2", style: {
        color: "var(--text-primary)"
      }, children: "Percentage Calculator" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", style: {
        color: "var(--text-secondary)"
      }, children: "Quick tools for percentage of, change, and more." })
    ] }),
    /* @__PURE__ */ jsx(PercentageCalculator, {})
  ] });
}
export {
  PercentagePage as component
};
