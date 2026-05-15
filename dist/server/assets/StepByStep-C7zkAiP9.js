import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Check, Copy, Share2, ChevronDown, Terminal } from "lucide-react";
import { M as MathRenderer } from "./MathRenderer-D5wL1Wgn.js";
function StepByStep({ result, steps, unit = "" }) {
  const [copied, setCopied] = useState(false);
  const [showSteps, setShowSteps] = useState(true);
  const [copyingLatex, setCopyingLatex] = useState(null);
  const handleCopy = () => {
    navigator.clipboard.writeText(result + unit);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  const handleCopyLatex = (latex, index) => {
    navigator.clipboard.writeText(latex);
    setCopyingLatex(index);
    setTimeout(() => setCopyingLatex(null), 2e3);
  };
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: "CalcPro Result", text: `Result: ${result}${unit}` });
    } else {
      handleCopy();
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "rounded-3xl overflow-hidden glass animate-fade-in",
      style: { boxShadow: "var(--shadow-elevated)" },
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center justify-between px-6 py-5",
            style: {
              background: "linear-gradient(135deg, rgba(255,157,46,0.1) 0%, rgba(255,157,46,0.05) 100%)",
              borderBottom: "1px solid var(--border)"
            },
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase tracking-widest mb-1.5", style: { color: "var(--text-muted)" }, children: "Final Answer" }),
                /* @__PURE__ */ jsx("div", { className: "flex items-baseline gap-2", children: /* @__PURE__ */ jsx(
                  MathRenderer,
                  {
                    math: result + unit,
                    className: "text-3xl font-bold",
                    style: { color: "var(--amber)" }
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: handleCopy,
                    className: "w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 glass-amber",
                    style: { color: "var(--text-secondary)" },
                    title: "Copy value",
                    children: copied ? /* @__PURE__ */ jsx(Check, { size: 16, color: "var(--amber)" }) : /* @__PURE__ */ jsx(Copy, { size: 16 })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: handleShare,
                    className: "w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 glass",
                    style: { color: "var(--text-secondary)" },
                    title: "Share",
                    children: /* @__PURE__ */ jsx(Share2, { size: 16 })
                  }
                )
              ] })
            ]
          }
        ),
        steps.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setShowSteps((v) => !v),
              className: "w-full flex items-center justify-between px-6 py-4 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-[rgba(255,157,46,0.03)]",
              style: { color: "var(--text-secondary)", borderBottom: showSteps ? "1px solid var(--border)" : "none" },
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-amber animate-pulse" }),
                  "Solution Steps"
                ] }),
                /* @__PURE__ */ jsx(
                  ChevronDown,
                  {
                    size: 14,
                    style: {
                      transform: showSteps ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.4s ease"
                    }
                  }
                )
              ]
            }
          ),
          showSteps && /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: steps.map((step, i) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex gap-5 px-6 py-5 relative group",
              style: { borderBottom: i < steps.length - 1 ? "1px solid var(--border)" : "none" },
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 glass-amber",
                    style: { color: "var(--amber)" },
                    children: i + 1
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                    /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase tracking-widest", style: { color: "var(--amber)" }, children: step.label }),
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        onClick: () => handleCopyLatex(step.expression, i),
                        className: "opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg glass",
                        style: { color: "var(--text-muted)" },
                        children: [
                          copyingLatex === i ? /* @__PURE__ */ jsx(Check, { size: 10, color: "var(--amber)" }) : /* @__PURE__ */ jsx(Terminal, { size: 10 }),
                          copyingLatex === i ? "Copied" : "LaTeX"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx(MathRenderer, { math: step.expression, block: true }) }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs leading-relaxed max-w-lg", style: { color: "var(--text-secondary)" }, children: step.explanation })
                ] })
              ]
            },
            i
          )) })
        ] })
      ]
    }
  );
}
export {
  StepByStep as S
};
