import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { derivative } from "mathjs";
import { S as StepByStep } from "./StepByStep-C7zkAiP9.js";
import { Sparkles, X, Lightbulb } from "lucide-react";
import "./MathRenderer-D5wL1Wgn.js";
import "katex";
function AIHint({ strategy, tips }) {
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setIsOpen(true),
        className: "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all glass-amber hover:shadow-[0_0_15px_var(--amber-glow)]",
        style: { color: "var(--amber)" },
        children: [
          /* @__PURE__ */ jsx(Sparkles, { size: 14, className: "animate-pulse" }),
          "AI Hint"
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          onClick: () => setIsOpen(false),
          className: "fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "fixed right-0 top-0 h-full w-[320px] z-[70] p-6 glass flex flex-col shadow-2xl animate-slide-in",
          style: { background: "var(--bg-surface)" },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-amber", children: [
                /* @__PURE__ */ jsx(Sparkles, { size: 18 }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-bold uppercase tracking-widest", children: "AI Strategy" })
              ] }),
              /* @__PURE__ */ jsx("button", { onClick: () => setIsOpen(false), className: "text-muted hover:text-primary transition-colors", children: /* @__PURE__ */ jsx(X, { size: 20 }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto space-y-8 custom-scrollbar pr-2", children: [
              /* @__PURE__ */ jsxs("section", { children: [
                /* @__PURE__ */ jsxs("h4", { className: "text-[10px] font-bold uppercase tracking-widest text-muted mb-3 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Lightbulb, { size: 12 }),
                  " The Approach"
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed", style: { color: "var(--text-secondary)" }, children: strategy })
              ] }),
              /* @__PURE__ */ jsxs("section", { children: [
                /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-bold uppercase tracking-widest text-muted mb-3", children: "Key Tips" }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: tips.map((tip, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-xs leading-relaxed", style: { color: "var(--text-secondary)" }, children: [
                  /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-amber shrink-0 mt-1.5" }),
                  tip
                ] }, i)) })
              ] })
            ] })
          ]
        }
      )
    ] })
  ] });
}
function CalculusSolver() {
  const [input, setInput] = useState("");
  const [solved, setSolved] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const strategy = "To differentiate this function, we identify its core structure (polynomial, trigonometric, or exponential) and apply the corresponding rules. If it's a composite function, the Chain Rule is essential.";
  const tips = [
    "Always simplify the expression before differentiating.",
    "For products of functions, remember the Product Rule: (fg)' = f'g + fg'.",
    "Trig functions like sin(x) and cos(x) follow cyclic derivative patterns."
  ];
  const handleSolve = () => {
    if (!input.trim()) {
      setError("Please enter a function.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const d = derivative(input, "x");
      const result = d.toString();
      const steps = [
        { label: "Function Identification", expression: `f(x) = ${input}`, explanation: "Analyzing the given expression to select the appropriate differentiation rules." },
        { label: "Applying Rules", expression: `\\frac{d}{dx}[${input}]`, explanation: "Applying the power rule, chain rule, or other derivatives." },
        { label: "Final Result", expression: `f'(x) = ${result}`, explanation: "The final symbolic derivative." }
      ];
      setSolved({ result: `f'(x) = ${result}`, steps });
    } catch (err) {
      setError("Could not compute derivative.");
    } finally {
      setLoading(false);
    }
  };
  const examples = ["x^2 + 3x + 2", "sin(x) * x", "e^x + log(x)", "x^3 - 4x^2 + 5"];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl p-5", style: { background: "var(--bg-surface)", border: "1px solid var(--border)" }, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold uppercase tracking-widest", style: { color: "var(--text-muted)" }, children: "Enter Function f(x)" }),
        /* @__PURE__ */ jsx(AIHint, { strategy, tips })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "flex items-center px-3 rounded-xl bg-opacity-10 bg-white font-mono text-lg", style: { background: "var(--bg-display)", border: "1px solid var(--border-strong)", color: "var(--text-secondary)" }, children: "d/dx" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "calculus-input",
            type: "text",
            value: input,
            onChange: (e) => {
              setInput(e.target.value);
              setError("");
            },
            onKeyDown: (e) => e.key === "Enter" && handleSolve(),
            placeholder: "e.g. x^2 + 3x",
            className: "flex-1 px-4 py-3 rounded-xl text-base font-mono outline-none transition-all duration-150",
            style: {
              background: "var(--bg-display)",
              border: `1px solid ${error ? "#f87171" : "var(--border-strong)"}`,
              color: "var(--text-primary)"
            }
          }
        )
      ] }),
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
          onClick: handleSolve,
          className: "amber-btn mt-4 w-full flex items-center justify-center gap-2",
          disabled: loading,
          children: loading ? /* @__PURE__ */ jsx("span", { className: "w-4 h-4 border-2 border-[#1a0f00] border-t-transparent rounded-full animate-spin-slow" }) : "Differentiate →"
        }
      )
    ] }),
    solved && /* @__PURE__ */ jsx(StepByStep, { result: solved.result, steps: solved.steps }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl p-5", style: { background: "var(--bg-surface)", border: "1px solid var(--border)" }, children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-3 text-sm", style: { color: "var(--text-primary)" }, children: "Differentiation Rules" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
        { name: "Power Rule", formula: "d/dx [x^n] = nx^(n-1)" },
        { name: "Product Rule", formula: "[fg]' = f'g + fg'" },
        { name: "Chain Rule", formula: "d/dx [f(g(x))] = f'(g(x))g'(x)" },
        { name: "Constant Rule", formula: "d/dx [c] = 0" }
      ].map(({ name, formula }) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl p-3", style: { background: "var(--bg-surface-3)" }, children: [
        /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-widest mb-1", style: { color: "var(--text-muted)" }, children: name }),
        /* @__PURE__ */ jsx("div", { className: "font-mono text-xs", style: { color: "var(--amber)" }, children: formula })
      ] }, name)) })
    ] })
  ] });
}
function CalculusPage() {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 py-10 animate-fade-in", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-2", style: {
        color: "var(--text-primary)"
      }, children: "Calculus Solver" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", style: {
        color: "var(--text-secondary)"
      }, children: "Enter a function f(x) to find its derivative with respect to x." })
    ] }),
    /* @__PURE__ */ jsx(CalculusSolver, {})
  ] });
}
export {
  CalculusPage as component
};
