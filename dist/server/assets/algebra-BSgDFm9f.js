import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { S as StepByStep } from "./StepByStep-C7zkAiP9.js";
import { F as FAQSection } from "./FAQSection-C92ChFPE.js";
import "lucide-react";
import "./MathRenderer-D5wL1Wgn.js";
import "katex";
function solveEquation(input) {
  const eq = input.replace(/\s/g, "");
  const quadMatch = eq.match(/^(-?\d*\.?\d*)x[\^²]2([+\-]\d*\.?\d*x)?([+\-]\d*\.?\d*)=0$/);
  if (quadMatch || /x\^2|x²/.test(eq)) {
    let normalized = eq.replace("=0", "").replace("x²", "x^2");
    let a = 1, b = 0, c = 0;
    const aMatch = normalized.match(/^([+\-]?\d*\.?\d*)x\^2/);
    if (aMatch) {
      const av = aMatch[1];
      a = av === "" || av === "+" ? 1 : av === "-" ? -1 : parseFloat(av);
    }
    const bMatch = normalized.match(/x\^2([+\-]\d*\.?\d*)x/);
    if (bMatch) {
      const bv = bMatch[1];
      b = bv === "+" ? 1 : bv === "-" ? -1 : parseFloat(bv);
    }
    const cMatch = normalized.match(/x([+\-]\d*\.?\d*)$/);
    if (cMatch) c = parseFloat(cMatch[1]);
    else {
      const c2 = normalized.match(/([+\-]?\d+\.?\d*)$(?!.*x)/);
      if (c2) c = parseFloat(c2[1]);
    }
    const disc = b * b - 4 * a * c;
    const steps = [
      { label: "Standard Form", expression: `${a}x² + ${b}x + ${c} = 0`, explanation: "Identify a, b, c coefficients." },
      { label: "Discriminant", expression: `Δ = b² − 4ac = ${b}² − 4(${a})(${c}) = ${disc}`, explanation: disc > 0 ? "Δ > 0: two real roots" : disc === 0 ? "Δ = 0: one real root (repeated)" : "Δ < 0: no real roots" }
    ];
    if (disc < 0) {
      return { result: "No real roots (Δ < 0)", steps };
    }
    const x1 = (-b + Math.sqrt(disc)) / (2 * a);
    const x2 = (-b - Math.sqrt(disc)) / (2 * a);
    steps.push({ label: "Quadratic Formula", expression: `x = (−b ± √Δ) / 2a`, explanation: "Apply the quadratic formula." });
    if (disc === 0) {
      steps.push({ label: "Solution", expression: `x = ${parseFloat(x1.toPrecision(8))}`, explanation: "One repeated root." });
      return { result: `x = ${parseFloat(x1.toPrecision(8))}`, steps };
    }
    steps.push({ label: "Solutions", expression: `x₁ = ${parseFloat(x1.toPrecision(8))},  x₂ = ${parseFloat(x2.toPrecision(8))}`, explanation: "Two distinct real roots." });
    return { result: `x₁ = ${parseFloat(x1.toPrecision(8))},  x₂ = ${parseFloat(x2.toPrecision(8))}`, steps };
  }
  const linMatch = eq.match(/^([+\-]?\d*\.?\d*)x([+\-]\d*\.?\d*)=([+\-]?\d*\.?\d*)$/);
  if (linMatch || /x/.test(eq)) {
    const lhs = eq.split("=")[0];
    const rhs = parseFloat(eq.split("=")[1] || "0");
    const am = lhs.match(/^([+\-]?\d*\.?\d*)x/);
    const bm = lhs.match(/x([+\-]\d+\.?\d*)$/);
    const a = am ? am[1] === "" || am[1] === "+" ? 1 : am[1] === "-" ? -1 : parseFloat(am[1]) : 1;
    const b = bm ? parseFloat(bm[1]) : 0;
    const x = (rhs - b) / a;
    return {
      result: `x = ${parseFloat(x.toPrecision(10))}`,
      steps: [
        { label: "Original equation", expression: eq, explanation: "Start with the given equation." },
        { label: "Move constant", expression: `${a}x = ${rhs} − (${b}) = ${rhs - b}`, explanation: "Subtract b from both sides." },
        { label: "Divide by coefficient", expression: `x = ${rhs - b} ÷ ${a}`, explanation: "Divide both sides by a." },
        { label: "Solution", expression: `x = ${parseFloat(x.toPrecision(10))}`, explanation: "Final answer." }
      ]
    };
  }
  return { result: "Unsupported format", steps: [{ label: "Hint", expression: input, explanation: "Try formats like: 2x + 4 = 10 or x^2 - 5x + 6 = 0" }] };
}
function AlgebraSolver() {
  const [input, setInput] = useState("");
  const [solved, setSolved] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const examples = ["2x + 4 = 10", "x^2 - 5x + 6 = 0", "3x - 7 = 14", "x^2 + 4x + 4 = 0"];
  const handleSolve = () => {
    if (!input.trim()) {
      setError("Please enter an equation.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      const r = solveEquation(input);
      setSolved(r);
      setLoading(false);
    }, 300);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl p-5", style: { background: "var(--bg-surface)", border: "1px solid var(--border)" }, children: [
      /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold uppercase tracking-widest mb-2", style: { color: "var(--text-muted)" }, children: "Enter Equation" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "algebra-input",
          type: "text",
          value: input,
          onChange: (e) => {
            setInput(e.target.value);
            setError("");
          },
          onKeyDown: (e) => e.key === "Enter" && handleSolve(),
          placeholder: "e.g.  2x + 4 = 10  or  x^2 - 5x + 6 = 0",
          className: "w-full px-4 py-3 rounded-xl text-base font-mono outline-none transition-all duration-150",
          style: {
            background: "var(--bg-display)",
            border: `1px solid ${error ? "#f87171" : "var(--border-strong)"}`,
            color: "var(--text-primary)"
          }
        }
      ),
      error && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs", style: { color: "#f87171" }, children: error }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mt-3", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs", style: { color: "var(--text-muted)" }, children: "Examples:" }),
        examples.map((ex) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setInput(ex);
              setSolved(null);
            },
            className: "text-xs px-2.5 py-1 rounded-lg font-mono transition-all",
            style: { background: "var(--bg-surface-3)", color: "var(--text-secondary)" },
            children: ex
          },
          ex
        ))
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          id: "algebra-solve-btn",
          onClick: handleSolve,
          className: "amber-btn mt-4 w-full flex items-center justify-center gap-2",
          disabled: loading,
          children: loading ? /* @__PURE__ */ jsx("span", { className: "w-4 h-4 border-2 border-[#1a0f00] border-t-transparent rounded-full animate-spin-slow" }) : "Solve →"
        }
      )
    ] }),
    solved && /* @__PURE__ */ jsx(StepByStep, { result: solved.result, steps: solved.steps }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl p-5", style: { background: "var(--bg-surface)", border: "1px solid var(--border)" }, children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-3 text-sm", style: { color: "var(--text-primary)" }, children: "Formula Reference" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
        { name: "Linear Equation", formula: "ax + b = c  →  x = (c−b)/a" },
        { name: "Quadratic Formula", formula: "x = (−b ± √(b²−4ac)) / 2a" },
        { name: "Discriminant", formula: "Δ = b² − 4ac" },
        { name: "Vertex Form", formula: "y = a(x−h)² + k" }
      ].map(({ name, formula }) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl p-3", style: { background: "var(--bg-surface-3)" }, children: [
        /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-widest mb-1", style: { color: "var(--text-muted)" }, children: name }),
        /* @__PURE__ */ jsx("div", { className: "font-mono text-xs", style: { color: "var(--amber)" }, children: formula })
      ] }, name)) })
    ] })
  ] });
}
const FAQS = [{
  q: "What types of equations can I solve?",
  a: "CalcPro solves linear equations (ax + b = c) and quadratic equations (ax² + bx + c = 0)."
}, {
  q: "How do I enter an exponent?",
  a: "Use the ^ symbol for powers, e.g., x^2."
}];
function AlgebraPage() {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 py-10 animate-fade-in", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-2", style: {
        color: "var(--text-primary)"
      }, children: "Algebra Solver" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", style: {
        color: "var(--text-secondary)"
      }, children: "Enter a linear or quadratic equation and get instant step-by-step solutions." })
    ] }),
    /* @__PURE__ */ jsx(AlgebraSolver, {}),
    /* @__PURE__ */ jsx("div", { className: "mt-12", children: /* @__PURE__ */ jsx(FAQSection, { items: FAQS, title: "Algebra Solver FAQ" }) })
  ] });
}
export {
  AlgebraPage as component
};
