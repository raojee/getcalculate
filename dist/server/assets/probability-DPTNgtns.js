import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { M as MathRenderer } from "./MathRenderer-D5wL1Wgn.js";
import { G as GlassCard } from "./GlassCard-BneF3lW9.js";
import { F as FAQSection } from "./FAQSection-C92ChFPE.js";
import "katex";
function ProbabilitySolver() {
  const [n, setN] = useState(10);
  const [r, setR] = useState(3);
  const factorial = (num) => {
    if (num < 0) return 0;
    if (num === 0) return 1;
    let res = 1;
    for (let i = 1; i <= num; i++) res *= i;
    return res;
  };
  const results = useMemo(() => {
    if (n < r) return null;
    const nFact = factorial(n);
    const rFact = factorial(r);
    const nrFact = factorial(n - r);
    return {
      combinations: nFact / (rFact * nrFact),
      permutations: nFact / nrFact,
      nFact,
      rFact,
      nrFact
    };
  }, [n, r]);
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-8", children: [
    /* @__PURE__ */ jsx(GlassCard, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold uppercase tracking-widest mb-2", style: { color: "var(--text-muted)" }, children: "Total Items (n)" }),
        /* @__PURE__ */ jsx("input", { type: "number", value: n, onChange: (e) => setN(Number(e.target.value)), className: "w-full px-5 py-4 rounded-2xl bg-display border-strong outline-none text-xl font-bold", style: { background: "var(--bg-display)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" } })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold uppercase tracking-widest mb-2", style: { color: "var(--text-muted)" }, children: "Chosen Items (r)" }),
        /* @__PURE__ */ jsx("input", { type: "number", value: r, onChange: (e) => setR(Number(e.target.value)), className: "w-full px-5 py-4 rounded-2xl bg-display border-strong outline-none text-xl font-bold", style: { background: "var(--bg-display)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" } })
      ] })
    ] }) }),
    results ? /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs(GlassCard, { className: "glass-amber", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold uppercase tracking-widest", style: { color: "var(--text-muted)" }, children: "Combinations" }),
          /* @__PURE__ */ jsx(MathRenderer, { math: "nCr = \\binom{n}{r} = \\frac{n!}{r!(n-r)!}", className: "text-[10px]" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-4xl font-extrabold mb-4", style: { color: "var(--amber)" }, children: results.combinations.toLocaleString() }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs", style: { color: "var(--text-secondary)" }, children: [
          "The number of ways to choose ",
          r,
          " items from ",
          n,
          " without regard to order."
        ] })
      ] }),
      /* @__PURE__ */ jsxs(GlassCard, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold uppercase tracking-widest", style: { color: "var(--text-muted)" }, children: "Permutations" }),
          /* @__PURE__ */ jsx(MathRenderer, { math: "nPr = P(n,r) = \\frac{n!}{(n-r)!}", className: "text-[10px]" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-4xl font-extrabold mb-4", style: { color: "var(--text-primary)" }, children: results.permutations.toLocaleString() }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs", style: { color: "var(--text-secondary)" }, children: [
          "The number of ways to arrange ",
          r,
          " items from ",
          n,
          " where order matters."
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsx("div", { className: "text-center py-12 glass rounded-3xl border-[#f87171] border-opacity-20", children: /* @__PURE__ */ jsx("p", { style: { color: "#f87171" }, children: 'Error: "n" must be greater than or equal to "r".' }) })
  ] });
}
const FAQS = [{
  q: "What is the difference between nCr and nPr?",
  a: "Combinations (nCr) are used when the order does not matter (e.g., picking a committee). Permutations (nPr) are used when the order does matter (e.g., a race or a password)."
}, {
  q: "Why is 0! equal to 1?",
  a: "In mathematics, the empty product is defined as 1. This convention makes many formulas (like nCr) work consistently for all cases."
}, {
  q: "What are the limits for n and r?",
  a: "The calculator works for any non-negative integers where n ≥ r. For very large numbers, results may be shown in scientific notation."
}];
function ProbabilityPage() {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 py-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-extrabold mb-2", style: {
        color: "var(--text-primary)"
      }, children: "Probability Solver" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", style: {
        color: "var(--text-secondary)"
      }, children: "Calculate combinations and permutations instantly with professional formatting." })
    ] }),
    /* @__PURE__ */ jsx(ProbabilitySolver, {}),
    /* @__PURE__ */ jsx("div", { className: "mt-16", children: /* @__PURE__ */ jsx(FAQSection, { items: FAQS, title: "Probability FAQ" }) })
  ] });
}
export {
  ProbabilityPage as component
};
