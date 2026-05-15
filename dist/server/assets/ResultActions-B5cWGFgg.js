import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useCallback } from "react";
import { Check, AlertCircle, Copy, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
function ResultActions({ latex, result, className = "" }) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [error, setError] = useState(false);
  const copyToClipboard = useCallback(async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.error("Clipboard API failed:", err);
      }
    }
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      console.error("Fallback clipboard failed:", err);
      return false;
    }
  }, []);
  const handleCopy = async () => {
    if (!latex) return;
    const success = await copyToClipboard(latex);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2e3);
    }
  };
  const handleShare = async () => {
    const shareData = {
      title: "CalcPro Result",
      text: `Calculated with CalcPro: ${result}`,
      url: window.location.href
    };
    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        setShared(true);
        setTimeout(() => setShared(false), 2e3);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Share failed:", err);
        }
      }
    } else {
      const success = await copyToClipboard(window.location.href);
      if (success) {
        setShared(true);
        setTimeout(() => setShared(false), 2e3);
      }
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-2 ${className}`, children: [
    /* @__PURE__ */ jsxs(
      motion.button,
      {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        onClick: handleCopy,
        className: `p-2.5 rounded-xl glass border border-white/5 transition-all relative group ${copied ? "text-green-400" : "text-muted hover:text-amber"}`,
        title: "Copy LaTeX",
        children: [
          /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: copied ? /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { scale: 0.5, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              exit: { scale: 0.5, opacity: 0 },
              children: /* @__PURE__ */ jsx(Check, { size: 14, strokeWidth: 3 })
            },
            "check"
          ) : error ? /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { scale: 0.5, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              exit: { scale: 0.5, opacity: 0 },
              children: /* @__PURE__ */ jsx(AlertCircle, { size: 14, className: "text-red-400" })
            },
            "error"
          ) : /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { scale: 0.5, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              exit: { scale: 0.5, opacity: 0 },
              children: /* @__PURE__ */ jsx(Copy, { size: 14 })
            },
            "copy"
          ) }),
          /* @__PURE__ */ jsx("span", { className: "absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl border border-white/10", children: copied ? "Copied LaTeX!" : error ? "Copy Failed" : "Copy LaTeX" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.button,
      {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        onClick: handleShare,
        className: `p-2.5 rounded-xl glass border border-white/5 transition-all relative group ${shared ? "text-green-400" : "text-muted hover:text-amber"}`,
        title: "Share Result",
        children: [
          /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: shared ? /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { scale: 0.5, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              exit: { scale: 0.5, opacity: 0 },
              children: /* @__PURE__ */ jsx(Check, { size: 14, strokeWidth: 3 })
            },
            "check-share"
          ) : /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { scale: 0.5, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              exit: { scale: 0.5, opacity: 0 },
              children: /* @__PURE__ */ jsx(Share2, { size: 14 })
            },
            "share"
          ) }),
          /* @__PURE__ */ jsx("span", { className: "absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl border border-white/10", children: shared ? "Link Shared!" : "Share Result" })
        ]
      }
    )
  ] });
}
export {
  ResultActions as R
};
