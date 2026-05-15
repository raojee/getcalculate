import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useCallback } from "react";
import { evaluate } from "mathjs";
import { S as StepByStep } from "./StepByStep-C7zkAiP9.js";
import "lucide-react";
import "./MathRenderer-D5wL1Wgn.js";
import "katex";
const BUTTONS = [
  ["MC", "MR", "M+", "M-"],
  ["2nd", "π", "e", "C", "⌫"],
  ["x²", "√", "(", ")", "÷"],
  ["sin", "cos", "tan", "log", "ln"],
  ["7", "8", "9", "×", "xⁿ"],
  ["4", "5", "6", "−", "1/x"],
  ["1", "2", "3", "+", "n!"],
  ["±", "0", ".", "%", "="]
];
const BackspaceIcon = () => /* @__PURE__ */ jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("path", { d: "M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" }),
  /* @__PURE__ */ jsx("line", { x1: "18", y1: "9", x2: "12", y2: "15" }),
  /* @__PURE__ */ jsx("line", { x1: "12", y1: "9", x2: "18", y2: "15" })
] });
const ClearIcon = () => /* @__PURE__ */ jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }),
  /* @__PURE__ */ jsx("path", { d: "M3 3v5h5" })
] });
function factorial(n) {
  if (n < 0) throw new Error("Negative factorial");
  if (n === 0 || n === 1) return 1;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}
function computeExpr(expr, isDeg) {
  try {
    let e = expr.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-").replace(/π/g, "pi").replace(/n!/g, "");
    if (isDeg) {
      e = e.replace(/sin\(/g, "sin(pi/180*").replace(/cos\(/g, "cos(pi/180*").replace(/tan\(/g, "tan(pi/180*");
    }
    const r = evaluate(e);
    if (typeof r === "number") {
      if (!isFinite(r)) return "Error";
      return parseFloat(r.toPrecision(12)).toString();
    }
    return String(r);
  } catch {
    return "Error";
  }
}
function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [expr, setExpr] = useState("");
  const [memory, setMemory] = useState(0);
  const [isDeg, setIsDeg] = useState(true);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const append = (val) => {
    setResult(null);
    if (display === "0" && !["(", "sin", "cos", "tan", "log", "ln", "√", "π", "e"].includes(val)) {
      setDisplay(val);
      setExpr(val);
    } else {
      setDisplay((d) => d + val);
      setExpr((e) => e + val);
    }
  };
  const handleBtn = useCallback((btn) => {
    switch (btn) {
      case "C":
        setDisplay("0");
        setExpr("");
        setResult(null);
        break;
      case "⌫": {
        const nd = display.length > 1 ? display.slice(0, -1) : "0";
        setDisplay(nd);
        setExpr(nd);
        break;
      }
      case "=": {
        const trimmed = expr.replace(/[+\-×÷*\/]$/, "");
        const res = computeExpr(trimmed, isDeg);
        setHistory((h) => [{ expr: trimmed, result: res }, ...h].slice(0, 30));
        setResult(res);
        setDisplay(res);
        setExpr(res);
        break;
      }
      case "π":
        append("π");
        break;
      case "e":
        append("e");
        break;
      case "x²":
        append("²");
        setExpr((e) => `(${e})^2`);
        break;
      case "xⁿ":
        append("^");
        break;
      case "√":
        append("sqrt(");
        break;
      case "1/x":
        setDisplay((d) => {
          const v = parseFloat(d);
          return isNaN(v) ? "Error" : String(1 / v);
        });
        break;
      case "n!": {
        const n = parseInt(display);
        try {
          setDisplay(String(factorial(n)));
          setExpr(String(factorial(n)));
        } catch {
          setDisplay("Error");
        }
        break;
      }
      case "sin":
        append("sin(");
        break;
      case "cos":
        append("cos(");
        break;
      case "tan":
        append("tan(");
        break;
      case "log":
        append("log10(");
        break;
      case "ln":
        append("log(");
        break;
      case "2nd":
        setIsDeg((d) => !d);
        break;
      case "±": {
        const nd = display.startsWith("-") ? display.slice(1) : "-" + display;
        setDisplay(nd);
        setExpr(nd);
        break;
      }
      case "MC":
        setMemory(0);
        break;
      case "MR": {
        const s = String(memory);
        setDisplay(s);
        setExpr(s);
        break;
      }
      case "M+":
        setMemory((m) => m + parseFloat(display || "0"));
        break;
      case "M-":
        setMemory((m) => m - parseFloat(display || "0"));
        break;
      default:
        append(btn);
        break;
    }
  }, [display, expr, isDeg, memory]);
  const VARIANT = {
    "=": "var(--amber)",
    "C": "#ef4444",
    "⌫": "var(--amber)",
    "+": "var(--bg-surface-3)",
    "−": "var(--bg-surface-3)",
    "×": "var(--bg-surface-3)",
    "÷": "var(--bg-surface-3)"
  };
  const fnKeys = /* @__PURE__ */ new Set(["sin", "cos", "tan", "log", "ln", "√", "x²", "xⁿ", "1/x", "n!", "π", "e", "2nd", "(", ")"]);
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-6 flex-col lg:flex-row", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm mx-auto lg:mx-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs font-mono", style: { color: "var(--text-muted)" }, children: "Mode:" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsDeg((d) => !d),
            className: "px-3 py-1 rounded-lg text-xs font-bold transition-all",
            style: { background: "var(--amber)", color: "#1a0f00" },
            children: isDeg ? "DEG" : "RAD"
          }
        ),
        memory !== 0 && /* @__PURE__ */ jsxs("span", { className: "px-2 py-1 rounded-lg text-xs font-mono", style: { background: "var(--bg-surface-3)", color: "var(--amber)" }, children: [
          "M=",
          memory
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-3xl overflow-hidden", style: { background: "var(--bg-surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-elevated)" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "px-5 pt-6 pb-4", style: { background: "var(--bg-display)" }, children: [
          /* @__PURE__ */ jsx("div", { className: "text-right text-xs font-mono mb-1 truncate", style: { color: "var(--text-muted)" }, children: expr || "0" }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `text-right font-mono font-light leading-none transition-all ${display.length > 12 ? "text-2xl" : display.length > 8 ? "text-4xl" : "text-5xl"}`,
              style: { color: display === "Error" ? "#f87171" : "var(--text-primary)" },
              children: display
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-5 gap-1.5 p-3", children: BUTTONS.flat().map((btn, i) => {
          const bg = VARIANT[btn] || (fnKeys.has(btn) ? "var(--bg-surface-2)" : "var(--bg-surface-3)");
          const isEq = btn === "=";
          return /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleBtn(btn),
              className: "h-12 rounded-xl text-sm font-medium transition-all duration-75 active:scale-95 flex items-center justify-center",
              style: {
                background: bg,
                color: isEq ? "#1a0f00" : fnKeys.has(btn) ? "var(--text-secondary)" : "var(--text-primary)",
                fontSize: btn.length > 3 ? "10px" : void 0
              },
              children: btn === "⌫" ? /* @__PURE__ */ jsx(BackspaceIcon, {}) : btn
            },
            `${btn}-${i}`
          );
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-4", children: [
      result && result !== "Error" && /* @__PURE__ */ jsx(
        StepByStep,
        {
          result,
          steps: [
            { label: "Expression", expression: expr, explanation: "Your input expression." },
            { label: "Evaluated", expression: `= ${result}`, explanation: `Result computed${isDeg ? " in degree mode" : " in radian mode"}.` }
          ]
        }
      ),
      history.length > 0 && /* @__PURE__ */ jsxs("div", { className: "rounded-2xl overflow-hidden", style: { background: "var(--bg-surface)", border: "1px solid var(--border)" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 py-3", style: { borderBottom: "1px solid var(--border)" }, children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", style: { color: "var(--text-primary)" }, children: "History" }),
          /* @__PURE__ */ jsxs("button", { onClick: () => setHistory([]), className: "flex items-center gap-1 text-xs", style: { color: "var(--text-muted)" }, children: [
            /* @__PURE__ */ jsx(ClearIcon, {}),
            "Clear"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "max-h-64 overflow-y-auto divide-y", style: { borderColor: "var(--border)" }, children: history.map((h, i) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex justify-between items-center px-4 py-2.5 cursor-pointer hover:bg-[var(--bg-surface-2)]",
            onClick: () => {
              setDisplay(h.result);
              setExpr(h.result);
              setResult(null);
            },
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-mono truncate", style: { color: "var(--text-muted)" }, children: h.expr }),
              /* @__PURE__ */ jsxs("span", { className: "text-sm font-mono font-semibold ml-3 shrink-0", style: { color: "var(--amber)" }, children: [
                "= ",
                h.result
              ] })
            ]
          },
          i
        )) })
      ] })
    ] })
  ] });
}
function ScientificPage() {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 py-10 animate-fade-in", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-2", style: {
        color: "var(--text-primary)"
      }, children: "Scientific Calculator" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", style: {
        color: "var(--text-secondary)"
      }, children: "Advanced functions for engineering and physics." })
    ] }),
    /* @__PURE__ */ jsx(ScientificCalculator, {})
  ] });
}
export {
  ScientificPage as component
};
