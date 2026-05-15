import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { S as StepByStep } from "./StepByStep-C7zkAiP9.js";
import "lucide-react";
import "./MathRenderer-D5wL1Wgn.js";
import "katex";
const TRIG_FUNCTIONS = ["sin", "cos", "tan", "asin", "acos", "atan"];
function compute(fn, value, isDeg) {
  const toRad = isDeg ? value * Math.PI / 180 : value;
  const fromRad = (r) => isDeg ? r * 180 / Math.PI : r;
  let result;
  const steps = [
    { label: "Input", expression: `${fn}(${value}${isDeg ? "°" : " rad"})`, explanation: `Computing ${fn} of ${value}${isDeg ? " degrees" : " radians"}.` }
  ];
  if (isDeg && !["asin", "acos", "atan"].includes(fn)) {
    steps.push({ label: "Convert", expression: `${value}° = ${parseFloat(toRad.toPrecision(8))} rad`, explanation: "Convert degrees to radians: multiply by π/180." });
  }
  switch (fn) {
    case "sin":
      result = Math.sin(toRad);
      break;
    case "cos":
      result = Math.cos(toRad);
      break;
    case "tan":
      if (Math.abs(Math.cos(toRad)) < 1e-10) {
        return { result: NaN, steps: [...steps, { label: "Undefined", expression: "tan is undefined at 90°, 270°…", explanation: "Tangent is undefined where cosine equals zero." }] };
      }
      result = Math.tan(toRad);
      break;
    case "asin":
      result = fromRad(Math.asin(value));
      break;
    case "acos":
      result = fromRad(Math.acos(value));
      break;
    case "atan":
      result = fromRad(Math.atan(value));
      break;
    default:
      result = NaN;
  }
  steps.push({ label: "Result", expression: `${fn}(${value}${isDeg && !fn.startsWith("a") ? "°" : ""}) = ${parseFloat(result.toPrecision(10))}`, explanation: "Final computed value." });
  return { result, steps };
}
const UNIT_CIRCLE = [
  { deg: 0, rad: "0", sin: "0", cos: "1", tan: "0" },
  { deg: 30, rad: "π/6", sin: "1/2", cos: "√3/2", tan: "1/√3" },
  { deg: 45, rad: "π/4", sin: "√2/2", cos: "√2/2", tan: "1" },
  { deg: 60, rad: "π/3", sin: "√3/2", cos: "1/2", tan: "√3" },
  { deg: 90, rad: "π/2", sin: "1", cos: "0", tan: "∞" },
  { deg: 180, rad: "π", sin: "0", cos: "−1", tan: "0" },
  { deg: 270, rad: "3π/2", sin: "−1", cos: "0", tan: "∞" },
  { deg: 360, rad: "2π", sin: "0", cos: "1", tan: "0" }
];
function TrigSolver() {
  const [fn, setFn] = useState("sin");
  const [value, setValue] = useState("");
  const [isDeg, setIsDeg] = useState(true);
  const [solved, setSolved] = useState(null);
  const [error, setError] = useState("");
  const handleSolve = () => {
    const v = parseFloat(value);
    if (isNaN(v)) {
      setError("Please enter a valid number.");
      return;
    }
    if ((fn === "asin" || fn === "acos") && (v < -1 || v > 1)) {
      setError("Input for asin/acos must be between −1 and 1.");
      return;
    }
    setError("");
    setSolved(compute(fn, v, isDeg));
  };
  const result = solved ? parseFloat(solved.result.toPrecision(10)) : null;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl p-5", style: { background: "var(--bg-surface)", border: "1px solid var(--border)" }, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex gap-1.5 flex-wrap", children: TRIG_FUNCTIONS.map((f) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setFn(f),
            className: "px-3 py-1.5 rounded-xl text-sm font-mono font-medium transition-all",
            style: { background: fn === f ? "var(--amber)" : "var(--bg-surface-3)", color: fn === f ? "#1a0f00" : "var(--text-secondary)" },
            children: f
          },
          f
        )) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsDeg((d) => !d),
            className: "px-3 py-1.5 rounded-xl text-sm font-bold transition-all ml-auto",
            style: { background: "var(--bg-surface-2)", color: "var(--amber)", border: "1px solid var(--border-strong)" },
            children: isDeg ? "DEG" : "RAD"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs uppercase tracking-widest mb-1.5", style: { color: "var(--text-muted)" }, children: "Value" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "trig-input",
            type: "number",
            value,
            onChange: (e) => {
              setValue(e.target.value);
              setError("");
            },
            onKeyDown: (e) => e.key === "Enter" && handleSolve(),
            placeholder: fn.startsWith("a") ? "−1 to 1" : isDeg ? "0 – 360" : "0 – 2π",
            className: "w-full px-4 py-3 rounded-xl text-base font-mono outline-none",
            style: { background: "var(--bg-display)", border: `1px solid ${error ? "#f87171" : "var(--border-strong)"}`, color: "var(--text-primary)" }
          }
        )
      ] }) }),
      error && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs", style: { color: "#f87171" }, children: error }),
      /* @__PURE__ */ jsx("button", { id: "trig-solve-btn", onClick: handleSolve, className: "amber-btn mt-4 w-full", children: "Compute →" })
    ] }),
    solved && result !== null && !isNaN(result) && /* @__PURE__ */ jsx(StepByStep, { result: String(result), steps: solved.steps, unit: fn.startsWith("a") ? isDeg ? "°" : " rad" : "" }),
    solved && isNaN(solved.result) && /* @__PURE__ */ jsx("div", { className: "rounded-2xl p-5 text-center", style: { background: "var(--bg-surface)", border: "1px solid #f87171" }, children: /* @__PURE__ */ jsx("p", { className: "font-mono text-sm", style: { color: "#f87171" }, children: "Undefined at this value" }) }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl overflow-hidden", style: { background: "var(--bg-surface)", border: "1px solid var(--border)" }, children: [
      /* @__PURE__ */ jsx("div", { className: "px-5 py-3", style: { borderBottom: "1px solid var(--border)" }, children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", style: { color: "var(--text-primary)" }, children: "Common Angle Reference" }) }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-xs font-mono", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { style: { background: "var(--bg-surface-2)" }, children: ["Degrees", "Radians", "sin", "cos", "tan"].map((h) => /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left font-semibold", style: { color: "var(--text-muted)" }, children: h }, h)) }) }),
        /* @__PURE__ */ jsx("tbody", { children: UNIT_CIRCLE.map((row, i) => /* @__PURE__ */ jsxs("tr", { style: { borderTop: "1px solid var(--border)" }, children: [
          /* @__PURE__ */ jsxs("td", { className: "px-4 py-2", style: { color: "var(--amber)" }, children: [
            row.deg,
            "°"
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-2", style: { color: "var(--text-secondary)" }, children: row.rad }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-2", style: { color: "var(--text-primary)" }, children: row.sin }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-2", style: { color: "var(--text-primary)" }, children: row.cos }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-2", style: { color: "var(--text-primary)" }, children: row.tan })
        ] }, i)) })
      ] }) })
    ] })
  ] });
}
function TrigPage() {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 py-10 animate-fade-in", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-2", style: {
        color: "var(--text-primary)"
      }, children: "Trigonometry Solver" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", style: {
        color: "var(--text-secondary)"
      }, children: "Compute sine, cosine, tangent and their inverses with degrees or radians." })
    ] }),
    /* @__PURE__ */ jsx(TrigSolver, {})
  ] });
}
export {
  TrigPage as component
};
