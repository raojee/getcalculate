import { jsxs, jsx } from "react/jsx-runtime";
import { Send, Mail, MessageSquare } from "lucide-react";
function ContactPage() {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto px-6 py-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-extrabold mb-4", style: {
        color: "var(--text-primary)"
      }, children: "Contact Us" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg", style: {
        color: "var(--text-secondary)"
      }, children: "We'd love to hear from you. Send us your feedback or questions." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "surface-card p-8 stagger", children: /* @__PURE__ */ jsxs("form", { name: "contact", method: "POST", "data-netlify": "true", className: "space-y-5 animate-fade-in", children: [
      /* @__PURE__ */ jsx("input", { type: "hidden", name: "form-name", value: "contact" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold uppercase tracking-widest mb-1.5 ml-1", style: {
          color: "var(--text-muted)"
        }, children: "Name" }),
        /* @__PURE__ */ jsx("input", { type: "text", name: "name", required: true, className: "w-full px-4 py-3 rounded-xl outline-none", style: {
          background: "var(--bg-display)",
          border: "1px solid var(--border-strong)",
          color: "var(--text-primary)"
        }, placeholder: "Your Name" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold uppercase tracking-widest mb-1.5 ml-1", style: {
          color: "var(--text-muted)"
        }, children: "Email" }),
        /* @__PURE__ */ jsx("input", { type: "email", name: "email", required: true, className: "w-full px-4 py-3 rounded-xl outline-none", style: {
          background: "var(--bg-display)",
          border: "1px solid var(--border-strong)",
          color: "var(--text-primary)"
        }, placeholder: "your@email.com" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold uppercase tracking-widest mb-1.5 ml-1", style: {
          color: "var(--text-muted)"
        }, children: "Message" }),
        /* @__PURE__ */ jsx("textarea", { name: "message", required: true, rows: 4, className: "w-full px-4 py-3 rounded-xl outline-none resize-none", style: {
          background: "var(--bg-display)",
          border: "1px solid var(--border-strong)",
          color: "var(--text-primary)"
        }, placeholder: "How can we help?" })
      ] }),
      /* @__PURE__ */ jsxs("button", { type: "submit", className: "amber-btn w-full flex items-center justify-center gap-2 py-4", children: [
        /* @__PURE__ */ jsx(Send, { size: 18 }),
        " Send Message"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-4 rounded-2xl", style: {
        background: "var(--bg-surface-2)",
        border: "1px solid var(--border)"
      }, children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full flex items-center justify-center", style: {
          background: "var(--amber-glow)",
          color: "var(--amber)"
        }, children: /* @__PURE__ */ jsx(Mail, { size: 20 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs font-bold uppercase tracking-wider", style: {
            color: "var(--text-muted)"
          }, children: "Email" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", style: {
            color: "var(--text-primary)"
          }, children: "support@calcpro.com" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-4 rounded-2xl", style: {
        background: "var(--bg-surface-2)",
        border: "1px solid var(--border)"
      }, children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full flex items-center justify-center", style: {
          background: "var(--amber-glow)",
          color: "var(--amber)"
        }, children: /* @__PURE__ */ jsx(MessageSquare, { size: 20 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs font-bold uppercase tracking-wider", style: {
            color: "var(--text-muted)"
          }, children: "Community" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", style: {
            color: "var(--text-primary)"
          }, children: "Discord Server" })
        ] })
      ] })
    ] })
  ] });
}
export {
  ContactPage as component
};
