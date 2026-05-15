import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { G as GlassCard } from "./GlassCard-BneF3lW9.js";
const UNITS = {
  length: {
    meters: 1,
    kilometers: 1e-3,
    centimeters: 100,
    millimeters: 1e3,
    miles: 621371e-9,
    yards: 1.09361,
    feet: 3.28084,
    inches: 39.3701
  },
  weight: {
    kilograms: 1,
    grams: 1e3,
    milligrams: 1e6,
    pounds: 2.20462,
    ounces: 35.274
  },
  temp: {
    celsius: (v) => v,
    fahrenheit: (v) => v * 9 / 5 + 32,
    kelvin: (v) => v + 273.15
  }
};
const ArrowIcon = () => /* @__PURE__ */ jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("path", { d: "m22 7-8.5 8.5-5-5L2 17" }),
  /* @__PURE__ */ jsx("path", { d: "m22 7-1.5 4.5-4.5-1.5L22 7Z" })
] });
function UnitConverter() {
  const [category, setCategory] = useState("length");
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState("meters");
  const results = useMemo(() => {
    if (category === "temp") {
      let cVal = value;
      if (fromUnit === "fahrenheit") cVal = (value - 32) * 5 / 9;
      if (fromUnit === "kelvin") cVal = value - 273.15;
      return [
        { unit: "Celsius", val: cVal },
        { unit: "Fahrenheit", val: cVal * 9 / 5 + 32 },
        { unit: "Kelvin", val: cVal + 273.15 }
      ];
    }
    const catUnits = UNITS[category];
    const baseVal = value / catUnits[fromUnit];
    return Object.entries(catUnits).map(([unit, factor]) => ({
      unit,
      val: baseVal * factor
    }));
  }, [category, value, fromUnit]);
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-8", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-4", children: Object.keys(UNITS).map((cat) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          setCategory(cat);
          setFromUnit(Object.keys(UNITS[cat])[0]);
        },
        className: `px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${category === cat ? "bg-amber text-[#1a0f00]" : "glass"}`,
        children: cat
      },
      cat
    )) }),
    /* @__PURE__ */ jsx(GlassCard, { className: "glass-amber", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-[10px] font-bold uppercase tracking-widest mb-2 text-muted", children: "Amount" }),
        /* @__PURE__ */ jsx("input", { type: "number", value, onChange: (e) => setValue(Number(e.target.value)), className: "w-full px-5 py-4 rounded-2xl bg-display border-strong outline-none text-2xl font-bold", style: { background: "var(--bg-display)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" } })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-4", children: /* @__PURE__ */ jsx(ArrowIcon, {}) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-[10px] font-bold uppercase tracking-widest mb-2 text-muted", children: "From Unit" }),
        /* @__PURE__ */ jsx("select", { value: fromUnit, onChange: (e) => setFromUnit(e.target.value), className: "w-full px-5 py-4 rounded-2xl bg-display border-strong outline-none text-xl font-bold appearance-none", style: { background: "var(--bg-display)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" }, children: Object.keys(UNITS[category]).map((u) => /* @__PURE__ */ jsx("option", { value: u, children: u.charAt(0).toUpperCase() + u.slice(1) }, u)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: results.map((r) => /* @__PURE__ */ jsxs(GlassCard, { className: "flex flex-col justify-between py-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase tracking-widest text-muted mb-2", children: r.unit }),
      /* @__PURE__ */ jsx("div", { className: "text-lg font-bold truncate", style: { color: r.unit.toLowerCase() === fromUnit ? "var(--amber)" : "var(--text-primary)" }, children: parseFloat(r.val.toPrecision(8)) })
    ] }, r.unit)) })
  ] });
}
function ConverterPage() {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 py-10 animate-fade-in", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-2", style: {
        color: "var(--text-primary)"
      }, children: "Unit Converter" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", style: {
        color: "var(--text-secondary)"
      }, children: "Convert values between various scientific and everyday units." })
    ] }),
    /* @__PURE__ */ jsx(UnitConverter, {})
  ] });
}
export {
  ConverterPage as component
};
