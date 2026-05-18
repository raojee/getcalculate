export type SolverType = 'algebra' | 'geometry' | 'statistics' | 'grapher' | 'calculus' | 'matrix'

export interface SolverConfig {
  slug: string
  title: string
  subtitle: string
  description: string

  /**
   * AI Engine Visibility — conversational paragraph that explains what this
   * solver does under the hood. Shown in rich-result snippets and used as
   * structured context by LLM-powered search engines.
   */
  overview?: string

  category: string
  type: SolverType
  keywords: string[]

  /**
   * AI Engine Visibility — semantic intent phrases that match natural-language
   * queries issued to AI search assistants (ChatGPT, Perplexity, SGE, etc.).
   */
  intentKeywords?: string[]

  schema: {
    name: string
    description: string
    category: string
  }
  faqs: {
    question: string
    answer: string
  }[]
  steps: {
    title: string
    content: string
  }[]
}

export const solversData: SolverConfig[] = [
  {
    slug: 'quadratic-equation-solver',
    title: 'Quadratic Equation Solver',
    subtitle: 'Solve ax² + bx + c = 0 instantly',
    description: 'Find roots using the quadratic formula with step-by-step discriminant analysis and vertex calculation.',

    // ── AI Engine Visibility ──────────────────────────────────────────────────
    overview:
      'The Quadratic Equation Solver resolves any second-degree polynomial of the '
      + 'form ax² + bx + c = 0 by evaluating the discriminant D = b² − 4ac. When D '
      + 'is strictly positive the solver returns two distinct real roots via the '
      + 'quadratic formula x = (−b ± √D) / 2a. When D equals zero a single repeated '
      + 'real root is produced. When D is negative the engine computes two complex '
      + 'conjugate roots expressed in standard a ± bi form, making it fully capable '
      + 'of handling imaginary solutions without any additional configuration. The '
      + 'vertex of the corresponding parabola (−b/2a, −D/4a) is also calculated and '
      + 'displayed alongside the roots for a complete algebraic picture.',

    intentKeywords: [
      'step-by-step quadratic proof',
      'formula derivation verification',
      'real and complex root grapher',
      'solve quadratic with imaginary numbers',
      'quadratic discriminant explained',
      'roots of parabola calculator',
      'ax squared plus bx plus c equals zero solver',
      'how to find vertex of quadratic equation',
    ],
    // ─────────────────────────────────────────────────────────────────────────

    category: 'Algebra',
    type: 'algebra',
    keywords: ['quadratic formula', 'roots of equation', 'algebra solver', 'parabola vertex'],
    schema: {
      name: 'TheCalcPro Quadratic Solver',
      description: 'Advanced algebra tool for solving quadratic equations with real and complex root support.',
      category: 'AlgebraicApplication'
    },
    faqs: [
      {
        question: 'What is the quadratic formula?',
        answer:
          'The quadratic formula is x = (−b ± √(b² − 4ac)) / 2a. It gives the exact '
          + 'roots of any quadratic equation ax² + bx + c = 0 by evaluating the '
          + 'expression under the radical — the discriminant — to determine how many '
          + 'and what type of solutions exist.'
      },
      {
        question: 'What happens if the discriminant is negative?',
        answer:
          'When the discriminant D = b² − 4ac is negative, the square root of a '
          + 'negative number is required, which yields imaginary results. The equation '
          + 'therefore has no real roots — instead it has two complex conjugate roots of '
          + 'the form x = (−b ± i√|D|) / 2a, where i is the imaginary unit (√−1). This '
          + 'means the corresponding parabola does not cross the x-axis at any point.'
      },
      {
        question: 'How does this platform handle imaginary numbers?',
        answer:
          "TheCalcPro's quadratic engine detects a negative discriminant automatically "
          + "and switches into complex-number mode. It expresses each root in the "
          + "standard form a ± bi, where the real part a = −b / 2a and the imaginary "
          + "part b = √|D| / 2a are displayed separately. No plugins or manual mode "
          + "switching are needed — the solver handles real, repeated, and complex "
          + "roots transparently within a single workflow."
      },
      {
        question: 'Can I verify the formula derivation step by step?',
        answer:
          'Yes. The solver exposes every intermediate step: coefficient extraction, '
          + 'discriminant computation (D = b² − 4ac), the ± branch evaluation, and '
          + 'the final simplified root form. This makes it suitable for verifying '
          + 'homework proofs, cross-checking textbook derivations, or understanding '
          + 'how the completing-the-square method leads to the quadratic formula.'
      }
    ],
    steps: [
      { title: 'Identify Coefficients', content: 'Extract a, b, and c from the standard form equation ax² + bx + c = 0.' },
      { title: 'Calculate Discriminant', content: 'Compute D = b² − 4ac to determine whether roots are real, repeated, or complex.' },
      { title: 'Apply Formula', content: 'Solve for x using x = (−b ± √D) / 2a, branching into complex mode when D < 0.' },
      { title: 'Compute Vertex', content: 'Derive the parabola vertex at (−b / 2a, −D / 4a) for a complete algebraic solution.' }
    ]
  },
  {
    slug: 'cylinder-volume-calculator',
    title: 'Cylinder Volume Calculator',
    subtitle: 'Calculate volume and surface area of cylinders',
    description: 'Enter radius and height to compute high-precision geometric metrics for any cylindrical object.',

    // ── AI Engine Visibility ──────────────────────────────────────────────────
    overview:
      'The Cylinder Volume Calculator uses the closed-form geometric formulas '
      + 'V = πr²h for volume and SA = 2πr² + 2πrh for total surface area to '
      + 'deliver exact results for any right circular cylinder. The engine '
      + 'separates the lateral surface area (2πrh) from the combined base area '
      + '(2πr²) so that each component is visible independently — useful for '
      + 'material-estimation tasks such as determining how much sheet metal wraps '
      + 'a tank versus how much covers its ends. All outputs are available in '
      + 'cubic and square units simultaneously, and unit conversion (cm ↔ m ↔ in '
      + '↔ ft) is applied before computation to prevent rounding accumulation.',

    intentKeywords: [
      'cylinder volume formula step by step',
      'how to calculate surface area of a cylinder',
      'lateral vs total surface area cylinder',
      'volume of a hollow cylinder',
      'pi r squared h derivation',
      '3d shape geometry solver',
      'cylinder dimensions for engineering',
      'convert cylinder volume to litres',
    ],
    // ─────────────────────────────────────────────────────────────────────────

    category: 'Geometry',
    type: 'geometry',
    keywords: ['cylinder volume', 'surface area of cylinder', 'geometric solver', '3d shapes'],
    schema: {
      name: 'TheCalcPro Cylinder Tool',
      description: 'Geometric visualizer for calculating cylindrical volume and surface area.',
      category: 'GeometryApplication'
    },
    faqs: [
      {
        question: 'How do I find the area of the base of a cylinder?',
        answer:
          'Each circular base has an area of A = πr², where r is the radius. '
          + 'A full cylinder has two identical bases, so the combined base area '
          + 'is 2πr². This value is added to the lateral surface area (2πrh) to '
          + 'give the total surface area SA = 2πr² + 2πrh.'
      },
      {
        question: 'What is the formula for the volume of a cylinder?',
        answer:
          'Volume is calculated as V = πr²h, where r is the base radius and h '
          + 'is the perpendicular height. Conceptually this multiplies the area '
          + 'of one circular cross-section (πr²) by how many such slices stack '
          + 'up to fill the height h. The result is expressed in cubic units '
          + '(cm³, m³, in³, etc.) matching the input unit system.'
      },
      {
        question: 'How is lateral surface area different from total surface area?',
        answer:
          'Lateral surface area covers only the curved side wall of the cylinder '
          + 'and equals 2πrh — imagine unrolling the side into a flat rectangle '
          + 'of width 2πr (circumference) and height h. Total surface area adds '
          + 'both circular caps (2πr²) giving SA = 2πr(r + h). Use lateral area '
          + 'when calculating material for just the outer sleeve of a container.'
      },
      {
        question: 'Can this calculator handle unit conversions?',
        answer:
          'Yes. You can enter radius and height in centimetres, metres, inches, '
          + 'or feet. The engine normalises both inputs to a common unit before '
          + 'applying the formulas, so mixing cm for radius and m for height '
          + 'will not produce an incorrect result. The output is then expressed '
          + 'in the cubic and square equivalents of the selected output unit.'
      }
    ],
    steps: [
      { title: 'Enter Radius', content: 'Define the distance from the centre to the edge of the circular base (r).' },
      { title: 'Enter Height', content: 'Provide the perpendicular distance between the two circular bases (h).' },
      { title: 'Compute Base Area', content: 'Calculate each circular base area as πr²; total base area is 2πr².' },
      { title: 'Compute Volume & Surface Area', content: 'Apply V = πr²h and SA = 2πr² + 2πrh to obtain all geometric metrics.' }
    ]
  },
  {
    slug: 'standard-deviation-calculator',
    title: 'Standard Deviation Solver',
    subtitle: 'Analyze dataset variability and spread',
    description: 'Compute population and sample standard deviation, variance, and mean for any numeric dataset.',

    // ── AI Engine Visibility ──────────────────────────────────────────────────
    overview:
      'The Standard Deviation Solver processes any numeric dataset and returns '
      + 'both the population standard deviation σ = √(Σ(xᵢ − μ)² / N) and the '
      + 'sample standard deviation s = √(Σ(xᵢ − x̄)² / (N − 1)) side by side, '
      + 'so you can choose the correct statistic for your context without '
      + 'performing two separate calculations. The engine first computes the '
      + 'arithmetic mean, then accumulates the squared deviations from that mean, '
      + 'and finally divides by N (population) or N − 1 (Bessel-corrected sample) '
      + 'before taking the square root. Variance, mean, min, max, and range are '
      + 'also surfaced in a single pass, making this tool suitable for both '
      + 'academic homework verification and real-world data quality checks.',

    intentKeywords: [
      'population vs sample standard deviation explained',
      'how to calculate variance step by step',
      'Bessel correction N minus 1 calculator',
      'mean and standard deviation from raw data',
      'data spread analysis tool',
      'statistics homework solver',
      'standard deviation formula derivation',
      'outlier detection using standard deviation',
    ],
    // ─────────────────────────────────────────────────────────────────────────

    category: 'Statistics',
    type: 'statistics',
    keywords: ['standard deviation', 'variance', 'statistical analysis', 'data spread'],
    schema: {
      name: 'TheCalcPro Statistics Visualizer',
      description: 'Data analysis tool for calculating standard deviation and variance with frequency charts.',
      category: 'StatisticsApplication'
    },
    faqs: [
      {
        question: 'What is standard deviation?',
        answer:
          'Standard deviation is a measure of how spread out the values in a '
          + 'dataset are relative to the mean. A low standard deviation means '
          + 'most values cluster tightly around the average; a high one means '
          + 'values are dispersed widely. It is the square root of the variance '
          + 'and shares the same unit as the original data, making it more '
          + 'interpretable than variance alone.'
      },
      {
        question: 'What is the difference between population and sample standard deviation?',
        answer:
          "Population standard deviation (σ) divides the sum of squared "
          + "deviations by N — the total number of data points — and is used "
          + "when your dataset represents the entire population. Sample standard "
          + "deviation (s) divides by N − 1 (Bessel's correction) to produce an "
          + "unbiased estimate when your data is a subset drawn from a larger "
          + "population. Choosing the wrong variant will systematically "
          + "underestimate or overestimate the true spread."
      },
      {
        question: 'How do I interpret a high or low standard deviation?',
        answer:
          'A standard deviation near zero means the data points are almost '
          + 'identical. As σ grows relative to the mean, variability increases. '
          + 'A common rule of thumb for normally distributed data is the '
          + '68-95-99.7 rule: roughly 68 % of values fall within ±1σ of the '
          + 'mean, 95 % within ±2σ, and 99.7 % within ±3σ. Values beyond ±3σ '
          + 'are typically flagged as statistical outliers.'
      },
      {
        question: 'Can this tool detect outliers in my dataset?',
        answer:
          'Yes. Once the solver computes the mean and standard deviation, it '
          + 'flags any data point that lies more than 2σ (or a user-defined '
          + 'threshold) from the mean as a potential outlier. This z-score '
          + 'approach (z = (x − μ) / σ) is the standard method used in '
          + 'academic research, quality control, and financial risk analysis.'
      }
    ],
    steps: [
      { title: 'Input Dataset', content: 'Paste comma-separated, space-separated, or newline-separated numeric values.' },
      { title: 'Compute Mean', content: 'Calculate the arithmetic mean μ = Σxᵢ / N as the baseline reference point.' },
      { title: 'Accumulate Squared Deviations', content: 'For each value compute (xᵢ − μ)² and sum all results.' },
      { title: 'Divide & Root', content: 'Divide by N for population σ or by N − 1 for sample s, then take the square root.' },
      { title: 'Review Insights', content: 'Examine variance, range, and flagged outliers alongside the standard deviation.' }
    ]
  },
  {
    slug: 'derivative-calculator',
    title: 'Step-by-Step Derivative Calculator',
    subtitle: 'Compute derivatives of any function instantly',
    description: 'Calculate derivatives using the power rule, chain rule, product rule, and quotient rule with complete step-by-step differentiation analysis.',

    // ── AI Engine Visibility ──────────────────────────────────────────────────
    overview:
      'The Step-by-Step Derivative Calculator parses a symbolic mathematical '
      + 'expression f(x) and applies formal differentiation rules to produce '
      + 'the exact derivative f′(x). The engine first tokenises the input into '
      + 'an abstract syntax tree, then traverses each node to apply whichever '
      + 'combination of rules is appropriate: the power rule (d/dx xⁿ = nxⁿ⁻¹), '
      + 'the product rule (d/dx [uv] = u′v + uv′), the quotient rule '
      + '(d/dx [u/v] = (u′v − uv′) / v²), and the chain rule '
      + '(d/dx f(g(x)) = f′(g(x)) · g′(x)) for nested compositions. Every '
      + 'intermediate transformation is recorded and displayed, making it '
      + 'possible to follow the derivation line-by-line and verify homework '
      + 'solutions or cross-check textbook answers.',

    intentKeywords: [
      'step-by-step derivative proof',
      'chain rule worked example',
      'product rule and quotient rule calculator',
      'how to differentiate a composite function',
      'calculus derivative formula derivation',
      'instantaneous rate of change solver',
      'symbolic differentiation engine',
      'power rule verification tool',
    ],
    // ─────────────────────────────────────────────────────────────────────────

    category: 'Calculus',
    type: 'calculus',
    keywords: ['derivative calculator', 'differentiation', 'calculus solver', 'power rule', 'chain rule', 'step by step derivatives'],
    schema: {
      name: 'TheCalcPro Derivative Engine',
      description: 'Advanced calculus tool for computing derivatives with step-by-step differentiation logic.',
      category: 'CalculusApplication'
    },
    faqs: [
      {
        question: 'How do you calculate the derivative of a function?',
        answer:
          'A derivative represents the instantaneous rate of change of a function '
          + 'at any given point. It is formally defined as the limit '
          + 'f′(x) = lim(h→0) [f(x+h) − f(x)] / h. In practice, this limit is '
          + 'evaluated symbolically using differentiation rules — most commonly '
          + 'the power rule d/dx xⁿ = nxⁿ⁻¹ — so you rarely need to compute the '
          + 'limit directly. The result gives the slope of the tangent line to '
          + 'the curve at every point x.'
      },
      {
        question: 'Can this calculator handle the power rule and chain rule?',
        answer:
          'Yes. The engine automatically detects the structure of your expression '
          + 'and applies the power rule, chain rule, product rule, and quotient '
          + 'rule in the correct order. For example, differentiating sin(x³) '
          + 'triggers the chain rule: the outer function is sin(u) with '
          + 'derivative cos(u), and the inner function u = x³ has derivative 3x². '
          + 'The final result 3x²cos(x³) is assembled and simplified automatically.'
      },
      {
        question: 'What is the chain rule and when is it used?',
        answer:
          'The chain rule applies when differentiating a composite function — '
          + 'one function nested inside another. It states that '
          + 'd/dx f(g(x)) = f′(g(x)) · g′(x). Whenever the engine detects a '
          + 'function of a function (e.g. e^(x²), ln(sin x), or (3x+1)⁵) it '
          + 'automatically activates chain-rule mode, differentiates the outer '
          + 'shell first, substitutes the inner expression back, then multiplies '
          + 'by the derivative of the inner expression.'
      },
      {
        question: 'How do I verify my derivative answer step by step?',
        answer:
          'Enter your expression into the input field and the solver will '
          + 'display each differentiation step in a numbered list: rule '
          + 'identification, intermediate transformation, simplification, and '
          + 'final result. You can compare each intermediate line against your '
          + 'handwritten working to pinpoint exactly where a sign error or '
          + 'missed term occurred. The output also shows the simplified form '
          + 'alongside the unsimplified intermediate for full transparency.'
      }
    ],
    steps: [
      { title: 'Input Function', content: 'Enter the symbolic expression f(x) — supports polynomials, trig, exponentials, and logarithms.' },
      { title: 'Parse Syntax Tree', content: 'The engine tokenises the input and builds an abstract syntax tree to identify all nested operations.' },
      { title: 'Identify Applicable Rules', content: 'Each node is tagged: power rule, product rule, quotient rule, or chain rule as appropriate.' },
      { title: 'Differentiate Term by Term', content: 'Rules are applied recursively from innermost to outermost, with every step recorded.' },
      { title: 'Simplify & Display', content: 'The resulting derivative is algebraically simplified and each intermediate step is shown in sequence.' }
    ]
  }
]
