import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { matrix, add, multiply, det, inv, transpose } from "mathjs";
function MatrixCalculator() {
  const [size, setSize] = useState(2);
  const [matrixA, setMatrixA] = useState([[1, 2], [3, 4]]);
  const [matrixB, setMatrixB] = useState([[5, 6], [7, 8]]);
  const [result, setResult] = useState(null);
  const [op, setOp] = useState("multiply");
  const updateSize = (newSize) => {
    setSize(newSize);
    const newA = Array(newSize).fill(0).map(() => Array(newSize).fill(0));
    const newB = Array(newSize).fill(0).map(() => Array(newSize).fill(0));
    setMatrixA(newA);
    setMatrixB(newB);
    setResult(null);
  };
  const handleCompute = () => {
    try {
      const A = matrix(matrixA);
      const B = matrix(matrixB);
      let res;
      if (op === "add") res = add(A, B);
      else if (op === "multiply") res = multiply(A, B);
      else if (op === "detA") res = det(A);
      else if (op === "detB") res = det(B);
      else if (op === "invA") res = inv(A);
      else if (op === "transposeA") res = transpose(A);
      setResult(res);
    } catch (e) {
      setResult("Error");
    }
  };
  const renderMatrixInput = (m, setM) => /* @__PURE__ */ jsx("div", { className: `grid gap-2`, style: { gridTemplateColumns: `repeat(${size}, 1fr)` }, children: m.map((row, i) => row.map((val, j) => /* @__PURE__ */ jsx(
    "input",
    {
      type: "number",
      value: val,
      onChange: (e) => {
        const newM = [...m];
        newM[i][j] = Number(e.target.value);
        setM(newM);
      },
      className: "w-full h-12 text-center rounded-lg font-mono",
      style: { background: "var(--bg-display)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" }
    },
    `${i}-${j}`
  ))) });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl p-5", style: { background: "var(--bg-surface)", border: "1px solid var(--border)" }, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: [2, 3, 4].map((s) => /* @__PURE__ */ jsxs("button", { onClick: () => updateSize(s), className: `w-8 h-8 rounded-lg text-xs font-bold ${size === s ? "bg-amber text-[#1a0f00]" : "bg-surface-3 text-secondary"}`, style: { background: size === s ? "var(--amber)" : "var(--bg-surface-3)", color: size === s ? "#1a0f00" : "var(--text-secondary)" }, children: [
          s,
          "x",
          s
        ] }, s)) }),
        /* @__PURE__ */ jsxs("select", { value: op, onChange: (e) => setOp(e.target.value), className: "px-3 py-1.5 rounded-lg text-sm bg-surface-3 outline-none", style: { background: "var(--bg-surface-3)", color: "var(--text-primary)" }, children: [
          /* @__PURE__ */ jsx("option", { value: "multiply", children: "A × B" }),
          /* @__PURE__ */ jsx("option", { value: "add", children: "A + B" }),
          /* @__PURE__ */ jsx("option", { value: "detA", children: "Determinant(A)" }),
          /* @__PURE__ */ jsx("option", { value: "transposeA", children: "Transpose(A)" }),
          /* @__PURE__ */ jsx("option", { value: "invA", children: "Inverse(A)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[10px] uppercase tracking-widest text-muted mb-2 text-center", children: "Matrix A" }),
          renderMatrixInput(matrixA, setMatrixA)
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[10px] uppercase tracking-widest text-muted mb-2 text-center", children: "Matrix B" }),
          renderMatrixInput(matrixB, setMatrixB)
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: handleCompute, className: "amber-btn mt-6 w-full", children: "Compute Matrix →" })
    ] }),
    result && /* @__PURE__ */ jsxs("div", { className: "rounded-2xl p-6", style: { background: "var(--bg-surface)", border: "1px solid var(--border)" }, children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-semibold uppercase tracking-widest mb-4", style: { color: "var(--text-muted)" }, children: "Result" }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: typeof result === "number" ? /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold font-mono", style: { color: "var(--amber)" }, children: parseFloat(result.toPrecision(8)) }) : result === "Error" ? /* @__PURE__ */ jsx("div", { className: "text-red-400 font-mono", children: "Error: Invalid Matrix Operation" }) : /* @__PURE__ */ jsx("div", { className: "grid gap-2", style: { gridTemplateColumns: `repeat(${result.size()[1]}, 1fr)` }, children: result.toArray().map((row, i) => row.map((val, j) => /* @__PURE__ */ jsx("div", { className: "w-16 h-12 flex items-center justify-center rounded-lg font-mono text-sm", style: { background: "var(--bg-surface-3)", color: "var(--amber)" }, children: typeof val === "number" ? parseFloat(val.toPrecision(4)) : val }, `${i}-${j}`))) }) })
    ] })
  ] });
}
function MatrixPage() {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 py-10 animate-fade-in", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-2", style: {
        color: "var(--text-primary)"
      }, children: "Matrix Calculator" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", style: {
        color: "var(--text-secondary)"
      }, children: "Work with matrices up to 3x3 for various mathematical operations." })
    ] }),
    /* @__PURE__ */ jsx(MatrixCalculator, {})
  ] });
}
export {
  MatrixPage as component
};
