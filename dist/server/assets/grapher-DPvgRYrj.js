import { jsxs, jsx } from "react/jsx-runtime";
import GraphPlotter from "./GraphPlotter-BRIgV2Sa.js";
import "react";
import "recharts";
import "mathjs";
import "lucide-react";
import "framer-motion";
import "./GlassCard-BneF3lW9.js";
import "./ResultActions-B5cWGFgg.js";
function GrapherPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CalcPro Graphing Visualizer",
    "operatingSystem": "All",
    "applicationCategory": "MathApplication",
    "url": "https://calc.raotahir.online/grapher",
    "description": "High-performance interactive graphing tool for visualizing mathematical functions with asymptote detection and multi-equation support.",
    "softwareVersion": "1.4.2",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "Can I plot multiple equations at once?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our graphing calculator supports plotting multiple simultaneous functions with unique color coding for each expression."
      }
    }, {
      "@type": "Question",
      "name": "How does the tool handle asymptotes like 1/x?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The visualizer uses advanced discontinuity detection to break the line at asymptotes, preventing chart distortion and ensuring mathematical accuracy."
      }
    }]
  };
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8 sm:py-12 animate-fade-in", children: [
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: {
      __html: JSON.stringify(schema)
    } }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: {
      __html: JSON.stringify(faqSchema)
    } }),
    /* @__PURE__ */ jsxs("div", { className: "mb-10 px-4 sm:px-0", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl sm:text-5xl font-black mb-4 tracking-tight", style: {
        color: "var(--text-primary)"
      }, children: [
        "Function ",
        /* @__PURE__ */ jsx("span", { className: "text-amber", children: "Plotter" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base max-w-2xl leading-relaxed", style: {
        color: "var(--text-secondary)"
      }, children: "A high-precision engine for exploring mathematical behaviors, intersections, and limits in real-time." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "min-h-[700px]", children: /* @__PURE__ */ jsx(GraphPlotter, {}) }),
    /* @__PURE__ */ jsx("div", { className: "mt-20 h-[300px] w-full glass rounded-[2.5rem] border-dashed border-white/5 flex items-center justify-center bg-white/[0.01]", children: /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-[0.3em] text-muted opacity-20", children: "Analytic Documentation Slot" }) })
  ] });
}
export {
  GrapherPage as component
};
