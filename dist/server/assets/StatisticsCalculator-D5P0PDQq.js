import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { LayoutGrid, Info, ListFilter, Sigma } from "lucide-react";
import { M as MathRenderer } from "./MathRenderer-D5wL1Wgn.js";
import { G as GlassCard } from "./GlassCard-BneF3lW9.js";
import { R as ResultActions } from "./ResultActions-B5cWGFgg.js";
import "katex";
function StatisticsCalculator() {
  const [input, setInput] = useState("12, 15, 22, 18, 25, 30, 22, 19, 21, 28");
  const stats = useMemo(() => {
    const nums = input.split(/[, \n\t]+/).map((n2) => parseFloat(n2.trim())).filter((n2) => !isNaN(n2) && isFinite(n2));
    if (nums.length === 0) return null;
    const n = nums.length;
    const sorted = [...nums].sort((a, b) => a - b);
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    const mid = Math.floor(n / 2);
    const median = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    const counts = {};
    let maxFreq = 0;
    nums.forEach((n2) => {
      counts[n2] = (counts[n2] || 0) + 1;
      maxFreq = Math.max(maxFreq, counts[n2]);
    });
    const modeCandidates = Object.keys(counts).filter((n2) => counts[Number(n2)] === maxFreq).map(Number);
    let modeDisplay = "";
    if (maxFreq === 1 && n > 1) {
      modeDisplay = "No unique mode";
    } else if (modeCandidates.length === n) {
      modeDisplay = "Uniform distribution";
    } else {
      modeDisplay = modeCandidates.join(", ");
    }
    const variance = nums.reduce((a, b) => a + (b - mean) ** 2, 0) / n;
    const stdDev = Math.sqrt(variance);
    const chartData = Object.entries(counts).map(([val, freq]) => ({
      val: parseFloat(val),
      freq
    })).sort((a, b) => a.val - b.val);
    return {
      count: n,
      sum,
      mean,
      median,
      mode: modeDisplay,
      range: sorted[n - 1] - sorted[0],
      min: sorted[0],
      max: sorted[n - 1],
      variance,
      stdDev,
      chartData,
      latex: `\\bar{x} = ${mean.toFixed(2)}, \\sigma = ${stdDev.toFixed(2)}, \\sigma^2 = ${variance.toFixed(2)}`
    };
  }, [input]);
  return /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto space-y-8 animate-fade-in px-4 pb-12", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs(GlassCard, { className: "relative overflow-hidden border-white/5 shadow-2xl", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber to-amber-dark opacity-40" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-xl glass-amber flex items-center justify-center", children: /* @__PURE__ */ jsx(LayoutGrid, { size: 16, className: "text-amber" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-[11px] font-extrabold uppercase tracking-[0.2em] text-muted", children: "Dataset Input" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-1 bg-gradient-to-br from-amber/20 to-transparent rounded-[2rem] opacity-0 group-focus-within:opacity-100 transition-opacity blur-xl" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: input,
              onChange: (e) => setInput(e.target.value),
              placeholder: "Paste numbers here...",
              className: "relative w-full px-8 py-6 rounded-[1.5rem] bg-display border-strong outline-none text-base font-mono leading-relaxed min-h-[250px] focus:ring-1 focus:ring-amber/30 transition-all scrollbar-hide shadow-inner",
              style: { background: "var(--bg-display)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 flex items-start gap-3 px-5 py-4 rounded-2xl bg-amber/5 border border-amber/10", children: [
          /* @__PURE__ */ jsx(Info, { size: 16, className: "text-amber shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-muted leading-tight font-medium", children: [
            "Valid formats: ",
            /* @__PURE__ */ jsx("code", { className: "text-secondary font-bold", children: "12, 15.5, 20" }),
            " or newline separated lists. Non-numeric values are automatically excluded."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(GlassCard, { className: "border-white/5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-xl glass flex items-center justify-center", children: /* @__PURE__ */ jsx(ListFilter, { size: 16, className: "text-secondary" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-[11px] font-extrabold uppercase tracking-[0.2em] text-muted", children: "Summary Metrics" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-5", children: [
          { label: "Sample Size (n)", value: stats?.count || 0, color: "text-amber" },
          { label: "Min / Max Range", value: stats ? `[${stats.min}, ${stats.max}]` : "N/A", color: "text-secondary" },
          { label: "Summation (Σx)", value: stats?.sum.toLocaleString() || 0, color: "text-secondary" }
        ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2 border-b border-white/5 last:border-0", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-widest text-muted opacity-60", children: item.label }),
          /* @__PURE__ */ jsx("span", { className: `text-sm font-mono font-bold ${item.color}`, children: item.value })
        ] }, i)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-8", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: stats ? /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        className: "space-y-8",
        children: [
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: [
            { label: "Arithmetic Mean", value: stats.mean, formula: "\\bar{x} = \\frac{\\sum x}{n}" },
            { label: "Median Value", value: stats.median, formula: "\\tilde{x}" },
            { label: "Modal Value", value: stats.mode, formula: "Mode" },
            { label: "Std. Deviation", value: stats.stdDev, formula: "\\sigma = \\sqrt{\\frac{\\sum(x-\\mu)^2}{n}}" },
            { label: "Population Variance", value: stats.variance, formula: "\\sigma^2" },
            { label: "Total Range Spread", value: stats.range, formula: "x_{max} - x_{min}" }
          ].map((s, i) => /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 15 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: i * 0.04 },
              children: /* @__PURE__ */ jsxs(GlassCard, { className: "h-full group hover:border-amber/30 transition-all relative overflow-hidden border-white/5 shadow-xl", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all scale-90 origin-top-right", children: /* @__PURE__ */ jsx(ResultActions, { latex: s.formula, result: String(s.value) }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-muted opacity-70", children: s.label }),
                    /* @__PURE__ */ jsx(MathRenderer, { math: s.formula, className: "text-[10px] opacity-40 group-hover:opacity-100 transition-opacity" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "text-3xl font-black tracking-tight overflow-hidden text-ellipsis", style: { color: typeof s.value === "number" ? "var(--amber)" : "var(--text-primary)" }, children: typeof s.value === "number" ? parseFloat(s.value.toFixed(4)) : s.value })
                ] })
              ] })
            },
            s.label
          )) }),
          /* @__PURE__ */ jsxs(GlassCard, { className: "p-0 overflow-hidden relative border-white/5 shadow-2xl", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl glass-amber flex items-center justify-center", children: /* @__PURE__ */ jsx(Sigma, { size: 20, className: "text-amber" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-[11px] font-black uppercase tracking-[0.2em] text-primary", children: "Frequency Distribution" }),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-muted font-medium", children: "Dataset visualization across unique values" })
                ] })
              ] }),
              /* @__PURE__ */ jsx(ResultActions, { latex: stats.latex, result: "Statistical Analysis Export" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-[350px] w-full p-8", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(BarChart, { data: stats.chartData, children: [
              /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "rgba(255,255,255,0.03)" }),
              /* @__PURE__ */ jsx(
                XAxis,
                {
                  dataKey: "val",
                  stroke: "rgba(255,255,255,0.2)",
                  fontSize: 11,
                  axisLine: false,
                  tickLine: false,
                  dy: 10
                }
              ),
              /* @__PURE__ */ jsx(
                YAxis,
                {
                  stroke: "rgba(255,255,255,0.2)",
                  fontSize: 11,
                  axisLine: false,
                  tickLine: false,
                  dx: -10
                }
              ),
              /* @__PURE__ */ jsx(
                Tooltip,
                {
                  cursor: { fill: "rgba(255,255,255,0.02)" },
                  contentStyle: { background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "12px" },
                  itemStyle: { color: "var(--amber)", fontSize: "12px", fontWeight: "bold" },
                  labelStyle: { color: "rgba(255,255,255,0.5)", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "4px" }
                }
              ),
              /* @__PURE__ */ jsx(
                Bar,
                {
                  dataKey: "freq",
                  fill: "var(--amber)",
                  radius: [6, 6, 0, 0],
                  opacity: 0.8,
                  maxBarSize: 50,
                  animationDuration: 1500
                }
              )
            ] }) }) })
          ] })
        ]
      },
      "results"
    ) : /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "h-full min-h-[500px] flex flex-col items-center justify-center glass rounded-[2.5rem] border-dashed border-white/10 opacity-40 bg-white/[0.01]",
        children: [
          /* @__PURE__ */ jsx(Sigma, { size: 64, className: "text-muted mb-6 animate-pulse opacity-20" }),
          /* @__PURE__ */ jsx("h4", { className: "text-xs font-black uppercase tracking-[0.25em] text-muted", children: "Awaiting Analytic Data" }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-muted mt-2", children: "Enter numbers in the left panel to begin" })
        ]
      },
      "empty"
    ) }) })
  ] }) });
}
export {
  StatisticsCalculator as default
};
