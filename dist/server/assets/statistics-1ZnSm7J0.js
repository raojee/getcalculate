import { jsxs, jsx } from "react/jsx-runtime";
import StatisticsCalculator from "./StatisticsCalculator-D5P0PDQq.js";
import "react";
import "framer-motion";
import "recharts";
import "lucide-react";
import "./MathRenderer-D5wL1Wgn.js";
import "katex";
import "./GlassCard-BneF3lW9.js";
import "./ResultActions-B5cWGFgg.js";
function StatisticsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalApplication",
    "name": "CalcPro Statistics Engine",
    "operatingSystem": "All",
    "applicationCategory": "StatisticsApplication",
    "url": "https://calc.raotahir.online/statistics",
    "description": "Professional-grade statistical analysis tool for processing datasets and visualizing frequency distributions.",
    "softwareVersion": "1.0.5",
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
      "name": "How do I import data from Excel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simply copy your data column from Excel and paste it into our statistics textarea. The engine automatically sanitizes tabs, commas, and spaces to build your dataset."
      }
    }, {
      "@type": "Question",
      "name": "What is the difference between standard deviation and variance?",
      "acceptedAnswer": {
        "@type": {
          "@type": "Answer",
          "text": "Variance is the average of the squared differences from the Mean, while Standard Deviation is the square root of the Variance, providing a measure of spread in the original units."
        }
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
        "Statistics ",
        /* @__PURE__ */ jsx("span", { className: "text-amber", children: "Engine" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base max-w-2xl leading-relaxed", style: {
        color: "var(--text-secondary)"
      }, children: "Robust dataset analysis for descriptive statistics, frequency distribution, and core variability metrics." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "min-h-[600px]", children: /* @__PURE__ */ jsx(StatisticsCalculator, {}) }),
    /* @__PURE__ */ jsx("div", { className: "mt-20 h-[250px] w-full glass rounded-[2.5rem] border-dashed border-white/5 flex items-center justify-center bg-white/[0.01]", children: /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-[0.3em] text-muted opacity-20", children: "Statistical Methodology Area" }) })
  ] });
}
export {
  StatisticsPage as component
};
