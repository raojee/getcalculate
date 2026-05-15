import { jsxs, jsx } from "react/jsx-runtime";
import { useReducer, useState, useRef, useEffect, useCallback } from "react";
function evaluate(previousValue, currentValue, operation) {
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  if (isNaN(prev) || isNaN(current)) return "Error";
  let result;
  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      if (current === 0) return "Error";
      result = prev / current;
      break;
    default:
      return currentValue;
  }
  const str = String(result);
  if (str.includes(".") && str.split(".")[1].length > 10) {
    return parseFloat(result.toPrecision(12)).toString();
  }
  return str;
}
function reducer(state, action) {
  switch (action.type) {
    case "ADD_DIGIT": {
      if (state.display === "Error") {
        return { ...state, display: action.digit, overwrite: false };
      }
      if (state.overwrite) {
        return { ...state, display: action.digit === "." ? "0." : action.digit, overwrite: false };
      }
      if (action.digit === "." && state.display.includes(".")) return state;
      if (state.display === "0" && action.digit !== ".") {
        return { ...state, display: action.digit };
      }
      if (state.display.replace("-", "").replace(".", "").length >= 12) return state;
      return { ...state, display: state.display + action.digit };
    }
    case "CHOOSE_OPERATION": {
      if (state.display === "Error") return state;
      if (state.previousValue != null && !state.overwrite) {
        const result = evaluate(state.previousValue, state.display, state.operation);
        return {
          display: result,
          previousValue: result,
          operation: action.operation,
          overwrite: true
        };
      }
      return {
        ...state,
        previousValue: state.display,
        operation: action.operation,
        overwrite: true
      };
    }
    case "EVALUATE": {
      if (state.previousValue == null || state.operation == null || state.overwrite)
        return state;
      const result = evaluate(state.previousValue, state.display, state.operation);
      return {
        display: result,
        previousValue: null,
        operation: null,
        overwrite: true
      };
    }
    case "CLEAR":
      return { display: "0", previousValue: null, operation: null, overwrite: false };
    case "DELETE_DIGIT": {
      if (state.display === "Error") {
        return { display: "0", previousValue: null, operation: null, overwrite: false };
      }
      if (state.overwrite) return { ...state, display: "0", overwrite: false };
      if (state.display.length === 1 || state.display.length === 2 && state.display.startsWith("-")) {
        return { ...state, display: "0" };
      }
      return { ...state, display: state.display.slice(0, -1) };
    }
    case "PERCENT": {
      if (state.display === "Error") return state;
      const val = parseFloat(state.display);
      if (isNaN(val)) return state;
      const result = String(val / 100);
      return { ...state, display: result, overwrite: false };
    }
    case "TOGGLE_SIGN": {
      if (state.display === "Error" || state.display === "0") return state;
      return {
        ...state,
        display: state.display.startsWith("-") ? state.display.slice(1) : "-" + state.display
      };
    }
    default:
      return state;
  }
}
const initialState = {
  display: "0",
  previousValue: null,
  operation: null,
  overwrite: false
};
function formatDisplay(value) {
  if (value === "Error") return value;
  if (value.includes(".") && value.endsWith(".")) return value;
  const negative = value.startsWith("-");
  const abs = negative ? value.slice(1) : value;
  const num = parseFloat(abs);
  if (isNaN(num)) return value;
  if (value.includes(".")) {
    const [int, dec] = abs.split(".");
    const formattedInt = parseInt(int || "0", 10).toLocaleString("en-US");
    return (negative ? "-" : "") + formattedInt + "." + dec;
  }
  return num.toLocaleString("en-US", { maximumFractionDigits: 10 });
}
function getDisplaySize(value) {
  const len = formatDisplay(value).replace(/,/g, "").length;
  if (len <= 6) return "text-6xl";
  if (len <= 9) return "text-5xl";
  if (len <= 12) return "text-4xl";
  return "text-3xl";
}
function formatTime(date) {
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}
const OP_SYMBOLS = { "+": "+", "-": "−", "*": "×", "/": "÷" };
function Calculator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [pressedKey, setPressedKey] = useState(null);
  const historyRef = useRef(null);
  const prevStateRef = useRef(state);
  useEffect(() => {
    const prev = prevStateRef.current;
    if (prev.previousValue != null && prev.operation != null && !prev.overwrite && state.overwrite && state.previousValue == null) {
      const expr = `${formatDisplay(prev.previousValue)} ${OP_SYMBOLS[prev.operation] ?? prev.operation} ${formatDisplay(prev.display)}`;
      setHistory((h) => [{ expression: expr, result: formatDisplay(state.display), timestamp: /* @__PURE__ */ new Date() }, ...h].slice(0, 50));
    }
    prevStateRef.current = state;
  }, [state]);
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = 0;
    }
  }, [history]);
  const flash = useCallback((key) => {
    setPressedKey(key);
    setTimeout(() => setPressedKey(null), 120);
  }, []);
  useEffect(() => {
    const handler = (e) => {
      if (e.key >= "0" && e.key <= "9") {
        flash(e.key);
        dispatch({ type: "ADD_DIGIT", digit: e.key });
      } else if (e.key === ".") {
        flash(".");
        dispatch({ type: "ADD_DIGIT", digit: "." });
      } else if (e.key === "+") {
        flash("+");
        dispatch({ type: "CHOOSE_OPERATION", operation: "+" });
      } else if (e.key === "-") {
        flash("-");
        dispatch({ type: "CHOOSE_OPERATION", operation: "-" });
      } else if (e.key === "*") {
        flash("*");
        dispatch({ type: "CHOOSE_OPERATION", operation: "*" });
      } else if (e.key === "/") {
        e.preventDefault();
        flash("/");
        dispatch({ type: "CHOOSE_OPERATION", operation: "/" });
      } else if (e.key === "Enter" || e.key === "=") {
        flash("=");
        dispatch({ type: "EVALUATE" });
      } else if (e.key === "Escape") {
        flash("C");
        dispatch({ type: "CLEAR" });
      } else if (e.key === "Backspace") {
        flash("⌫");
        dispatch({ type: "DELETE_DIGIT" });
      } else if (e.key === "%") {
        flash("%");
        dispatch({ type: "PERCENT" });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [flash]);
  const isActive = (op) => state.operation === op && state.overwrite;
  const btn = (label, onClick, variant = "number", extraClass = "") => {
    const isPressed = pressedKey === label || label === "÷" && pressedKey === "/" || label === "×" && pressedKey === "*" || label === "−" && pressedKey === "-";
    const base = "relative h-[72px] rounded-2xl text-xl font-medium select-none cursor-pointer transition-all duration-75 flex items-center justify-center overflow-hidden group";
    const variants = {
      number: "bg-[#2a2a2a] text-[#f0ede8] hover:bg-[#333] active:scale-95 active:bg-[#222]",
      op: "bg-[#ff9d2e] text-[#1a0f00] hover:bg-[#ffb055] active:scale-95 active:bg-[#e8891a]",
      fn: "bg-[#3d3d3d] text-[#c8c0b4] hover:bg-[#474747] active:scale-95 active:bg-[#303030]",
      equals: "bg-[#ff9d2e] text-[#1a0f00] hover:bg-[#ffb055] active:scale-95 active:bg-[#e8891a]",
      wide: "bg-[#2a2a2a] text-[#f0ede8] hover:bg-[#333] active:scale-95 active:bg-[#222] col-span-2"
    };
    const activeOp = isActive(label === "÷" ? "/" : label === "×" ? "*" : label === "−" ? "-" : label) ? "ring-2 ring-[#ff9d2e] ring-offset-1 ring-offset-[#1a1a1a]" : "";
    const pressed = isPressed ? "scale-95 brightness-75" : "";
    return /* @__PURE__ */ jsxs(
      "button",
      {
        onClick,
        className: `${base} ${variants[variant]} ${activeOp} ${pressed} ${extraClass}`,
        "aria-label": label,
        children: [
          /* @__PURE__ */ jsx("span", { className: "relative z-10", children: label }),
          /* @__PURE__ */ jsx("span", { className: "absolute inset-0 bg-white opacity-0 group-active:opacity-10 transition-opacity duration-75 rounded-2xl" })
        ]
      },
      label
    );
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center w-full max-w-sm mx-auto gap-4", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setShowHistory((v) => !v),
        className: "self-end flex items-center gap-2 text-xs text-[#7a7060] hover:text-[#c8c0b4] transition-colors duration-150 font-mono tracking-wider uppercase",
        children: [
          /* @__PURE__ */ jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }),
            /* @__PURE__ */ jsx("path", { d: "M3 3v5h5" }),
            /* @__PURE__ */ jsx("path", { d: "M12 7v5l4 2" })
          ] }),
          "History ",
          history.length > 0 && /* @__PURE__ */ jsx("span", { className: "bg-[#ff9d2e] text-[#1a0f00] rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold", children: history.length > 9 ? "9+" : history.length })
        ]
      }
    ),
    showHistory && /* @__PURE__ */ jsx(
      "div",
      {
        ref: historyRef,
        className: "w-full max-h-48 overflow-y-auto rounded-2xl bg-[#141414] border border-[#2a2a2a] p-3 space-y-2",
        style: { scrollbarWidth: "thin", scrollbarColor: "#2a2a2a transparent" },
        children: history.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-center text-[#4a4540] text-sm font-mono py-4", children: "No calculations yet" }) : history.map((entry, i) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex justify-between items-end gap-3 py-1.5 border-b border-[#1f1f1f] last:border-0 cursor-pointer group",
            onClick: () => {
              dispatch({ type: "ADD_DIGIT", digit: "" });
              setShowHistory(false);
            },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[#4a4540] text-xs font-mono", children: entry.expression }),
                /* @__PURE__ */ jsxs("span", { className: "text-[#c8c0b4] text-base font-mono", children: [
                  "= ",
                  entry.result
                ] })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[#3a3530] text-[10px] font-mono shrink-0", children: formatTime(entry.timestamp) })
            ]
          },
          i
        ))
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "w-full rounded-3xl overflow-hidden shadow-2xl bg-[#1a1a1a] border border-[#2a2a2a]",
        style: { boxShadow: "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04) inset" },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "px-6 pt-8 pb-5 bg-[#141414] relative overflow-hidden", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute inset-0 opacity-30 pointer-events-none",
                style: { background: "radial-gradient(ellipse at 80% 20%, rgba(255,157,46,0.12) 0%, transparent 60%)" }
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "text-right min-h-[20px] text-sm font-mono tracking-wide text-[#5a5248] mb-2 truncate", children: state.previousValue != null && state.operation ? `${formatDisplay(state.previousValue)} ${OP_SYMBOLS[state.operation] ?? state.operation}` : " " }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `text-right font-mono font-light tracking-tight text-[#f0ede8] transition-all duration-100 leading-none ${getDisplaySize(state.display)} ${state.display === "Error" ? "text-red-400" : ""}`,
                style: { fontVariantNumeric: "tabular-nums" },
                children: formatDisplay(state.display)
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "mt-3 text-right text-[10px] text-[#2e2b28] font-mono tracking-wider", children: "KEYBOARD READY" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 gap-2 p-4", children: [
            btn("C", () => dispatch({ type: "CLEAR" }), "fn"),
            btn("+/-", () => dispatch({ type: "TOGGLE_SIGN" }), "fn"),
            btn("%", () => dispatch({ type: "PERCENT" }), "fn"),
            btn("÷", () => dispatch({ type: "CHOOSE_OPERATION", operation: "/" }), "op"),
            btn("7", () => dispatch({ type: "ADD_DIGIT", digit: "7" })),
            btn("8", () => dispatch({ type: "ADD_DIGIT", digit: "8" })),
            btn("9", () => dispatch({ type: "ADD_DIGIT", digit: "9" })),
            btn("×", () => dispatch({ type: "CHOOSE_OPERATION", operation: "*" }), "op"),
            btn("4", () => dispatch({ type: "ADD_DIGIT", digit: "4" })),
            btn("5", () => dispatch({ type: "ADD_DIGIT", digit: "5" })),
            btn("6", () => dispatch({ type: "ADD_DIGIT", digit: "6" })),
            btn("−", () => dispatch({ type: "CHOOSE_OPERATION", operation: "-" }), "op"),
            btn("1", () => dispatch({ type: "ADD_DIGIT", digit: "1" })),
            btn("2", () => dispatch({ type: "ADD_DIGIT", digit: "2" })),
            btn("3", () => dispatch({ type: "ADD_DIGIT", digit: "3" })),
            btn("+", () => dispatch({ type: "CHOOSE_OPERATION", operation: "+" }), "op"),
            btn("⌫", () => dispatch({ type: "DELETE_DIGIT" }), "fn"),
            btn("0", () => dispatch({ type: "ADD_DIGIT", digit: "0" })),
            btn(".", () => dispatch({ type: "ADD_DIGIT", digit: "." })),
            btn("=", () => dispatch({ type: "EVALUATE" }), "equals")
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx("p", { className: "text-[#2e2b28] text-[10px] font-mono tracking-widest uppercase text-center", children: "Esc · Clear  |  ⌫ · Delete  |  Enter · Equals" })
  ] });
}
function BasicPage() {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 py-10 animate-fade-in", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-2", style: {
        color: "var(--text-primary)"
      }, children: "Standard Calculator" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", style: {
        color: "var(--text-secondary)"
      }, children: "Simple, fast, and responsive." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Calculator, {}) })
  ] });
}
export {
  BasicPage as component
};
