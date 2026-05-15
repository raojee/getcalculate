import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useCallback, useMemo } from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine, Line } from "recharts";
import { parse } from "mathjs";
import { Activity, Settings2, Trash2, Plus, ZoomIn, ZoomOut, MoveLeft, MoveRight, RefreshCcw, AlertCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { G as GlassCard } from "./GlassCard-BneF3lW9.js";
import { R as ResultActions } from "./ResultActions-B5cWGFgg.js";
const Y_CLAMP_LIMIT = 1e3;
function GraphPlotter() {
  const [inputs, setInputs] = useState(["sin(x)", "1/x"]);
  const [domain, setDomain] = useState({ min: -10, max: 10 });
  const [showSettings, setShowSettings] = useState(false);
  const [resolution, setResolution] = useState(200);
  const handleZoom = useCallback((factor) => {
    setDomain((prev) => {
      const center = (prev.min + prev.max) / 2;
      const halfWidth = (prev.max - prev.min) / 2 * factor;
      return { min: center - halfWidth, max: center + halfWidth };
    });
  }, []);
  const handlePan = useCallback((direction) => {
    setDomain((prev) => {
      const shift = (prev.max - prev.min) * 0.2 * direction;
      return { min: prev.min + shift, max: prev.max + shift };
    });
  }, []);
  const data = useMemo(() => {
    const points = [];
    const step = (domain.max - domain.min) / resolution;
    const compiledFunctions = inputs.filter((i) => i.trim() !== "").map((i) => {
      try {
        return { expr: i, fn: parse(i).compile() };
      } catch (e) {
        return null;
      }
    }).filter((item) => item !== null);
    if (compiledFunctions.length === 0) return [];
    for (let i = 0; i <= resolution; i++) {
      const x = domain.min + i * step;
      const point = { x: Number(x.toFixed(4)) };
      compiledFunctions.forEach((item, idx) => {
        try {
          const y = item.fn.evaluate({ x });
          if (typeof y === "number" && isFinite(y)) {
            if (Math.abs(y) > Y_CLAMP_LIMIT) {
              point[`y${idx}`] = y > 0 ? Y_CLAMP_LIMIT : -Y_CLAMP_LIMIT;
            } else {
              point[`y${idx}`] = Number(y.toFixed(6));
            }
          } else {
            point[`y${idx}`] = null;
          }
        } catch (e) {
          point[`y${idx}`] = null;
        }
      });
      points.push(point);
    }
    return points;
  }, [inputs, domain, resolution]);
  const colors = ["#ff9d2e", "#38bdf8", "#a855f7", "#10b981", "#f43f5e"];
  return /* @__PURE__ */ jsx("div", { className: "space-y-6 max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:grid lg:grid-cols-[380px_1fr] gap-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-6 order-2 lg:order-1", children: [
      /* @__PURE__ */ jsxs(GlassCard, { className: "relative overflow-hidden border-white/5", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber to-amber-dark opacity-40" }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-[11px] font-extrabold uppercase tracking-[0.2em] text-muted flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Activity, { size: 14, className: "text-amber" }),
            "Logic Editor"
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setShowSettings(!showSettings),
              className: `p-1.5 rounded-lg transition-all ${showSettings ? "bg-amber text-black shadow-lg shadow-amber/20" : "text-muted hover:bg-white/5"}`,
              children: /* @__PURE__ */ jsx(Settings2, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: inputs.map((input, idx) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.95 },
              className: "relative group",
              children: [
                /* @__PURE__ */ jsx("div", { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ring-4 ring-black/40 z-10", style: { background: colors[idx % colors.length] } }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: input,
                    onChange: (e) => {
                      const newInputs = [...inputs];
                      newInputs[idx] = e.target.value;
                      setInputs(newInputs);
                    },
                    placeholder: "Enter expression (e.g., x^2)",
                    className: "w-full pl-10 pr-12 py-3.5 rounded-2xl text-sm font-mono outline-none transition-all focus:ring-1 focus:ring-amber/30",
                    style: { background: "var(--bg-display)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setInputs(inputs.length > 1 ? inputs.filter((_, i) => i !== idx) : [""]),
                    className: "absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-muted opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all",
                    children: /* @__PURE__ */ jsx(Trash2, { size: 14 })
                  }
                )
              ]
            },
            idx
          )) }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setInputs([...inputs, ""]),
              className: "w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl glass-amber text-[10px] font-bold uppercase tracking-[0.2em] text-amber hover:bg-amber/10 transition-all border-dashed",
              children: [
                /* @__PURE__ */ jsx(Plus, { size: 14 }),
                " Append Expression"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: showSettings && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsx("div", { className: "mt-6 pt-6 border-t border-white/5 space-y-4", children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold uppercase tracking-widest text-muted", children: "Loop Resolution" }),
                /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-mono text-amber font-bold", children: [
                  resolution,
                  " Steps"
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "range",
                  min: "100",
                  max: "500",
                  step: "20",
                  value: resolution,
                  onChange: (e) => setResolution(parseInt(e.target.value)),
                  className: "w-full accent-amber cursor-pointer h-1.5 bg-white/5 rounded-lg appearance-none"
                }
              )
            ] }) })
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs(GlassCard, { className: "border-white/5", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-[11px] font-extrabold uppercase tracking-[0.2em] text-muted mb-4", children: "Precision Navigation" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxs("button", { onClick: () => handleZoom(0.5), className: "glass flex flex-col items-center gap-1 py-3 rounded-2xl hover:text-amber transition-all group", children: [
            /* @__PURE__ */ jsx(ZoomIn, { size: 18, className: "group-hover:scale-110 transition-transform" }),
            /* @__PURE__ */ jsx("span", { className: "text-[8px] font-bold uppercase opacity-60", children: "Zoom In" })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => handleZoom(2), className: "glass flex flex-col items-center gap-1 py-3 rounded-2xl hover:text-amber transition-all group", children: [
            /* @__PURE__ */ jsx(ZoomOut, { size: 18, className: "group-hover:scale-110 transition-transform" }),
            /* @__PURE__ */ jsx("span", { className: "text-[8px] font-bold uppercase opacity-60", children: "Zoom Out" })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => handlePan(-1), className: "glass flex flex-col items-center gap-1 py-3 rounded-2xl hover:text-amber transition-all group", children: [
            /* @__PURE__ */ jsx(MoveLeft, { size: 18, className: "group-hover:-translate-x-1 transition-transform" }),
            /* @__PURE__ */ jsx("span", { className: "text-[8px] font-bold uppercase opacity-60", children: "Pan Left" })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => handlePan(1), className: "glass flex flex-col items-center gap-1 py-3 rounded-2xl hover:text-amber transition-all group", children: [
            /* @__PURE__ */ jsx(MoveRight, { size: 18, className: "group-hover:translate-x-1 transition-transform" }),
            /* @__PURE__ */ jsx("span", { className: "text-[8px] font-bold uppercase opacity-60", children: "Pan Right" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setDomain({ min: -10, max: 10 });
              setInputs(["sin(x)", "1/x"]);
            },
            className: "w-full mt-4 glass flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:text-amber hover:bg-amber/5 transition-all",
            children: [
              /* @__PURE__ */ jsx(RefreshCcw, { size: 14 }),
              " Recenter View"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6 order-1 lg:order-2", children: [
      /* @__PURE__ */ jsxs(GlassCard, { className: "h-[500px] lg:h-[650px] p-0 overflow-hidden relative border-none shadow-2xl ring-1 ring-white/5", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-8 left-8 z-20 flex flex-wrap gap-2 pointer-events-none", children: inputs.filter((i) => i.trim()).map((input, idx) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            className: "flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl ring-1 ring-white/10",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.2)]", style: { background: colors[idx % colors.length] } }),
              /* @__PURE__ */ jsxs("span", { className: "text-[11px] font-mono font-bold text-white/90", children: [
                "f(x) = ",
                input
              ] })
            ]
          },
          idx
        )) }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-8 right-8 z-20", children: /* @__PURE__ */ jsx(
          ResultActions,
          {
            latex: inputs.map((i) => `f(x) = ${i}`).join("\\\\"),
            result: `Graph: ${inputs.join(", ")}`,
            className: "opacity-40 hover:opacity-100 transition-all"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-[#080808]", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(LineChart, { data, margin: { top: 0, right: 0, bottom: 0, left: 0 }, children: [
          /* @__PURE__ */ jsx(
            CartesianGrid,
            {
              strokeDasharray: "3 3",
              vertical: true,
              stroke: "rgba(255,255,255,0.04)"
            }
          ),
          /* @__PURE__ */ jsx(
            XAxis,
            {
              dataKey: "x",
              type: "number",
              domain: [domain.min, domain.max],
              hide: true
            }
          ),
          /* @__PURE__ */ jsx(
            YAxis,
            {
              hide: true,
              domain: ["auto", "auto"]
            }
          ),
          /* @__PURE__ */ jsx(
            Tooltip,
            {
              content: ({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return /* @__PURE__ */ jsxs("div", { className: "bg-black/80 backdrop-blur-2xl p-4 rounded-2xl shadow-2xl ring-1 ring-white/10 border-none min-w-[160px]", children: [
                    /* @__PURE__ */ jsxs("p", { className: "text-[11px] font-mono text-muted mb-3 pb-2 border-b border-white/10", children: [
                      "Coordinate X: ",
                      /* @__PURE__ */ jsx("span", { className: "text-white", children: label })
                    ] }),
                    payload.map((p, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-6 py-1.5", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
                        /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full", style: { background: p.color } }),
                        /* @__PURE__ */ jsxs("span", { className: "text-[11px] font-bold text-secondary", children: [
                          "y",
                          i + 1
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "text-[12px] font-mono font-bold text-amber", children: p.value === null ? "∞" : p.value })
                    ] }, i))
                  ] });
                }
                return null;
              },
              cursor: { stroke: "rgba(255,157,46,0.3)", strokeWidth: 1 }
            }
          ),
          /* @__PURE__ */ jsx(ReferenceLine, { x: 0, stroke: "rgba(255,255,255,0.2)", strokeWidth: 1 }),
          /* @__PURE__ */ jsx(ReferenceLine, { y: 0, stroke: "rgba(255,255,255,0.2)", strokeWidth: 1 }),
          inputs.map((_, idx) => /* @__PURE__ */ jsx(
            Line,
            {
              type: "monotone",
              dataKey: `y${idx}`,
              stroke: colors[idx % colors.length],
              dot: false,
              strokeWidth: 3,
              connectNulls: false,
              animationDuration: 800,
              isAnimationActive: true
            },
            idx
          ))
        ] }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "absolute bottom-8 right-8 flex items-center gap-5 text-[10px] font-mono text-muted uppercase tracking-[0.15em] bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/5 z-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "opacity-50", children: "Scale X" }),
            /* @__PURE__ */ jsxs("span", { className: "text-white font-bold", children: [
              domain.min.toFixed(1),
              " : ",
              domain.max.toFixed(1)
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-px h-3 bg-white/10" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "opacity-50", children: "Sampling" }),
            /* @__PURE__ */ jsxs("span", { className: "text-amber font-bold", children: [
              resolution,
              " Pts"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 px-8 py-5 glass rounded-3xl border-white/5", children: [
        /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-2xl glass-amber flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsx(AlertCircle, { size: 22, className: "text-amber" }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-extrabold uppercase tracking-widest text-primary", children: "Advanced Asymptote Handling" }),
          /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-muted leading-relaxed", children: [
            "The visualizer automatically detects mathematical discontinuities (like 1/0 or tan(π/2)). Points exceeding a magnitude of ",
            Y_CLAMP_LIMIT,
            " are clamped or treated as breaks to maintain visual coherence across extreme value ranges."
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  GraphPlotter as G
};
