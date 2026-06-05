import { createFileRoute } from '@tanstack/react-router'
import MatrixCalculator from '../components/MatrixCalculator'
import FAQSection from '../components/ui/FAQSection'

export const Route = createFileRoute('/matrix')({
  head: () => ({
    meta: [
      { title: 'Matrix Calculator — Multiply, Determinant & Inverse | TheCalcPro' },
      { name: 'description', content: 'Free online matrix calculator. Perform matrix addition, subtraction, multiplication, determinant calculation, and matrix inverse for 2×2 and 3×3 matrices with step-by-step solutions.' },
      { name: 'keywords', content: 'matrix calculator, matrix multiplication, determinant calculator, matrix inverse, 2x2 matrix, 3x3 matrix, linear algebra calculator' },
    ],
  }),
  component: MatrixPage,
})

const FAQS = [
  {
    q: 'What does the determinant of a matrix tell you?',
    a: 'The determinant is a scalar value that encodes several important properties of a square matrix. If the determinant is zero, the matrix is "singular" — it has no inverse, and the corresponding system of linear equations has either no solution or infinitely many solutions. If the determinant is non-zero, the matrix is invertible. Geometrically, the absolute value of the determinant represents the scaling factor of the linear transformation described by the matrix.',
  },
  {
    q: 'What is a singular matrix?',
    a: 'A singular matrix is a square matrix whose determinant equals zero. This means the matrix cannot be inverted, and any system of equations represented by it is either inconsistent (no solutions) or dependent (infinitely many solutions). Singular matrices map at least one non-zero vector to the zero vector, collapsing a dimension in the transformation.',
  },
  {
    q: 'Does the order of multiplication matter for matrices?',
    a: 'Yes. Matrix multiplication is not commutative — in general, A × B ≠ B × A. Furthermore, the multiplication A × B is only defined when the number of columns in A equals the number of rows in B. The result has the same number of rows as A and the same number of columns as B. Always verify the dimensions before multiplying.',
  },
  {
    q: 'What is the identity matrix?',
    a: 'The identity matrix (I) is a square matrix with 1s on the main diagonal and 0s everywhere else. It acts as the multiplicative identity for matrices: A × I = I × A = A for any compatible square matrix A. It is the matrix equivalent of the number 1 in scalar arithmetic and is used in solving systems of equations and computing inverses.',
  },
]

function MatrixPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a,
      },
    })),
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Matrix Calculator</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Work with matrices up to 3x3 for various mathematical operations.
        </p>
      </div>
      <MatrixCalculator />

      {/* SEO Content Article */}
      <article className="mt-16 space-y-6" style={{ color: 'var(--text-secondary)' }}>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Understanding Matrix Operations
        </h2>
        <p className="leading-relaxed">
          A matrix is a rectangular array of numbers arranged in rows and columns. Matrices are
          fundamental to linear algebra and have applications in computer graphics (transformations
          and rotations), physics (quantum mechanics, stress tensors), data science (machine learning
          weight matrices), and engineering (solving systems of simultaneous equations). TheCalcPro's
          matrix calculator supports addition, subtraction, multiplication, determinant calculation,
          and matrix inverse for 2×2 and 3×3 matrices.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Key Formulas
        </h3>
        <p className="leading-relaxed">
          For a <strong>2×2 matrix</strong> A = [[a, b], [c, d]]:
        </p>
        <div className="p-4 rounded-2xl font-mono text-sm space-y-1" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
          <p><strong>Determinant:</strong> det(A) = ad − bc</p>
          <p><strong>Inverse:</strong> A⁻¹ = (1/det(A)) × [[d, −b], [−c, a]]</p>
        </div>
        <p className="leading-relaxed">
          The determinant (<em>ad − bc</em>) must be non-zero for the inverse to exist. For 3×3 matrices,
          the determinant is computed by cofactor expansion (Laplace expansion), and the inverse uses the
          adjugate matrix divided by the determinant.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Step-by-Step Example: 2×2 Matrix Multiplication
        </h3>
        <p className="leading-relaxed">
          Multiply A = [[1, 2], [3, 4]] by B = [[5, 6], [7, 8]]:
        </p>
        <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
          <li><strong>Element (1,1):</strong> (1×5) + (2×7) = 5 + 14 = <strong>19</strong></li>
          <li><strong>Element (1,2):</strong> (1×6) + (2×8) = 6 + 16 = <strong>22</strong></li>
          <li><strong>Element (2,1):</strong> (3×5) + (4×7) = 15 + 28 = <strong>43</strong></li>
          <li><strong>Element (2,2):</strong> (3×6) + (4×8) = 18 + 32 = <strong>50</strong></li>
        </ol>
        <p className="leading-relaxed">
          Result: A × B = <strong>[[19, 22], [43, 50]]</strong>. Each element in the product is the
          dot product of the corresponding row from A and column from B. Note that B × A would produce
          a different result, [[23, 34], [31, 46]], demonstrating that matrix multiplication is not commutative.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Applications
        </h3>
        <p className="leading-relaxed">
          Matrices are used to solve systems of linear equations (Ax = b), perform geometric transformations
          (rotation, scaling, translation) in 2D and 3D graphics, represent Markov chains in probability,
          and train neural networks in machine learning. For equation solving, visit our
          <a href="/equations" className="text-amber hover:underline"> Equation Solver</a>. For statistical
          analysis, try the <a href="/statistics" className="text-amber hover:underline">Statistics Engine</a>.
        </p>
      </article>

      {/* FAQ Section */}
      <div className="mt-12">
        <FAQSection items={FAQS} title="Matrix Calculator FAQ" />
      </div>
    </div>
  )
}
