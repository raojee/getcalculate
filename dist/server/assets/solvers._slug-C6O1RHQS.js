import { jsxs, jsx } from "react/jsx-runtime";
import { G as GeometrySolver } from "./GeometrySolver-BduEIrTF.js";
import { S as StatisticsCalculator } from "./StatisticsCalculator-DtGGtw4z.js";
import { G as GraphPlotter } from "./GraphPlotter-DIryi1X2.js";
import { G as GlassCard } from "./GlassCard-BneF3lW9.js";
import { R as ResultActions } from "./ResultActions-B5cWGFgg.js";
import { BookOpen, HelpCircle, ArrowRight, LayoutGrid } from "lucide-react";
import { R as Route } from "./router-CO8sYcD6.js";
import "react";
import "framer-motion";
import "./MathRenderer-D5wL1Wgn.js";
import "katex";
import "recharts";
import "mathjs";
import "@tanstack/react-router";
function SolverPageComponent() {
  const solver = Route.useLoaderData();
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": solver.schema.name,
    "operatingSystem": "All",
    "applicationCategory": solver.schema.category,
    "url": `https://calc.raotahir.online/solvers/${solver.slug}`,
    "description": solver.schema.description,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": solver.faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };
  const renderSolver = () => {
    switch (solver.type) {
      case "geometry":
        return /* @__PURE__ */ jsx(GeometrySolver, {});
      case "statistics":
        return /* @__PURE__ */ jsx(StatisticsCalculator, {});
      case "grapher":
        return /* @__PURE__ */ jsx(GraphPlotter, {});
      default:
        return /* @__PURE__ */ jsx("div", { className: "py-20 text-center glass rounded-[2.5rem]", children: /* @__PURE__ */ jsxs("p", { className: "text-muted text-sm font-bold uppercase tracking-widest", children: [
          "Base Module Template for ",
          solver.type
        ] }) });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8 sm:py-16 animate-fade-in", children: [
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: {
      __html: JSON.stringify(webAppSchema)
    } }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: {
      __html: JSON.stringify(faqSchema)
    } }),
    /* @__PURE__ */ jsxs("div", { className: "mb-16 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-end", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "px-4 py-1 rounded-full bg-amber/10 text-amber text-[10px] font-black uppercase tracking-widest border border-amber/20", children: solver.category }),
          /* @__PURE__ */ jsx("div", { className: "h-px w-12 bg-white/10" }),
          /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-bold text-muted uppercase tracking-widest", children: [
            "pSEO Index: ",
            solver.slug
          ] })
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-5xl sm:text-7xl font-black tracking-tight leading-[0.9] text-primary", children: [
          solver.title.split(" ").slice(0, -1).join(" "),
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-amber", children: solver.title.split(" ").pop() })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg text-muted max-w-2xl leading-relaxed", children: [
          solver.subtitle,
          ". ",
          solver.description
        ] })
      ] }),
      /* @__PURE__ */ jsxs(GlassCard, { className: "hidden lg:flex items-center justify-between p-8 border-amber/20 bg-amber/[0.02]", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-muted", children: "Ready to Export" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-bold", children: "LaTeX & Result Actions" })
        ] }),
        /* @__PURE__ */ jsx(ResultActions, { latex: "\\text{Ready}", result: solver.title })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-20", children: renderSolver() }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl glass-amber flex items-center justify-center", children: /* @__PURE__ */ jsx(BookOpen, { size: 20, className: "text-amber" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-black uppercase tracking-tight", children: "Solution Methodology" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: solver.steps.map((step, i) => /* @__PURE__ */ jsx(GlassCard, { className: "hover:border-amber/20 transition-all", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-3xl font-black text-amber/20 italic", children: String(i + 1).padStart(2, "0") }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-sm font-black uppercase tracking-wide text-primary", children: step.title }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted leading-relaxed", children: step.content })
          ] })
        ] }) }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl glass flex items-center justify-center", children: /* @__PURE__ */ jsx(HelpCircle, { size: 20, className: "text-secondary" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-black uppercase tracking-tight", children: "Common Questions" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: solver.faqs.map((faq, i) => /* @__PURE__ */ jsxs("details", { className: "group glass rounded-2xl border border-white/5 overflow-hidden", children: [
          /* @__PURE__ */ jsxs("summary", { className: "flex items-center justify-between p-5 cursor-pointer list-none", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-black uppercase tracking-wide text-secondary pr-4", children: faq.question }),
            /* @__PURE__ */ jsx(ArrowRight, { size: 14, className: "text-muted group-open:rotate-90 transition-transform" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "px-5 pb-5 text-xs text-muted leading-relaxed border-t border-white/5 pt-4", children: faq.answer })
        ] }, i)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-20 h-[280px] w-full glass rounded-[3rem] border-dashed border-white/5 flex flex-col items-center justify-center bg-white/[0.01] gap-4", children: [
      /* @__PURE__ */ jsx(LayoutGrid, { size: 32, className: "text-muted opacity-10" }),
      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-[0.4em] text-muted opacity-20", children: "Dynamic Educational Resource Slot" })
    ] })
  ] });
}
export {
  SolverPageComponent as component
};
