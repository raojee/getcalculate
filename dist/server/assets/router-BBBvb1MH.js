import { useRouterState, Link, Outlet, createRootRoute, HeadContent, Scripts, createFileRoute, lazyRouteComponent, notFound, createRouter } from "@tanstack/react-router";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useContext, createContext, useState, useEffect } from "react";
const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {
  }
});
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("calcpro-theme") || "dark";
    }
    return "dark";
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("calcpro-theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      console.log("Switching theme to:", next);
      return next;
    });
  };
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, toggleTheme }, children });
}
function useTheme() {
  return useContext(ThemeContext);
}
const HomeIcon = () => /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("path", { d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }),
  /* @__PURE__ */ jsx("polyline", { points: "9 22 9 12 15 12 15 22" })
] });
const MathIcon = () => /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }),
  /* @__PURE__ */ jsx("line", { x1: "12", y1: "8", x2: "12", y2: "16" }),
  /* @__PURE__ */ jsx("line", { x1: "8", y1: "12", x2: "16", y2: "12" })
] });
const NAV_GROUPS = [
  {
    title: "General",
    items: [
      { to: "/", label: "Home", icon: HomeIcon },
      { to: "/calculator", label: "Basic Calculator", icon: MathIcon },
      { to: "/scientific", label: "Scientific", icon: MathIcon }
    ]
  },
  {
    title: "Advanced Math",
    items: [
      { to: "/algebra", label: "Algebra Solver", icon: MathIcon },
      { to: "/trigonometry", label: "Trigonometry", icon: MathIcon },
      { to: "/calculus", label: "Calculus", icon: MathIcon },
      { to: "/equations", label: "Equations", icon: MathIcon }
    ]
  }
];
function Sidebar({ open, onClose }) {
  const { pathname } = useRouterState({ select: (s) => s.location });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    open && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-40 lg:hidden bg-black/60 backdrop-blur-sm",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxs(
      "aside",
      {
        id: "sidebar",
        className: `fixed left-0 top-0 h-full z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:relative lg:flex-shrink-0 ${open ? "translate-x-0" : "-translate-x-full"}`,
        style: {
          width: "260px",
          background: "var(--bg-surface)",
          borderRight: "1px solid var(--border)"
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between p-5 border-b", style: { borderColor: "var(--border)" }, children: /* @__PURE__ */ jsxs(Link, { to: "/", onClick: onClose, className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm bg-amber text-black", children: "CP" }),
            /* @__PURE__ */ jsx("div", { className: "font-bold text-base", style: { color: "var(--text-primary)" }, children: "CalcPro" })
          ] }) }),
          /* @__PURE__ */ jsx("nav", { className: "flex-1 overflow-y-auto py-3 px-2", children: NAV_GROUPS.map((group) => /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-muted", children: group.title }),
            group.items.map(({ to, label, icon: Icon }) => {
              const isActive = pathname === to || to !== "/" && pathname.startsWith(to);
              return /* @__PURE__ */ jsxs(
                Link,
                {
                  to,
                  onClick: onClose,
                  className: `flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all relative ${isActive ? "bg-[rgba(255,157,46,0.1)] text-amber" : "text-secondary hover:bg-[rgba(255,255,255,0.03)]"}`,
                  children: [
                    /* @__PURE__ */ jsx(Icon, {}),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: label })
                  ]
                },
                to
              );
            })
          ] }, group.title)) })
        ]
      }
    )
  ] });
}
const MenuIcon = () => /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("line", { x1: "4", y1: "12", x2: "20", y2: "12" }),
  /* @__PURE__ */ jsx("line", { x1: "4", y1: "6", x2: "20", y2: "6" }),
  /* @__PURE__ */ jsx("line", { x1: "4", y1: "18", x2: "20", y2: "18" })
] });
const SunIcon = () => /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "4" }),
  /* @__PURE__ */ jsx("path", { d: "M12 2v2" }),
  /* @__PURE__ */ jsx("path", { d: "M12 20v2" }),
  /* @__PURE__ */ jsx("path", { d: "m4.93 4.93 1.41 1.41" }),
  /* @__PURE__ */ jsx("path", { d: "m17.66 17.66 1.41 1.41" }),
  /* @__PURE__ */ jsx("path", { d: "M2 12h2" }),
  /* @__PURE__ */ jsx("path", { d: "M20 12h2" }),
  /* @__PURE__ */ jsx("path", { d: "m6.34 17.66-1.41 1.41" }),
  /* @__PURE__ */ jsx("path", { d: "m19.07 4.93-1.41 1.41" })
] });
const MoonIcon = () => /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" }) });
function TopBar({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useRouterState({ select: (s) => s.location });
  const getPageTitle = () => {
    if (pathname === "/") return "Dashboard";
    const name = pathname.split("/")[1];
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  return /* @__PURE__ */ jsxs("header", { className: "h-16 px-6 flex items-center justify-between glass border-b sticky top-0 z-30", style: { borderColor: "var(--border)", background: "var(--bg-surface)" }, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onMenuClick,
          className: "lg:hidden p-2 rounded-xl hover:bg-[rgba(255,157,46,0.1)] transition-colors",
          style: { color: "var(--text-secondary)" },
          children: /* @__PURE__ */ jsx(MenuIcon, {})
        }
      ),
      /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold uppercase tracking-widest text-amber", children: getPageTitle() })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsx(
      "button",
      {
        id: "theme-toggle",
        onClick: () => {
          console.log("Toggle clicked");
          toggleTheme();
        },
        className: "w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95",
        style: { background: "var(--bg-surface-3)", color: "var(--text-secondary)", border: "1px solid var(--border)" },
        children: theme === "dark" ? /* @__PURE__ */ jsx(SunIcon, {}) : /* @__PURE__ */ jsx(MoonIcon, {})
      }
    ) })
  ] });
}
function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "flex h-screen overflow-hidden", style: { background: "var(--bg-page)", color: "var(--text-primary)" }, children: [
    /* @__PURE__ */ jsx(Sidebar, { open: sidebarOpen, onClose: () => setSidebarOpen(false) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col min-w-0 overflow-hidden", children: [
      /* @__PURE__ */ jsx(TopBar, { onMenuClick: () => setSidebarOpen(true) }),
      /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-y-auto relative p-4 md:p-8", children: /* @__PURE__ */ jsx(Outlet, {}) })
    ] })
  ] });
}
const Route$h = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CalcPro — Free Online Math Platform" },
      {
        name: "description",
        content: "CalcPro is a free all-in-one math platform with Algebra Solver, Trigonometry, Calculus, Equation Solver, Graph Plotter, Matrix Calculator and more. Step-by-step solutions."
      },
      { name: "keywords", content: "calculator, algebra solver, calculus, trigonometry, equation solver, graph plotter, matrix calculator, math solver, online calculator" },
      { property: "og:title", content: "CalcPro — Free Online Math Platform" },
      { property: "og:description", content: "Free all-in-one math platform. Algebra, Calculus, Trigonometry, Graphing, Matrix and more with step-by-step solutions." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://getcalculate.netlify.app" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "CalcPro — Free Online Math Platform" },
      { name: "twitter:description", content: "Free all-in-one math solver platform." },
      { name: "theme-color", content: "#ff9d2e" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
      },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
      },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", href: "/favicon.ico" }
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "CalcPro",
          url: "https://getcalculate.netlify.app",
          description: "Free all-in-one math solving platform with step-by-step solutions.",
          applicationCategory: "EducationApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
        })
      }
    ]
  }),
  shellComponent: RootDocument,
  component: AppLayout
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx(HeadContent, {}),
      /* @__PURE__ */ jsx(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: `
              (function() {
                const theme = localStorage.getItem('calcpro-theme') || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(ThemeProvider, { children }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$g = () => import("./trigonometry-BRV-5l4J.js");
const Route$g = createFileRoute("/trigonometry")({
  head: () => ({
    meta: [{
      title: "Trigonometry Solver — CalcPro"
    }, {
      name: "description",
      content: "Solve trigonometric functions and explore the unit circle with step-by-step calculations."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./statistics-1ZnSm7J0.js");
const Route$f = createFileRoute("/statistics")({
  head: () => ({
    meta: [{
      title: "Advanced Statistics & Probability Calculator — CalcPro"
    }, {
      name: "description",
      content: "Instantly calculate mean, median, mode, standard deviation, and variance. Supports bulk data pasting from Excel or PDFs with robust distribution analysis."
    }, {
      name: "keywords",
      content: "statistics calculator, standard deviation calculator, mean median mode, data analysis tool, probability solver"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./scientific-DNRwBqVR.js");
const Route$e = createFileRoute("/scientific")({
  head: () => ({
    meta: [{
      title: "Scientific Calculator — CalcPro"
    }, {
      name: "description",
      content: "Advanced scientific calculator with support for functions, logarithms, and more."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./probability-DPTNgtns.js");
const Route$d = createFileRoute("/probability")({
  head: () => ({
    meta: [{
      title: "Probability Calculator — Combinations & Permutations"
    }, {
      name: "description",
      content: "Free online probability calculator. Calculate combinations (nCr) and permutations (nPr) with step-by-step formulas."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./percentage-GEzNVA7G.js");
const Route$c = createFileRoute("/percentage")({
  head: () => ({
    meta: [{
      title: "Percentage Calculator — CalcPro"
    }, {
      name: "description",
      content: "Quickly find percentages, percentage change, and percentage differences."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./matrix-BCe_Yr2z.js");
const Route$b = createFileRoute("/matrix")({
  head: () => ({
    meta: [{
      title: "Matrix Calculator — CalcPro"
    }, {
      name: "description",
      content: "Perform matrix operations like addition, multiplication, determinant, and inverse."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./grapher-DPvgRYrj.js");
const Route$a = createFileRoute("/grapher")({
  head: () => ({
    meta: [{
      title: "Interactive Online Graphing Calculator — CalcPro"
    }, {
      name: "description",
      content: "Visualize complex mathematical functions with our high-performance interactive graphing tool. Support for asymptotes, multiple equations, and 2D function analysis."
    }, {
      name: "keywords",
      content: "graphing calculator, online plotter, function visualizer, plot math equations, interactive math graph"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./geometry-DN2Mcet2.js");
const Route$9 = createFileRoute("/geometry")({
  head: () => ({
    meta: [{
      title: "Interactive Geometry Solver & 3D Visualizer — CalcPro"
    }, {
      name: "description",
      content: "Calculate area, perimeter, volume, and surface area for standard shapes with step-by-step KaTeX explanations and responsive 3D visual models."
    }, {
      name: "keywords",
      content: "geometry solver, area calculator, volume calculator, 3d shape visualizer, circle area, cylinder volume"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./equations-_uemkLyT.js");
const Route$8 = createFileRoute("/equations")({
  head: () => ({
    meta: [{
      title: "Equation Solver — CalcPro"
    }, {
      name: "description",
      content: "Solve systems of linear equations and complex equations step-by-step."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./converter-CY4dnFt2.js");
const Route$7 = createFileRoute("/converter")({
  head: () => ({
    meta: [{
      title: "Unit Converter — CalcPro"
    }, {
      name: "description",
      content: "Convert between different units of length, weight, temperature, and more."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./contact-vDz9zdD6.js");
const Route$6 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact CalcPro — Get in Touch"
    }, {
      name: "description",
      content: "Have a question or feedback for CalcPro? Send us a message."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./calculus-gYf9R7rv.js");
const Route$5 = createFileRoute("/calculus")({
  head: () => ({
    meta: [{
      title: "Calculus Solver — CalcPro"
    }, {
      name: "description",
      content: "Differentiate functions instantly with step-by-step solutions and AI hints."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./calculator-D1bcjwLr.js");
const Route$4 = createFileRoute("/calculator")({
  head: () => ({
    meta: [{
      title: "Basic Calculator — CalcPro"
    }, {
      name: "description",
      content: "Simple and clean basic calculator for everyday use."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./algebra-BSgDFm9f.js");
const Route$3 = createFileRoute("/algebra")({
  head: () => ({
    meta: [{
      title: "Algebra Solver with Steps — CalcPro"
    }, {
      name: "description",
      content: "Free online algebra solver with step-by-step solutions."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./about-DdMpAJ4w.js");
const Route$2 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About CalcPro — Our Mission"
    }, {
      name: "description",
      content: "Learn more about CalcPro, the free all-in-one math solving platform designed for students and professionals."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-DEjHI8Ut.js");
const Route$1 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "CalcPro — Premium AI-Powered Math Platform"
    }, {
      name: "description",
      content: "Free all-in-one math solving platform with step-by-step solutions, AI hints, and interactive graphing."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const solversData = [
  {
    slug: "quadratic-equation-solver",
    title: "Quadratic Equation Solver",
    subtitle: "Solve ax² + bx + c = 0 instantly",
    description: "Find roots using the quadratic formula with step-by-step discriminant analysis and vertex calculation.",
    category: "Algebra",
    type: "algebra",
    keywords: ["quadratic formula", "roots of equation", "algebra solver", "parabola vertex"],
    schema: {
      name: "CalcPro Quadratic Solver",
      description: "Advanced algebra tool for solving quadratic equations with real and complex root support.",
      category: "AlgebraicApplication"
    },
    faqs: [
      {
        question: "What is the quadratic formula?",
        answer: "The quadratic formula is x = (-b ± √(b² - 4ac)) / 2a."
      },
      {
        question: "What happens if the discriminant is negative?",
        answer: "If the discriminant (b² - 4ac) is negative, the equation has two complex (imaginary) roots."
      }
    ],
    steps: [
      { title: "Identify Coefficients", content: "Extract a, b, and c from the standard form equation." },
      { title: "Calculate Discriminant", content: "Compute Δ = b² - 4ac to determine root characteristics." },
      { title: "Apply Formula", content: "Solve for x using the quadratic formula." }
    ]
  },
  {
    slug: "cylinder-volume-calculator",
    title: "Cylinder Volume Calculator",
    subtitle: "Calculate volume and surface area of cylinders",
    description: "Enter radius and height to compute high-precision geometric metrics for any cylindrical object.",
    category: "Geometry",
    type: "geometry",
    keywords: ["cylinder volume", "surface area of cylinder", "geometric solver", "3d shapes"],
    schema: {
      name: "CalcPro Cylinder Tool",
      description: "Geometric visualizer for calculating cylindrical volume and surface area.",
      category: "GeometryApplication"
    },
    faqs: [
      {
        question: "How do I find the area of the base?",
        answer: "The area of the base of a cylinder is A = πr², as it is a circle."
      }
    ],
    steps: [
      { title: "Enter Radius", content: "Define the distance from the center to the edge of the circular base." },
      { title: "Enter Height", content: "Provide the vertical distance between the two circular bases." }
    ]
  },
  {
    slug: "standard-deviation-calculator",
    title: "Standard Deviation Solver",
    subtitle: "Analyze dataset variability and spread",
    description: "Compute population and sample standard deviation, variance, and mean for any numeric dataset.",
    category: "Statistics",
    type: "statistics",
    keywords: ["standard deviation", "variance", "statistical analysis", "data spread"],
    schema: {
      name: "CalcPro Statistics Visualizer",
      description: "Data analysis tool for calculating standard deviation and variance with frequency charts.",
      category: "StatisticsApplication"
    },
    faqs: [
      {
        question: "What is standard deviation?",
        answer: "Standard deviation is a measure of the amount of variation or dispersion of a set of values."
      }
    ],
    steps: [
      { title: "Input Dataset", content: "Paste your comma-separated or newline-separated numeric data." },
      { title: "Analyze Spread", content: "The engine computes mean and individual deviations instantly." }
    ]
  }
];
const $$splitComponentImporter = () => import("./solvers._slug-B-Q5SEKK.js");
const Route = createFileRoute("/solvers/$slug")({
  loader: ({
    params
  }) => {
    const data = solversData.find((s) => s.slug === params.slug);
    if (!data) throw notFound();
    return data;
  },
  head: ({
    loaderData
  }) => ({
    meta: [{
      title: `${loaderData.title} — CalcPro Premium`
    }, {
      name: "description",
      content: loaderData.description
    }, {
      name: "keywords",
      content: loaderData.keywords.join(", ")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TrigonometryRoute = Route$g.update({
  id: "/trigonometry",
  path: "/trigonometry",
  getParentRoute: () => Route$h
});
const StatisticsRoute = Route$f.update({
  id: "/statistics",
  path: "/statistics",
  getParentRoute: () => Route$h
});
const ScientificRoute = Route$e.update({
  id: "/scientific",
  path: "/scientific",
  getParentRoute: () => Route$h
});
const ProbabilityRoute = Route$d.update({
  id: "/probability",
  path: "/probability",
  getParentRoute: () => Route$h
});
const PercentageRoute = Route$c.update({
  id: "/percentage",
  path: "/percentage",
  getParentRoute: () => Route$h
});
const MatrixRoute = Route$b.update({
  id: "/matrix",
  path: "/matrix",
  getParentRoute: () => Route$h
});
const GrapherRoute = Route$a.update({
  id: "/grapher",
  path: "/grapher",
  getParentRoute: () => Route$h
});
const GeometryRoute = Route$9.update({
  id: "/geometry",
  path: "/geometry",
  getParentRoute: () => Route$h
});
const EquationsRoute = Route$8.update({
  id: "/equations",
  path: "/equations",
  getParentRoute: () => Route$h
});
const ConverterRoute = Route$7.update({
  id: "/converter",
  path: "/converter",
  getParentRoute: () => Route$h
});
const ContactRoute = Route$6.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$h
});
const CalculusRoute = Route$5.update({
  id: "/calculus",
  path: "/calculus",
  getParentRoute: () => Route$h
});
const CalculatorRoute = Route$4.update({
  id: "/calculator",
  path: "/calculator",
  getParentRoute: () => Route$h
});
const AlgebraRoute = Route$3.update({
  id: "/algebra",
  path: "/algebra",
  getParentRoute: () => Route$h
});
const AboutRoute = Route$2.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$h
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$h
});
const SolversSlugRoute = Route.update({
  id: "/solvers/$slug",
  path: "/solvers/$slug",
  getParentRoute: () => Route$h
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AlgebraRoute,
  CalculatorRoute,
  CalculusRoute,
  ContactRoute,
  ConverterRoute,
  EquationsRoute,
  GeometryRoute,
  GrapherRoute,
  MatrixRoute,
  PercentageRoute,
  ProbabilityRoute,
  ScientificRoute,
  StatisticsRoute,
  TrigonometryRoute,
  SolversSlugRoute
};
const routeTree = Route$h._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route as R,
  router as r
};
