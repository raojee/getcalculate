import { jsxs, jsx } from "react/jsx-runtime";
import GeometrySolver from "./GeometrySolver-Bkt3VL28.js";
import "react";
import "framer-motion";
import "./MathRenderer-D5wL1Wgn.js";
import "katex";
import "./GlassCard-BneF3lW9.js";
import "./ResultActions-B5cWGFgg.js";
import "lucide-react";
function GeometryPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Geometry Solver & Visualizer",
    "operatingSystem": "All",
    "applicationCategory": "EducationalApplication",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "url": "https://calc.raotahir.online/geometry",
    "description": "Calculate area, perimeter, volume, and surface area for standard shapes with step-by-step KaTeX explanations and responsive 3D visual models.",
    "softwareVersion": "2.1.0",
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
      "name": "How do I calculate the volume of a cylinder?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The volume of a cylinder is calculated using the formula V = πr²h, where r is the radius of the base and h is the height."
      }
    }, {
      "@type": "Question",
      "name": "What is Heron's formula?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Heron's formula is used to find the area of a triangle when all three side lengths are known: Area = √(s(s-a)(s-b)(s-c)), where s is the semi-perimeter."
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
        "Geometry ",
        /* @__PURE__ */ jsx("span", { className: "text-amber", children: "Visualizer" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base max-w-2xl leading-relaxed", style: {
        color: "var(--text-secondary)"
      }, children: "Analyze 2D and 3D primitives with real-time vector rendering and parametric recalculation." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "min-h-[600px]", children: /* @__PURE__ */ jsx(GeometrySolver, {}) }),
    /* @__PURE__ */ jsx("div", { className: "mt-20 h-[250px] w-full glass rounded-[2.5rem] border-dashed border-white/5 flex items-center justify-center bg-white/[0.01]", children: /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-[0.3em] text-muted opacity-20", children: "Educational Resources Area" }) })
  ] });
}
export {
  GeometryPage as component
};
