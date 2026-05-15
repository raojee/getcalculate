import { jsxs, jsx } from "react/jsx-runtime";
import { Zap, Shield, Heart } from "lucide-react";
function AboutPage() {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-6 py-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-extrabold mb-4", style: {
        color: "var(--text-primary)"
      }, children: "About CalcPro" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg", style: {
        color: "var(--text-secondary)"
      }, children: "Empowering everyone to master mathematics with free, professional tools." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-12", children: [
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Zap, { size: 24, style: {
            color: "var(--amber)"
          } }),
          " Our Mission"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "leading-relaxed", style: {
          color: "var(--text-secondary)"
        }, children: 'CalcPro was created with a simple goal: to make advanced mathematical tools accessible to everyone for free. We believe that education should not be hidden behind paywalls. Our platform provides high-quality solvers, calculators, and graphers that help students understand the "how" behind the answer.' })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl", style: {
          background: "var(--bg-surface)",
          border: "1px solid var(--border)"
        }, children: [
          /* @__PURE__ */ jsx(Shield, { size: 32, className: "mb-4", style: {
            color: "var(--amber)"
          } }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2", children: "Privacy First" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm", style: {
            color: "var(--text-secondary)"
          }, children: "All calculations are performed right in your browser. We don't store your equations or results on our servers." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl", style: {
          background: "var(--bg-surface)",
          border: "1px solid var(--border)"
        }, children: [
          /* @__PURE__ */ jsx(Heart, { size: 32, className: "mb-4", style: {
            color: "var(--amber)"
          } }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2", children: "Built for You" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm", style: {
            color: "var(--text-secondary)"
          }, children: "Whether you're a high school student or an engineer, CalcPro is designed to be fast, responsive, and easy to use." })
        ] })
      ] })
    ] })
  ] });
}
export {
  AboutPage as component
};
