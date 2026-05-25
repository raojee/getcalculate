export type SolverType = 'algebra' | 'geometry' | 'statistics' | 'grapher' | 'calculus' | 'matrix' | 'utility'

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
  },
  {
    slug: 'triangle-area-calculator',
    title: 'Triangle Area Calculator',
    subtitle: 'Compute triangle area from base, height, or all three sides',
    description: 'Calculate the area of any triangle using base-height, Heron\'s formula, or trigonometric methods with full step-by-step working.',
    overview: 'The Triangle Area Calculator supports three input modes: the classic ½ × base × height formula, Heron\'s formula (Area = √(s(s−a)(s−b)(s−c)) where s is the semi-perimeter), and the trigonometric method (½ab·sin C) for SAS triangles. The engine detects which method applies based on your inputs and shows every intermediate calculation including the semi-perimeter, squared radical expression, and final square root.',
    intentKeywords: ['triangle area formula step by step', 'heron formula calculator', 'area of triangle with 3 sides', 'SAS triangle area trig method'],
    category: 'Geometry',
    type: 'geometry',
    keywords: ['triangle area', 'heron formula', 'geometry calculator', 'area of triangle'],
    schema: { name: 'TheCalcPro Triangle Area Tool', description: 'Multi-method triangle area calculator with Heron\'s formula and trig support.', category: 'GeometryApplication' },
    faqs: [
      { question: 'How do you find the area of a triangle with three sides?', answer: 'Use Heron\'s formula. First compute the semi-perimeter s = (a+b+c)/2, then Area = √(s(s−a)(s−b)(s−c)). This works for any triangle when you know all three side lengths but not the height.' },
      { question: 'What is the easiest triangle area formula?', answer: 'The simplest is Area = ½ × base × height. You need the base length and the perpendicular height from that base to the opposite vertex. If those two values are known, no trigonometry or Heron\'s formula is required.' }
    ],
    steps: [
      { title: 'Choose Input Mode', content: 'Select base-height, three sides (Heron), or two sides with included angle (SAS).' },
      { title: 'Compute Semi-perimeter', content: 'For Heron\'s method: s = (a + b + c) / 2.' },
      { title: 'Apply Formula', content: 'Evaluate the selected formula and simplify to get area in square units.' }
    ]
  },
  {
    slug: 'sphere-volume-calculator',
    title: 'Sphere Volume Calculator',
    subtitle: 'Volume and surface area of any sphere',
    description: 'Enter the radius to instantly compute sphere volume (4/3 πr³) and surface area (4πr²) with unit conversion support.',
    overview: 'The Sphere Volume Calculator applies the exact closed-form formulas V = (4/3)πr³ and SA = 4πr² derived from integral calculus. Both the volume and surface area are displayed simultaneously, along with the diameter and circumference of a great circle, giving a complete geometric profile from a single radius input.',
    intentKeywords: ['sphere volume formula derivation', '4/3 pi r cubed calculator', 'surface area of a sphere step by step', 'volume of ball geometry'],
    category: 'Geometry',
    type: 'geometry',
    keywords: ['sphere volume', 'surface area sphere', '3d geometry', 'ball volume calculator'],
    schema: { name: 'TheCalcPro Sphere Tool', description: 'Precise sphere volume and surface area calculator with full formula display.', category: 'GeometryApplication' },
    faqs: [
      { question: 'What is the formula for the volume of a sphere?', answer: 'Volume = (4/3)πr³ where r is the radius. This formula is derived by integrating the area of circular cross-sections from −r to +r using the disk method in calculus.' },
      { question: 'How is surface area of a sphere calculated?', answer: 'Surface area = 4πr². This equals exactly four times the area of a great circle (πr²), a relationship first proved by Archimedes and still used in modern physics and engineering.' }
    ],
    steps: [
      { title: 'Enter Radius', content: 'Input r in your preferred unit (cm, m, in, ft).' },
      { title: 'Compute Volume', content: 'Apply V = (4/3)πr³ using full floating-point precision.' },
      { title: 'Compute Surface Area', content: 'Apply SA = 4πr² and display alongside diameter = 2r.' }
    ]
  },
  {
    slug: 'cone-volume-calculator',
    title: 'Cone Volume Calculator',
    subtitle: 'Volume, slant height, and surface area of cones',
    description: 'Calculate the volume, lateral surface area, and slant height of any right circular cone from radius and height.',
    overview: 'The Cone Volume Calculator computes V = (1/3)πr²h, lateral surface area L = πrl where l = √(r²+h²) is the slant height, and total surface area SA = πr(r+l). All three geometric properties are shown together with the intermediate slant-height calculation so engineers and students can verify every dimension.',
    intentKeywords: ['cone volume formula step by step', 'slant height of cone calculator', 'lateral surface area cone', 'right circular cone geometry'],
    category: 'Geometry',
    type: 'geometry',
    keywords: ['cone volume', 'slant height', 'surface area cone', 'geometry solver'],
    schema: { name: 'TheCalcPro Cone Calculator', description: 'Geometric tool for cone volume, slant height, and surface area.', category: 'GeometryApplication' },
    faqs: [
      { question: 'How do you calculate the volume of a cone?', answer: 'Volume = (1/3)πr²h. A cone holds exactly one-third the volume of a cylinder with the same base radius and height, which is why the 1/3 factor appears in the formula.' },
      { question: 'What is slant height and how is it found?', answer: 'Slant height l is the distance from the apex to any point on the base circumference, measured along the lateral surface. It is found using the Pythagorean theorem: l = √(r² + h²).' }
    ],
    steps: [
      { title: 'Enter Radius & Height', content: 'Provide the base radius r and vertical height h.' },
      { title: 'Compute Slant Height', content: 'Calculate l = √(r² + h²) as the lateral edge length.' },
      { title: 'Apply Volume & Area Formulas', content: 'Evaluate V = (1/3)πr²h, L = πrl, and SA = πr(r + l).' }
    ]
  },
  {
    slug: 'sector-area-calculator',
    title: 'Sector Area Calculator',
    subtitle: 'Area and arc length of any circle sector',
    description: 'Compute the area of a sector and its arc length from radius and central angle in degrees or radians.',
    overview: 'The Sector Area Calculator uses A = (θ/2)r² (radians) or A = (θ/360)πr² (degrees) to find the sector area, and arc length s = rθ (radians) or s = (θ/360)2πr (degrees). The engine auto-detects or allows you to specify the angle unit, converts internally, and shows both the sector area and the chord length connecting the two radii.',
    intentKeywords: ['sector area formula degrees and radians', 'arc length calculator circle', 'area of pie slice geometry', 'central angle sector calculator'],
    category: 'Geometry',
    type: 'geometry',
    keywords: ['sector area', 'arc length', 'circle geometry', 'central angle calculator'],
    schema: { name: 'TheCalcPro Sector Tool', description: 'Sector area and arc length calculator supporting degrees and radians.', category: 'GeometryApplication' },
    faqs: [
      { question: 'How do you find the area of a sector?', answer: 'In radians: A = ½r²θ. In degrees: A = (θ/360)πr². Both formulas express what fraction of the full circle the sector represents, then multiply by the full circle area πr².' },
      { question: 'What is the difference between sector area and segment area?', answer: 'A sector is the pie-slice region bounded by two radii and the arc. A segment is the region between a chord and the arc. Segment area = Sector area − Triangle area of the triangle formed by the two radii and the chord.' }
    ],
    steps: [
      { title: 'Enter Radius & Angle', content: 'Provide radius r and central angle θ in degrees or radians.' },
      { title: 'Convert Angle Units', content: 'Internally normalise to radians for calculation: θ_rad = θ_deg × π/180.' },
      { title: 'Compute Area & Arc', content: 'Apply A = ½r²θ and s = rθ, then display chord length and sector perimeter.' }
    ]
  },
  {
    slug: 'z-score-calculator',
    title: 'Z-Score Calculator',
    subtitle: 'Standardise any data point against its distribution',
    description: 'Calculate the z-score, percentile rank, and probability for any value given the population mean and standard deviation.',
    overview: 'The Z-Score Calculator computes z = (x − μ) / σ, where x is the observed value, μ is the population mean, and σ is the standard deviation. The resulting z-score expresses how many standard deviations the value lies above or below the mean. The engine then maps z to a cumulative probability using the standard normal distribution, returning the one-tail and two-tail p-values alongside the percentile rank.',
    intentKeywords: ['z score formula calculator step by step', 'standardise data point statistics', 'z score to percentile converter', 'how many standard deviations from mean'],
    category: 'Statistics',
    type: 'statistics',
    keywords: ['z-score', 'standard score', 'normal distribution', 'percentile calculator'],
    schema: { name: 'TheCalcPro Z-Score Engine', description: 'Statistical tool for computing z-scores and mapping them to probabilities.', category: 'StatisticsApplication' },
    faqs: [
      { question: 'What does a z-score of 2 mean?', answer: 'A z-score of 2 means the data point is exactly 2 standard deviations above the mean. In a standard normal distribution, approximately 97.7% of values fall below this point, placing it in roughly the 97.7th percentile.' },
      { question: 'How is z-score used to find probability?', answer: 'After computing z = (x−μ)/σ, you look up (or compute) the cumulative distribution function Φ(z) of the standard normal distribution. Φ(z) gives the probability that a randomly selected value from the distribution is less than or equal to x.' }
    ],
    steps: [
      { title: 'Enter Value, Mean & SD', content: 'Provide the observed value x, population mean μ, and standard deviation σ.' },
      { title: 'Compute Z-Score', content: 'Apply z = (x − μ) / σ to standardise the observation.' },
      { title: 'Map to Probability', content: 'Use the standard normal CDF to find the one-tail p-value and percentile rank.' }
    ]
  },
  {
    slug: 'confidence-interval-calculator',
    title: 'Confidence Interval Calculator',
    subtitle: 'Compute 90%, 95%, or 99% confidence intervals',
    description: 'Enter sample mean, standard deviation, and sample size to get the confidence interval for any significance level.',
    overview: 'The Confidence Interval Calculator builds the interval x̄ ± z*(σ/√n) for known population SD or x̄ ± t*(s/√n) using the t-distribution when SD is estimated from the sample. It automatically selects the correct critical value (z* or t*) based on whether population σ is known and the chosen confidence level, and displays the margin of error, lower bound, and upper bound explicitly.',
    intentKeywords: ['95% confidence interval formula calculator', 'margin of error statistics', 't distribution vs z distribution interval', 'sample size confidence interval calculator'],
    category: 'Statistics',
    type: 'statistics',
    keywords: ['confidence interval', 'margin of error', 'statistical inference', 't-distribution'],
    schema: { name: 'TheCalcPro Confidence Interval Tool', description: 'Statistical calculator for constructing confidence intervals with z or t critical values.', category: 'StatisticsApplication' },
    faqs: [
      { question: 'What is a 95% confidence interval?', answer: 'A 95% confidence interval means that if you repeated the sampling process 100 times, approximately 95 of the resulting intervals would contain the true population parameter. It does NOT mean there is a 95% probability the parameter falls in this specific interval.' },
      { question: 'When should I use a t-distribution instead of z?', answer: 'Use the t-distribution when the population standard deviation σ is unknown and you are estimating it from the sample (using s). The t-distribution has heavier tails, producing wider intervals that account for the additional uncertainty from estimating σ.' }
    ],
    steps: [
      { title: 'Enter Sample Statistics', content: 'Provide sample mean x̄, standard deviation (σ or s), and sample size n.' },
      { title: 'Select Confidence Level', content: 'Choose 90%, 95%, or 99% to determine the critical value z* or t*.' },
      { title: 'Compute Interval', content: 'Calculate margin of error E = critical value × (SD/√n), then output [x̄−E, x̄+E].' }
    ]
  },
  {
    slug: 'linear-equation-solver',
    title: 'Linear Equation Solver',
    subtitle: 'Solve any single-variable linear equation',
    description: 'Solve equations of the form ax + b = c step by step, with support for fractions, decimals, and negative coefficients.',
    overview: 'The Linear Equation Solver isolates the unknown variable by applying inverse operations in the correct algebraic order: combining like terms on each side, moving constant terms via addition/subtraction, and finally dividing by the leading coefficient. Each transformation is displayed as a numbered step, making it ideal for verifying algebra homework or learning the mechanics of equation solving.',
    intentKeywords: ['solve linear equation step by step', 'isolate variable algebra calculator', 'ax plus b equals c solver', 'one variable equation solver'],
    category: 'Algebra',
    type: 'algebra',
    keywords: ['linear equation', 'algebra solver', 'one variable equation', 'equation calculator'],
    schema: { name: 'TheCalcPro Linear Equation Solver', description: 'Step-by-step solver for single-variable linear equations.', category: 'AlgebraicApplication' },
    faqs: [
      { question: 'How do you solve a linear equation step by step?', answer: 'First, distribute and combine like terms on each side. Then move all variable terms to one side and constants to the other using addition or subtraction. Finally, divide both sides by the coefficient of the variable to isolate x.' },
      { question: 'Can this solver handle equations with fractions?', answer: 'Yes. When fractional coefficients are detected, the engine multiplies every term by the least common denominator to clear the fractions before solving, then converts the answer back to a fraction or decimal as needed.' }
    ],
    steps: [
      { title: 'Parse Equation', content: 'Identify all terms on both sides and detect the variable, constants, and coefficients.' },
      { title: 'Combine Like Terms', content: 'Simplify each side by grouping variable terms and constant terms separately.' },
      { title: 'Isolate & Solve', content: 'Move constants to one side, divide by the coefficient, and state the solution.' }
    ]
  },
  {
    slug: 'compound-interest-calculator',
    title: 'Compound Interest Calculator',
    subtitle: 'Model investment growth with compound interest',
    description: 'Calculate final amount, total interest earned, and year-by-year growth using the compound interest formula A = P(1 + r/n)^(nt).',
    overview: 'The Compound Interest Calculator evaluates A = P(1 + r/n)^(nt) where P is the principal, r is the annual interest rate, n is the compounding frequency, and t is the time in years. It compares the result against simple interest (A = P(1 + rt)) to quantify the compounding advantage, and generates a year-by-year growth table so you can see how the balance compounds over time.',
    intentKeywords: ['compound interest formula calculator', 'investment growth over time', 'monthly vs annual compounding difference', 'A equals P times 1 plus r over n'],
    category: 'Algebra',
    type: 'algebra',
    keywords: ['compound interest', 'investment calculator', 'financial math', 'interest formula'],
    schema: { name: 'TheCalcPro Compound Interest Tool', description: 'Financial math calculator for compound interest with growth table output.', category: 'FinanceApplication' },
    faqs: [
      { question: 'What is the compound interest formula?', answer: 'A = P(1 + r/n)^(nt), where A is the final amount, P is the principal, r is the annual rate as a decimal, n is the number of compounding periods per year, and t is time in years. The more frequently interest compounds, the higher the final amount.' },
      { question: 'How does compound interest differ from simple interest?', answer: 'Simple interest earns interest only on the original principal (I = Prt). Compound interest earns interest on both the principal and previously accumulated interest, causing exponential growth. Over long periods the difference can be dramatic.' }
    ],
    steps: [
      { title: 'Enter Principal & Rate', content: 'Provide the starting amount P and the annual interest rate r as a percentage.' },
      { title: 'Set Compounding Frequency', content: 'Choose how often interest compounds: annually, quarterly, monthly, or daily.' },
      { title: 'Compute & Compare', content: 'Evaluate A = P(1+r/n)^(nt) and show the year-by-year balance table vs simple interest.' }
    ]
  },
  {
    slug: 'definite-integral-calculator',
    title: 'Definite Integral Calculator',
    subtitle: 'Evaluate definite integrals with bounds',
    description: 'Compute the definite integral of a function over a closed interval [a, b] using the Fundamental Theorem of Calculus.',
    overview: 'The Definite Integral Calculator finds the exact numerical value of ∫[a to b] f(x) dx by first computing the antiderivative F(x) symbolically and then evaluating F(b) − F(a) per the Fundamental Theorem of Calculus. It handles polynomials, trigonometric, exponential, and logarithmic integrands, shows the antiderivative before substitution, and interprets the result geometrically as the net signed area under the curve.',
    intentKeywords: ['definite integral calculator with steps', 'fundamental theorem of calculus solver', 'evaluate integral from a to b', 'area under curve calculator'],
    category: 'Calculus',
    type: 'calculus',
    keywords: ['definite integral', 'area under curve', 'calculus solver', 'fundamental theorem'],
    schema: { name: 'TheCalcPro Definite Integral Engine', description: 'Calculus tool for evaluating definite integrals using the Fundamental Theorem.', category: 'CalculusApplication' },
    faqs: [
      { question: 'How do you evaluate a definite integral?', answer: 'Find the antiderivative F(x) of the integrand f(x), then substitute the upper and lower bounds: the answer is F(b) − F(a). This is the First Fundamental Theorem of Calculus and converts the continuous summation into a simple subtraction.' },
      { question: 'What does a definite integral represent geometrically?', answer: 'It represents the net signed area between the function and the x-axis over [a, b]. Regions above the x-axis contribute positive area; regions below contribute negative area. If the function crosses the x-axis, the integral may be smaller than the total enclosed area.' }
    ],
    steps: [
      { title: 'Enter Function & Bounds', content: 'Input f(x) and the integration limits a and b.' },
      { title: 'Find Antiderivative', content: 'Compute F(x) = ∫f(x) dx symbolically, showing the integration rule applied.' },
      { title: 'Evaluate F(b) − F(a)', content: 'Substitute the bounds and simplify to produce the definite integral value.' }
    ]
  },
  {
    slug: 'percentage-difference-calculator',
    title: 'Percentage Difference Calculator',
    subtitle: 'Find the % difference between two values',
    description: 'Calculate the absolute percentage difference between two numbers and distinguish it from percentage change.',
    overview: 'The Percentage Difference Calculator computes |V1 − V2| / ((V1 + V2) / 2) × 100%, using the average of the two values as the reference base. This symmetric formula is the correct choice when neither value is definitively the "original" — unlike percentage change which divides by a specific starting value. The engine also displays percentage change (V2−V1)/V1×100% alongside the difference so you can compare both metrics at once.',
    intentKeywords: ['percentage difference vs percentage change', 'symmetric percent difference formula', 'difference between two numbers as percentage', 'percent difference calculator'],
    category: 'Algebra',
    type: 'algebra',
    keywords: ['percentage difference', 'percent change', 'ratio calculator', 'math tool'],
    schema: { name: 'TheCalcPro Percentage Difference Tool', description: 'Calculator for symmetric percentage difference and percentage change.', category: 'AlgebraicApplication' },
    faqs: [
      { question: 'What is the formula for percentage difference?', answer: 'Percentage Difference = |V1 − V2| / ((V1 + V2) / 2) × 100%. The denominator uses the mean of both values as a neutral reference, making the result the same regardless of which value you label V1 or V2.' },
      { question: 'How is percentage difference different from percentage change?', answer: 'Percentage change = (New − Old) / Old × 100% and is directional — it depends on which value is "old". Percentage difference is symmetric and used when comparing two values without a clear before/after relationship, such as two experimental measurements.' }
    ],
    steps: [
      { title: 'Enter Both Values', content: 'Input V1 and V2 — the order does not affect percentage difference.' },
      { title: 'Compute Absolute Difference', content: 'Calculate |V1 − V2| as the numerator.' },
      { title: 'Divide by Average & Scale', content: 'Divide by (V1+V2)/2 and multiply by 100 to express as a percentage.' }
    ]
  },
  {
    slug: 'trapezoid-area-calculator',
    title: 'Trapezoid Area Calculator',
    subtitle: 'Area of any trapezoid from parallel sides and height',
    description: 'Compute the area of a trapezoid using A = ½(a+b)h, plus perimeter and diagonal lengths.',
    overview: 'The Trapezoid Area Calculator applies A = ½(a+b)h where a and b are the two parallel sides (bases) and h is the perpendicular height. It also computes the perimeter by deriving the leg lengths from the height and base offset using the Pythagorean theorem, and shows the median (midsegment) length (a+b)/2 which equals the average base.',
    intentKeywords: ['trapezoid area formula calculator', 'area of trapezium step by step', 'parallel sides height trapezoid', 'midsegment of trapezoid'],
    category: 'Geometry',
    type: 'geometry',
    keywords: ['trapezoid area', 'trapezium calculator', 'parallel sides', 'geometry'],
    schema: { name: 'TheCalcPro Trapezoid Tool', description: 'Area and perimeter calculator for trapezoids.', category: 'GeometryApplication' },
    faqs: [
      { question: 'What is the formula for the area of a trapezoid?', answer: 'Area = ½ × (a + b) × h, where a and b are the lengths of the two parallel sides and h is the perpendicular height between them. This formula averages the two bases and multiplies by the height, similar to a rectangle formula but accounting for the unequal sides.' },
      { question: 'How do you find the height of a trapezoid if not given?', answer: 'If you know the leg length l and the difference in bases, you can find h using the Pythagorean theorem: h = √(l² − d²) where d is the horizontal offset of the leg. Alternatively, use the law of cosines if an interior angle is known.' }
    ],
    steps: [
      { title: 'Enter Bases & Height', content: 'Input parallel side a, parallel side b, and perpendicular height h.' },
      { title: 'Compute Area', content: 'Apply A = ½(a + b)h and display the midsegment (a+b)/2.' },
      { title: 'Compute Perimeter', content: 'Derive leg lengths from height and base offset, then sum all four sides.' }
    ]
  },
  {
    slug: 'rectangular-prism-volume-calculator',
    title: 'Rectangular Prism Volume Calculator',
    subtitle: 'Volume and surface area of any box or cuboid',
    description: 'Enter length, width, and height to compute volume, total surface area, and diagonal of a rectangular prism.',
    overview: 'The Rectangular Prism Calculator computes V = l×w×h for volume, SA = 2(lw + lh + wh) for total surface area, and the space diagonal d = √(l²+w²+h²). Each of the three distinct face areas is shown individually so material quantities for each face can be estimated independently — useful in packaging, construction, and manufacturing.',
    intentKeywords: ['rectangular prism volume formula', 'cuboid surface area calculator', 'box volume length width height', 'space diagonal rectangular prism'],
    category: 'Geometry',
    type: 'geometry',
    keywords: ['rectangular prism', 'cuboid volume', 'box calculator', 'surface area'],
    schema: { name: 'TheCalcPro Rectangular Prism Tool', description: 'Cuboid volume, surface area, and diagonal calculator.', category: 'GeometryApplication' },
    faqs: [
      { question: 'How do you calculate the volume of a rectangular prism?', answer: 'Multiply length × width × height: V = lwh. This is equivalent to computing the area of the base (l×w) and then extending it through the height — the same logic as stacking identical rectangular layers.' },
      { question: 'What is the space diagonal of a rectangular prism?', answer: 'The space diagonal connects two opposite corners through the interior of the prism. Its length is d = √(l²+w²+h²), derived by applying the Pythagorean theorem twice — first across the base, then up through the height.' }
    ],
    steps: [
      { title: 'Enter Dimensions', content: 'Provide length l, width w, and height h in consistent units.' },
      { title: 'Compute Volume', content: 'Apply V = l × w × h.' },
      { title: 'Compute SA & Diagonal', content: 'Calculate SA = 2(lw + lh + wh) and d = √(l²+w²+h²).' }
    ]
  },
  {
    slug: 'pyramid-volume-calculator',
    title: 'Pyramid Volume Calculator',
    subtitle: 'Volume and surface area of square and rectangular pyramids',
    description: 'Compute pyramid volume using V = ⅓Bh and lateral surface area for any square or rectangular base pyramid.',
    overview: 'The Pyramid Volume Calculator uses V = (1/3)Bh where B is the base area and h is the vertical height. For a square base pyramid it also computes the slant height l = √(h²+(a/2)²), the lateral face area of each triangular face (½×a×l), and the total surface area B + 4×(½al). Full intermediate steps are shown for each face calculation.',
    intentKeywords: ['pyramid volume formula step by step', 'square pyramid surface area', 'slant height pyramid calculator', 'one third base height pyramid'],
    category: 'Geometry',
    type: 'geometry',
    keywords: ['pyramid volume', 'square pyramid', 'surface area pyramid', 'geometry'],
    schema: { name: 'TheCalcPro Pyramid Calculator', description: 'Volume and surface area tool for square and rectangular pyramids.', category: 'GeometryApplication' },
    faqs: [
      { question: 'Why is the volume of a pyramid one-third of a prism?', answer: 'Three congruent pyramids can be assembled to fill one rectangular prism of the same base and height, a fact demonstrable through Cavalieri\'s principle or integration. This is why the formula is V = (1/3)Bh.' },
      { question: 'How is slant height different from the pyramid\'s height?', answer: 'The vertical height h is measured perpendicularly from the apex straight down to the base center. The slant height l is measured along a triangular face from the apex to the midpoint of a base edge: l = √(h² + (a/2)²) for a square base of side a.' }
    ],
    steps: [
      { title: 'Enter Base & Height', content: 'Provide base side length a and vertical height h.' },
      { title: 'Compute Slant Height', content: 'Calculate l = √(h² + (a/2)²).' },
      { title: 'Compute Volume & SA', content: 'Apply V = (1/3)a²h and SA = a² + 2al.' }
    ]
  },
  {
    slug: 'mean-median-mode-calculator',
    title: 'Mean Median Mode Calculator',
    subtitle: 'All three central tendency measures from one dataset',
    description: 'Calculate the mean, median, mode, and range of any numeric dataset with a sorted list and frequency table.',
    overview: 'The Mean Median Mode Calculator processes a numeric dataset and returns all three measures of central tendency simultaneously. The arithmetic mean is Σxᵢ/N, the median is the middle value of the sorted set (or the average of the two middle values for even N), and the mode is the most frequently occurring value (with multi-modal detection). The range, midrange, and a full sorted list are also displayed.',
    intentKeywords: ['mean median mode calculator step by step', 'central tendency statistics tool', 'find mode of dataset', 'bimodal dataset calculator'],
    category: 'Statistics',
    type: 'statistics',
    keywords: ['mean median mode', 'central tendency', 'statistics calculator', 'average calculator'],
    schema: { name: 'TheCalcPro Mean Median Mode Tool', description: 'Central tendency calculator returning mean, median, mode, and range.', category: 'StatisticsApplication' },
    faqs: [
      { question: 'What is the difference between mean, median, and mode?', answer: 'Mean is the arithmetic average (sum ÷ count). Median is the middle value when data is sorted — resistant to outliers. Mode is the most frequent value and can be non-unique. For symmetric distributions they are equal; for skewed data they diverge, and the median is usually the most representative measure.' },
      { question: 'When should I use median instead of mean?', answer: 'Use the median when your data contains outliers or is heavily skewed. For example, household income distributions are right-skewed, so the median income is more representative than the mean, which is pulled upward by very high earners.' }
    ],
    steps: [
      { title: 'Input Dataset', content: 'Enter comma or space separated values.' },
      { title: 'Sort & Count', content: 'Sort the dataset and build a frequency table to identify mode(s).' },
      { title: 'Compute All Measures', content: 'Return mean = Σx/N, median = middle value, mode = most frequent, range = max−min.' }
    ]
  },
  {
    slug: 'system-of-equations-solver',
    title: 'System of Linear Equations Solver',
    subtitle: 'Solve 2×2 and 3×3 linear systems',
    description: 'Solve systems of 2 or 3 linear equations using substitution, elimination, or Cramer\'s Rule with step-by-step output.',
    overview: 'The System of Linear Equations Solver handles 2×2 and 3×3 systems using Gaussian elimination and Cramer\'s Rule in parallel, allowing you to compare both methods. The engine checks the determinant first to classify the system as consistent (unique solution), inconsistent (no solution), or dependent (infinite solutions), then works through each elimination step and displays the augmented matrix at every pivot.',
    intentKeywords: ['system of linear equations solver step by step', 'Cramer rule calculator', 'Gaussian elimination solver', '2x2 system of equations'],
    category: 'Algebra',
    type: 'algebra',
    keywords: ['system of equations', 'linear system', 'Cramer rule', 'elimination method'],
    schema: { name: 'TheCalcPro Systems Solver', description: 'Algebraic solver for 2×2 and 3×3 linear systems with multiple methods.', category: 'AlgebraicApplication' },
    faqs: [
      { question: 'What is Cramer\'s Rule for solving linear systems?', answer: 'Cramer\'s Rule expresses each variable as a ratio of determinants. For a 2×2 system ax+by=e, cx+dy=f: x = (ed−bf)/(ad−bc) and y = (af−ec)/(ad−bc). The denominator is the determinant of the coefficient matrix; a zero determinant means the system has no unique solution.' },
      { question: 'How does Gaussian elimination work?', answer: 'Gaussian elimination transforms the augmented matrix into row echelon form using three operations: swapping rows, multiplying a row by a scalar, and adding a multiple of one row to another. Back-substitution then extracts the values of each variable from the simplified upper-triangular form.' }
    ],
    steps: [
      { title: 'Enter Coefficients', content: 'Input a, b, c values for each equation in the system.' },
      { title: 'Compute Determinant', content: 'Evaluate det(A) to classify the system before solving.' },
      { title: 'Apply Elimination', content: 'Perform row operations to reach echelon form, then back-substitute for each variable.' }
    ]
  },
  {
    slug: 'logarithm-calculator',
    title: 'Logarithm Calculator',
    subtitle: 'Evaluate log, ln, and log base n of any number',
    description: 'Calculate common log (base 10), natural log (base e), and custom base logarithms with change-of-base working shown.',
    overview: 'The Logarithm Calculator evaluates log₁₀(x), ln(x) = logₑ(x), and logₙ(x) for any user-defined base n. When a custom base is used, the change-of-base formula logₙ(x) = ln(x)/ln(n) is shown explicitly. The engine also evaluates the inverse: given log result y, it computes the antilog x = bʸ and plots the exponential-logarithmic relationship.',
    intentKeywords: ['logarithm calculator any base', 'change of base formula log', 'natural log vs common log', 'antilog calculator'],
    category: 'Algebra',
    type: 'algebra',
    keywords: ['logarithm', 'natural log', 'log base 10', 'change of base'],
    schema: { name: 'TheCalcPro Logarithm Tool', description: 'Multi-base logarithm calculator with change-of-base formula display.', category: 'AlgebraicApplication' },
    faqs: [
      { question: 'What is the change-of-base formula for logarithms?', answer: 'logₙ(x) = log(x)/log(n) = ln(x)/ln(n). This allows any logarithm to be evaluated using a calculator that only supports base-10 or base-e. The result is identical regardless of which base you use for the conversion.' },
      { question: 'What is the difference between log and ln?', answer: 'log typically denotes log base 10 (common logarithm), while ln denotes the natural logarithm with base e ≈ 2.71828. ln arises naturally in calculus (the integral of 1/x), while log base 10 is convenient for scientific notation and decibel calculations.' }
    ],
    steps: [
      { title: 'Enter Value & Base', content: 'Provide x and the desired base (10, e, or custom n).' },
      { title: 'Apply Change of Base', content: 'Compute logₙ(x) = ln(x)/ln(n) showing each ln evaluation.' },
      { title: 'Display Antilog', content: 'Show the inverse: if logₙ(x) = y, then x = nʸ for verification.' }
    ]
  },
  {
    slug: 'limit-calculator',
    title: 'Limit Calculator',
    subtitle: 'Evaluate limits as x approaches any value or infinity',
    description: 'Compute one-sided and two-sided limits, detect indeterminate forms, and apply L\'Hôpital\'s rule automatically.',
    overview: 'The Limit Calculator evaluates lim(x→c) f(x) by first attempting direct substitution. When that produces an indeterminate form (0/0, ∞/∞, 0·∞, etc.), the engine automatically applies L\'Hôpital\'s Rule — differentiating numerator and denominator separately and re-evaluating. It also handles limits at infinity by identifying the dominant term and applying asymptotic simplification.',
    intentKeywords: ['limit calculator step by step', "L'Hopital rule calculator", 'limit as x approaches infinity', 'indeterminate form 0 over 0 solver'],
    category: 'Calculus',
    type: 'calculus',
    keywords: ['limit calculator', "L'Hopital rule", 'calculus limits', 'infinity limit'],
    schema: { name: "TheCalcPro Limit Engine", description: "Calculus limit solver with L'Hôpital's Rule and asymptotic analysis.", category: 'CalculusApplication' },
    faqs: [
      { question: "When is L'Hôpital's Rule applied?", answer: "L'Hôpital's Rule applies when a limit produces an indeterminate form 0/0 or ±∞/∞ after direct substitution. The rule states that lim f(x)/g(x) = lim f'(x)/g'(x), provided the derivatives exist and the new limit is determinate. It may be applied repeatedly if the result remains indeterminate." },
      { question: 'How do you find the limit as x approaches infinity?', answer: 'For rational functions, divide every term by the highest power of x in the denominator. Terms with x in the denominator vanish as x→∞, leaving only the ratio of leading coefficients. For other functions, identify the dominant term and apply known limits like lim(1/x)=0 or lim(eˣ/xⁿ)=∞.' }
    ],
    steps: [
      { title: 'Enter Function & Point', content: 'Input f(x) and the limit point c (or ∞, −∞).' },
      { title: 'Try Direct Substitution', content: 'Substitute x = c; if determinate, return the result immediately.' },
      { title: "Apply L'Hôpital or Simplify", content: 'For indeterminate forms, differentiate or algebraically simplify, then re-evaluate.' }
    ]
  },
  {
    slug: 'percentage-change-calculator',
    title: 'Percentage Change Calculator',
    subtitle: 'Calculate % increase or decrease between two values',
    description: 'Find the percentage increase or decrease from an original value to a new value, with reverse calculation support.',
    overview: 'The Percentage Change Calculator computes ((New − Old) / |Old|) × 100%. A positive result indicates a percentage increase; negative indicates a decrease. The engine also supports reverse calculation: given the original value and the percentage change, it finds the new value. Both the absolute change and relative change are displayed side by side.',
    intentKeywords: ['percentage increase calculator', 'percent decrease formula', 'percentage change from old to new value', 'relative change calculator'],
    category: 'Algebra',
    type: 'algebra',
    keywords: ['percentage change', 'percent increase', 'percent decrease', 'relative change'],
    schema: { name: 'TheCalcPro Percentage Change Tool', description: 'Calculator for percentage increase and decrease with reverse lookup.', category: 'AlgebraicApplication' },
    faqs: [
      { question: 'How do you calculate percentage change?', answer: 'Percentage Change = ((New Value − Old Value) / |Old Value|) × 100%. If the result is positive, it is a percentage increase; if negative, a percentage decrease. Always divide by the original (old) value, not the new one.' },
      { question: 'How do you find the new value given a percentage change?', answer: 'New Value = Old Value × (1 + percentage/100). For example, a 25% increase on 80 gives 80 × 1.25 = 100. For a decrease, subtract the fraction: a 20% decrease gives Old × 0.80.' }
    ],
    steps: [
      { title: 'Enter Old & New Values', content: 'Provide the original value and the new value.' },
      { title: 'Compute Change', content: 'Calculate (New − Old) to determine direction and magnitude.' },
      { title: 'Express as Percentage', content: 'Divide by |Old| and multiply by 100 to get the percentage change.' }
    ]
  },
  {
    slug: 'simple-interest-calculator',
    title: 'Simple Interest Calculator',
    subtitle: 'Compute interest, final amount, rate, or time',
    description: 'Solve for any variable in the simple interest formula I = Prt — find interest earned, principal, rate, or duration.',
    overview: 'The Simple Interest Calculator solves any variable in I = P × r × t, where I is interest earned, P is the principal, r is the annual rate, and t is time in years. Enter any three values and the solver algebraically rearranges the formula to find the missing fourth. It also shows the total amount A = P + I and compares it with compound interest at the same rate to illustrate the compounding premium.',
    intentKeywords: ['simple interest formula calculator', 'I equals P r t solver', 'find principal from interest', 'simple vs compound interest comparison'],
    category: 'Algebra',
    type: 'algebra',
    keywords: ['simple interest', 'interest formula', 'financial math', 'principal rate time'],
    schema: { name: 'TheCalcPro Simple Interest Tool', description: 'Simple interest solver for any variable in I = Prt.', category: 'FinanceApplication' },
    faqs: [
      { question: 'What is the simple interest formula?', answer: 'I = P × r × t, where P is the principal (starting amount), r is the annual interest rate expressed as a decimal, and t is the time in years. The total amount after the period is A = P + I = P(1 + rt).' },
      { question: 'How do I find the interest rate if I know the other values?', answer: 'Rearrange I = Prt to r = I / (P × t). For example, if $500 earns $75 over 3 years, r = 75 / (500 × 3) = 0.05 = 5% per year.' }
    ],
    steps: [
      { title: 'Identify Known Variables', content: 'Determine which three of P, r, t, I are known.' },
      { title: 'Rearrange Formula', content: 'Algebraically isolate the unknown variable from I = Prt.' },
      { title: 'Compute & Compare', content: 'Output the result and show A = P + I alongside compound equivalent.' }
    ]
  },
  {
    slug: 'exponent-calculator',
    title: 'Exponent Calculator',
    subtitle: 'Evaluate powers, roots, and scientific notation',
    description: 'Calculate any base raised to any exponent — including negative, fractional, and decimal exponents — with law-of-exponents working.',
    overview: 'The Exponent Calculator evaluates bⁿ for any real base b and exponent n. For fractional exponents (b^(p/q) = q-th root of bᵖ) it shows the radical form. For negative exponents (b⁻ⁿ = 1/bⁿ) it displays the reciprocal form. Scientific notation output is automatically applied for very large or very small results, and the relevant law of exponents used in each step is cited by name.',
    intentKeywords: ['exponent calculator any base', 'fractional exponent calculator', 'negative exponent simplifier', 'laws of exponents solver'],
    category: 'Algebra',
    type: 'algebra',
    keywords: ['exponent calculator', 'power calculator', 'laws of exponents', 'scientific notation'],
    schema: { name: 'TheCalcPro Exponent Tool', description: 'Power and exponent calculator with fractional and negative exponent support.', category: 'AlgebraicApplication' },
    faqs: [
      { question: 'What does a negative exponent mean?', answer: 'A negative exponent means take the reciprocal: b⁻ⁿ = 1/bⁿ. For example, 2⁻³ = 1/2³ = 1/8 = 0.125. Negative exponents do not make the result negative — they indicate the base is in the denominator.' },
      { question: 'How do you evaluate a fractional exponent?', answer: 'A fractional exponent b^(p/q) means the q-th root of bᵖ, written ᵍ√(bᵖ). For example, 8^(2/3) = ³√(8²) = ³√64 = 4. The denominator of the fraction is the root index; the numerator is the power.' }
    ],
    steps: [
      { title: 'Enter Base & Exponent', content: 'Input b and n, which may be integer, fraction, decimal, or negative.' },
      { title: 'Classify Exponent Type', content: 'Determine if n is positive, negative, or fractional to select the correct rule.' },
      { title: 'Evaluate & Format', content: 'Compute bⁿ, display in radical or reciprocal form if applicable, and apply scientific notation for extreme values.' }
    ]
  },
  {
    slug: 'polynomial-factoring-calculator',
    title: 'Polynomial Factoring Calculator',
    subtitle: 'Factor polynomials step-by-step',
    description: 'Find the greatest common factor (GCF), factor trinomials, and use difference of squares to fully factor any polynomial.',
    overview: 'The Polynomial Factoring Calculator breaks down algebraic expressions into their simplest multipliable components. It begins by extracting the greatest common factor (GCF) from all terms. Then, it attempts pattern recognition such as difference of squares (a² - b² = (a+b)(a-b)), difference of cubes, perfect square trinomials, or grouping techniques for four-term polynomials.',
    intentKeywords: ['factor trinomials step by step', 'greatest common factor calculator algebra', 'difference of squares solver', 'factor by grouping calculator'],
    category: 'Algebra',
    type: 'algebra',
    keywords: ['polynomial factoring', 'factor polynomials', 'algebra calculator', 'trinomial solver'],
    schema: { name: 'TheCalcPro Factoring Engine', description: 'Algebraic tool for factoring polynomials with step-by-step methods.', category: 'AlgebraicApplication' },
    faqs: [
      { question: 'What is factoring in algebra?', answer: 'Factoring is the process of breaking down an algebraic expression into simpler expressions (factors) that, when multiplied together, produce the original expression. It is the reverse of expanding.' },
      { question: 'How do you factor a trinomial?', answer: 'For a trinomial ax² + bx + c, you look for two numbers that multiply to ac and add to b. You then rewrite the middle term bx using these numbers and factor by grouping.' }
    ],
    steps: [
      { title: 'Extract GCF', content: 'Find the greatest common factor of all coefficients and variables.' },
      { title: 'Identify Patterns', content: 'Check for special forms like difference of squares or perfect cubes.' },
      { title: 'Factor the Remainder', content: 'Apply grouping or the ac-method to factor trinomials completely.' }
    ]
  },
  {
    slug: 'quadratic-discriminant-calculator',
    title: 'Quadratic Discriminant Calculator',
    subtitle: 'Determine the nature of roots for any quadratic',
    description: 'Calculate the discriminant (b² - 4ac) to determine if a quadratic equation has real, repeated, or complex roots.',
    overview: 'The Quadratic Discriminant Calculator focuses solely on the value under the square root in the quadratic formula, known as the discriminant (Δ = b² - 4ac). By calculating this value, the engine instantly classifies the roots of the equation without having to solve the entire formula. A positive discriminant indicates two distinct real roots, zero indicates one real repeated root, and a negative value indicates two complex conjugate roots.',
    intentKeywords: ['discriminant formula calculator', 'nature of roots quadratic equation', 'b squared minus 4ac calculator', 'how many roots does a quadratic have'],
    category: 'Algebra',
    type: 'algebra',
    keywords: ['quadratic discriminant', 'nature of roots', 'discriminant calculator', 'b2-4ac'],
    schema: { name: 'TheCalcPro Discriminant Tool', description: 'Calculator for determining the nature of quadratic roots using the discriminant.', category: 'AlgebraicApplication' },
    faqs: [
      { question: 'What does the discriminant tell you?', answer: 'The discriminant (Δ) tells you the number and type of roots for a quadratic equation. If Δ > 0, there are two real roots. If Δ = 0, there is one real root. If Δ < 0, there are two complex roots.' },
      { question: 'What is the formula for the discriminant?', answer: 'For a quadratic equation in the form ax² + bx + c = 0, the discriminant formula is Δ = b² - 4ac. This expression is the part of the quadratic formula under the square root.' }
    ],
    steps: [
      { title: 'Identify Coefficients', content: 'Extract values a, b, and c from the quadratic equation ax² + bx + c = 0.' },
      { title: 'Compute Discriminant', content: 'Calculate Δ = b² - 4ac.' },
      { title: 'Interpret Result', content: 'Classify the roots based on the sign of the discriminant.' }
    ]
  },
  {
    slug: 't-test-calculator',
    title: 'T-Test Calculator',
    subtitle: 'Perform one-sample or two-sample t-tests',
    description: 'Calculate the t-statistic, degrees of freedom, and p-value to determine statistical significance between sample means.',
    overview: 'The T-Test Calculator evaluates whether the difference between sample means is statistically significant. It supports one-sample, independent two-sample (Student\'s t-test or Welch\'s t-test for unequal variances), and paired t-tests. The engine calculates the t-statistic, determines the appropriate degrees of freedom, and computes the exact p-value using the Student\'s t-distribution for your specified significance level (alpha).',
    intentKeywords: ['two sample t test calculator', 'p value from t statistic', 'welch t test calculator', 'independent samples t test with steps'],
    category: 'Statistics',
    type: 'statistics',
    keywords: ['t-test calculator', 'p-value', 'hypothesis testing', 'statistical significance'],
    schema: { name: 'TheCalcPro T-Test Engine', description: 'Statistical calculator for t-tests and p-values.', category: 'StatisticsApplication' },
    faqs: [
      { question: 'When should I use a t-test?', answer: 'A t-test is used to compare the means of one or two groups when the population standard deviation is unknown and the sample size is relatively small (typically n < 30). It helps determine if observed differences are statistically significant.' },
      { question: 'What is the difference between a paired and independent t-test?', answer: 'An independent (unpaired) t-test compares the means of two different, unrelated groups. A paired t-test compares the means from the same group at different times, or from two matched groups (e.g., before and after measurements).' }
    ],
    steps: [
      { title: 'Select Test Type', content: 'Choose one-sample, independent two-sample, or paired t-test.' },
      { title: 'Enter Sample Data', content: 'Input the means, standard deviations, and sample sizes for your groups.' },
      { title: 'Calculate T-Statistic & P-Value', content: 'Determine the t-value and degrees of freedom, then compute the p-value to test the null hypothesis.' }
    ]
  },
  {
    slug: 'relative-standard-deviation-calculator',
    title: 'Relative Standard Deviation Calculator',
    subtitle: 'Compute the coefficient of variation (RSD)',
    description: 'Calculate the Relative Standard Deviation (RSD) or Coefficient of Variation (CV) to compare data variability.',
    overview: 'The Relative Standard Deviation (RSD) Calculator finds the ratio of the standard deviation to the mean, usually expressed as a percentage (RSD = (s / |x̄|) × 100%). This dimensionless metric, also known as the Coefficient of Variation (CV), allows for the comparison of data dispersion across different datasets that have widely different means or units, making it invaluable in analytical chemistry, precision engineering, and finance.',
    intentKeywords: ['relative standard deviation formula', 'coefficient of variation calculator', 'rsd percentage calculator', 'precision of measurements calculator'],
    category: 'Statistics',
    type: 'statistics',
    keywords: ['relative standard deviation', 'coefficient of variation', 'rsd calculator', 'data precision'],
    schema: { name: 'TheCalcPro RSD Tool', description: 'Statistics calculator for Relative Standard Deviation and Coefficient of Variation.', category: 'StatisticsApplication' },
    faqs: [
      { question: 'What is Relative Standard Deviation (RSD)?', answer: 'RSD is a standardised measure of dispersion of a probability distribution or frequency distribution. It is calculated by dividing the standard deviation by the mean and multiplying by 100 to get a percentage. It is also called the Coefficient of Variation.' },
      { question: 'Why use RSD instead of standard deviation?', answer: 'Standard deviation is an absolute measure of spread in the units of the data. RSD is a relative percentage, allowing you to compare the variability of datasets with different units or vastly different mean values.' }
    ],
    steps: [
      { title: 'Enter Data', content: 'Input the dataset values.' },
      { title: 'Compute Mean & SD', content: 'Calculate the sample mean (x̄) and standard deviation (s).' },
      { title: 'Calculate RSD', content: 'Compute RSD = (s / |x̄|) × 100%.' }
    ]
  },
  {
    slug: 'partial-derivative-calculator',
    title: 'Partial Derivative Calculator',
    subtitle: 'Compute partial derivatives of multivariable functions',
    description: 'Find the first and second-order partial derivatives of functions with two or more variables, treating other variables as constants.',
    overview: 'The Partial Derivative Calculator evaluates ∂f/∂x and ∂f/∂y for multivariable functions. It works by applying standard differentiation rules to the target variable while treating all other variables as constants. The engine supports mixed partial derivatives (∂²f/∂x∂y) and demonstrates Clairaut\'s theorem where applicable, displaying the step-by-step application of the chain, product, and quotient rules in a multivariable context.',
    intentKeywords: ['partial derivative calculator with steps', 'multivariable calculus derivative', 'second order partial derivative', 'gradient calculator'],
    category: 'Calculus',
    type: 'calculus',
    keywords: ['partial derivative', 'multivariable calculus', 'differentiation', 'gradient'],
    schema: { name: 'TheCalcPro Partial Derivative Engine', description: 'Calculus tool for finding partial derivatives of multivariable functions.', category: 'CalculusApplication' },
    faqs: [
      { question: 'How do you take a partial derivative?', answer: 'To take a partial derivative with respect to a specific variable (like x), you differentiate the function using normal rules while treating all other variables (like y and z) as if they were constant numbers.' },
      { question: 'What are mixed partial derivatives?', answer: 'A mixed partial derivative is a second-order (or higher) derivative taken with respect to two different variables sequentially, such as differentiating by x, then by y. By Clairaut\'s theorem, under continuous conditions, the order does not matter: ∂²f/∂x∂y = ∂²f/∂y∂x.' }
    ],
    steps: [
      { title: 'Input Function', content: 'Enter the multivariable function f(x, y).' },
      { title: 'Select Variable', content: 'Choose which variable to differentiate with respect to.' },
      { title: 'Differentiate', content: 'Apply differentiation rules while holding other variables constant.' }
    ]
  },
  {
    slug: 'inflection-points-calculator',
    title: 'Inflection Points Calculator',
    subtitle: 'Find points where the concavity changes',
    description: 'Determine the inflection points of a curve by finding where the second derivative equals zero or is undefined.',
    overview: 'The Inflection Points Calculator identifies coordinates on a curve where concavity changes (from concave up to concave down, or vice versa). The engine first computes the second derivative f\'\'(x) and sets it to zero or finds where it is undefined. It then tests intervals around these critical points using a sign chart for f\'\'(x) to confirm an actual change in concavity, outputting the exact coordinates of the inflection points.',
    intentKeywords: ['find inflection points of a function', 'second derivative concavity test', 'points of inflection calculator with steps', 'where does concavity change'],
    category: 'Calculus',
    type: 'calculus',
    keywords: ['inflection points', 'concavity', 'second derivative test', 'calculus solver'],
    schema: { name: 'TheCalcPro Inflection Points Tool', description: 'Calculus calculator for finding points of inflection and concavity changes.', category: 'CalculusApplication' },
    faqs: [
      { question: 'What is an inflection point?', answer: 'An inflection point is a point on a curve where the concavity changes. For example, the curve changes from bending upwards (concave up) to bending downwards (concave down).' },
      { question: 'How do you find inflection points?', answer: 'Find the second derivative f\'\'(x) and set it equal to 0. The solutions are potential inflection points. To verify, pick test points on either side of each root and check if the sign of f\'\'(x) changes. If it does, you have found an inflection point.' }
    ],
    steps: [
      { title: 'Find Second Derivative', content: 'Compute f\'\'(x) for the given function.' },
      { title: 'Solve f\'\'(x) = 0', content: 'Find the roots where the second derivative is zero or undefined.' },
      { title: 'Test Intervals', content: 'Check the sign of f\'\'(x) across the intervals to confirm concavity changes and compute y-coordinates.' }
    ]
  },
  {
    slug: 'surface-area-triangular-prism',
    title: 'Triangular Prism Surface Area Calculator',
    subtitle: 'Calculate total area of a prism with triangular bases',
    description: 'Compute the total surface area and volume of a triangular prism using base lengths, heights, and prism length.',
    overview: 'The Triangular Prism Surface Area Calculator finds the total external area of a prism with triangular bases. It requires the three sides of the triangular base and the length (or height) of the prism. The engine computes the area of the two triangular bases (using Heron\'s formula or base-height) and adds the area of the three rectangular lateral faces, providing a comprehensive breakdown of lateral vs. total surface area.',
    intentKeywords: ['surface area of triangular prism formula', 'lateral area of triangular prism', 'triangular prism geometry calculator', 'area of prism with triangle base'],
    category: 'Geometry',
    type: 'geometry',
    keywords: ['triangular prism', 'surface area', 'prism calculator', 'geometry tool'],
    schema: { name: 'TheCalcPro Triangular Prism Tool', description: 'Geometry calculator for the surface area and volume of triangular prisms.', category: 'GeometryApplication' },
    faqs: [
      { question: 'How do you find the surface area of a triangular prism?', answer: 'Calculate the area of the two triangular bases, and then calculate the area of the three rectangular sides connecting them. Sum all five areas for the total surface area: SA = 2 × (Base Area) + (Perimeter of Base) × Length.' },
      { question: 'What is the lateral area of a triangular prism?', answer: 'The lateral area is the area of the three rectangular sides only, excluding the triangular bases. It is calculated by multiplying the perimeter of the triangular base by the length of the prism.' }
    ],
    steps: [
      { title: 'Enter Dimensions', content: 'Input the three sides of the triangular base and the length of the prism.' },
      { title: 'Compute Base Area', content: 'Calculate the area of the triangular bases using Heron\'s formula.' },
      { title: 'Compute Lateral Area', content: 'Multiply the perimeter of the triangle by the prism length, then sum for total area.' }
    ]
  },
  {
    slug: 'volume-oblique-cylinder',
    title: 'Oblique Cylinder Volume Calculator',
    subtitle: 'Calculate volume and area of slanted cylinders',
    description: 'Compute the volume and surface area of an oblique (slanted) cylinder given radius, perpendicular height, and slant angle.',
    overview: 'The Oblique Cylinder Volume Calculator applies Cavalieri\'s principle, which states that an oblique cylinder has the exact same volume as a right cylinder with the same base radius and perpendicular height (V = πr²h). However, its lateral surface area is different and more complex, requiring integration for an exact answer, but can be approximated or calculated using the slant length and perimeter of a right section.',
    intentKeywords: ['oblique cylinder volume formula', 'slanted cylinder calculator', 'surface area of oblique cylinder', 'cavalieri principle cylinder'],
    category: 'Geometry',
    type: 'geometry',
    keywords: ['oblique cylinder', 'slanted cylinder', 'cylinder volume', 'geometry'],
    schema: { name: 'TheCalcPro Oblique Cylinder Tool', description: 'Volume calculator for slanted/oblique cylinders.', category: 'GeometryApplication' },
    faqs: [
      { question: 'Does a slanted cylinder hold less volume than a straight one?', answer: 'No. According to Cavalieri\'s principle, if a straight (right) cylinder and a slanted (oblique) cylinder have the same base radius and the same perpendicular height, they have exactly the same volume.' },
      { question: 'What is the formula for the volume of an oblique cylinder?', answer: 'The volume formula is identical to a right cylinder: V = πr²h, where r is the radius of the circular base and h is the perpendicular height (not the slanted length).' }
    ],
    steps: [
      { title: 'Enter Radius and Height', content: 'Input the base radius and the perpendicular height.' },
      { title: 'Check Slant Angle (Optional)', content: 'Use the slant angle to calculate the slanted side length if needed.' },
      { title: 'Calculate Volume', content: 'Apply V = πr²h to find the exact volume.' }
    ]
  },
  {
    slug: 'matrix-inverse-calculator',
    title: 'Matrix Inverse Calculator',
    subtitle: 'Find the inverse of 2x2, 3x3, and larger matrices',
    description: 'Calculate the inverse of a square matrix using the adjugate method or Gaussian elimination with step-by-step matrix row operations.',
    overview: 'The Matrix Inverse Calculator finds the inverse matrix A⁻¹ such that A × A⁻¹ = I (the identity matrix). It checks the determinant first; if det(A) = 0, the matrix is singular and has no inverse. For 2x2 matrices, it uses the simple swap-and-negate formula. For 3x3 and larger, it uses Gauss-Jordan elimination, displaying the augmented matrix [A | I] as it performs row operations to reach [I | A⁻¹].',
    intentKeywords: ['find inverse of 3x3 matrix step by step', 'inverse matrix calculator with steps', 'gauss jordan elimination matrix inverse', 'adjugate matrix calculator'],
    category: 'Matrix',
    type: 'matrix',
    keywords: ['matrix inverse', 'inverse matrix', 'linear algebra', 'gauss-jordan'],
    schema: { name: 'TheCalcPro Matrix Inverse Tool', description: 'Linear algebra tool for computing the inverse of a matrix.', category: 'WebApplication' },
    faqs: [
      { question: 'How do you find the inverse of a 2x2 matrix?', answer: 'For a 2x2 matrix [[a, b], [c, d]], swap a and d, change the signs of b and c, and divide everything by the determinant (ad - bc).' },
      { question: 'When does a matrix not have an inverse?', answer: 'A matrix does not have an inverse if its determinant is zero. Such matrices are called singular or non-invertible. Also, only square matrices (same number of rows and columns) can have an inverse.' }
    ],
    steps: [
      { title: 'Enter Matrix Elements', content: 'Input the values of your square matrix.' },
      { title: 'Calculate Determinant', content: 'Verify that the determinant is non-zero so the inverse exists.' },
      { title: 'Perform Row Operations', content: 'Use Gauss-Jordan elimination on an augmented matrix to find the inverse.' }
    ]
  },
  {
    slug: 'eigenvalue-calculator',
    title: 'Eigenvalue Calculator',
    subtitle: 'Find eigenvalues and eigenvectors for matrices',
    description: 'Compute the characteristic polynomial, eigenvalues, and eigenvectors of square matrices for linear algebra analysis.',
    overview: 'The Eigenvalue Calculator finds the scalars (λ) and vectors (v) such that Av = λv for a square matrix A. It calculates the characteristic equation by setting det(A - λI) = 0, finds the roots of this polynomial to get the eigenvalues, and then solves the null space equations (A - λI)v = 0 to find the corresponding eigenvectors, showing the full algebraic process.',
    intentKeywords: ['find eigenvalues of 3x3 matrix', 'characteristic equation calculator', 'eigenvectors and eigenvalues calculator', 'diagonalize matrix calculator'],
    category: 'Matrix',
    type: 'matrix',
    keywords: ['eigenvalues', 'eigenvectors', 'characteristic polynomial', 'linear algebra'],
    schema: { name: 'TheCalcPro Eigenvalue Engine', description: 'Linear algebra solver for finding eigenvalues and eigenvectors.', category: 'WebApplication' },
    faqs: [
      { question: 'What are eigenvalues and eigenvectors?', answer: 'An eigenvector is a non-zero vector that changes only in scale (not direction) when a linear transformation (matrix A) is applied to it. The scale factor is the eigenvalue. Mathematically, Av = λv.' },
      { question: 'How do you find the characteristic equation?', answer: 'The characteristic equation is found by subtracting λ from the main diagonal of the matrix A (giving A - λI), calculating the determinant of that new matrix, and setting it to zero.' }
    ],
    steps: [
      { title: 'Create Characteristic Matrix', content: 'Subtract λ from the diagonal elements of the matrix.' },
      { title: 'Find Determinant', content: 'Set the determinant of the characteristic matrix to zero to form the characteristic polynomial.' },
      { title: 'Solve for Eigenvalues', content: 'Find the roots of the polynomial (λ) and then solve for eigenvectors.' }
    ]
  },
  {
    slug: 'probability-distribution-calculator',
    title: 'Probability Distribution Calculator',
    subtitle: 'Normal, Binomial, and Poisson probability metrics',
    description: 'Calculate probabilities, expected values, and variances for standard discrete and continuous probability distributions.',
    overview: 'The Probability Distribution Calculator evaluates statistical likelihoods for various distribution models. For the Binomial distribution, it calculates the probability of exactly k successes in n trials. For the Poisson distribution, it models the number of events in a fixed interval. For the Normal distribution, it maps values to z-scores and computes the area under the curve to find cumulative probabilities.',
    intentKeywords: ['binomial probability calculator step by step', 'poisson distribution formula calculator', 'normal distribution area under curve', 'expected value probability calculator'],
    category: 'Statistics',
    type: 'statistics',
    keywords: ['probability distribution', 'binomial distribution', 'normal distribution', 'poisson'],
    schema: { name: 'TheCalcPro Probability Distributions', description: 'Statistical tool for Binomial, Poisson, and Normal distribution probabilities.', category: 'StatisticsApplication' },
    faqs: [
      { question: 'When should I use the binomial distribution?', answer: 'Use the binomial distribution when you have a fixed number of independent trials, each trial has only two possible outcomes (success or failure), and the probability of success is constant across all trials (e.g., flipping a coin 10 times).' },
      { question: 'What is the Poisson distribution used for?', answer: 'The Poisson distribution is used to model the number of times an event occurs within a fixed interval of time or space, given a known average rate of occurrence, and assuming events occur independently of each other.' }
    ],
    steps: [
      { title: 'Select Distribution', content: 'Choose Binomial, Poisson, or Normal distribution.' },
      { title: 'Input Parameters', content: 'Enter the necessary parameters like trials (n), probability (p), or mean (μ).' },
      { title: 'Calculate Probability', content: 'Evaluate the specific Probability Mass or Density Function.' }
    ]
  },
  {
    slug: 'rational-equation-solver',
    title: 'Rational Equation Solver',
    subtitle: 'Solve equations containing fractions with variables',
    description: 'Solve rational equations by finding the least common denominator, eliminating fractions, and checking for extraneous solutions.',
    overview: 'The Rational Equation Solver tackles algebraic equations where variables appear in the denominators of fractions. The engine first identifies the restricted values where the denominator is zero. It then finds the Least Common Denominator (LCD), multiplies all terms by the LCD to clear the fractions, solves the resulting polynomial equation, and finally verifies the answers against the restricted values to discard any extraneous solutions.',
    intentKeywords: ['solve rational equations calculator with steps', 'find extraneous solutions rational equation', 'multiply by least common denominator calculator', 'equations with fractions solver'],
    category: 'Algebra',
    type: 'algebra',
    keywords: ['rational equations', 'algebra solver', 'extraneous solutions', 'least common denominator'],
    schema: { name: 'TheCalcPro Rational Equations Tool', description: 'Algebraic solver for equations with algebraic fractions.', category: 'AlgebraicApplication' },
    faqs: [
      { question: 'How do you solve a rational equation?', answer: 'First, find the common denominator for all fractions. Multiply every term in the equation by this denominator to eliminate all fractions. Solve the resulting equation, but always check your final answers to ensure they don\'t make any original denominator equal to zero.' },
      { question: 'What is an extraneous solution?', answer: 'An extraneous solution is a number obtained from solving the modified equation that is not a valid solution to the original equation because it causes division by zero.' }
    ],
    steps: [
      { title: 'Find Restricted Values', content: 'Identify values of the variable that make any denominator zero.' },
      { title: 'Multiply by LCD', content: 'Find the Least Common Denominator and multiply the entire equation by it.' },
      { title: 'Solve and Verify', content: 'Solve the cleared equation and eliminate any extraneous solutions.' }
    ]
  },
  {
    slug: 'absolute-value-equation-solver',
    title: 'Absolute Value Equation Solver',
    subtitle: 'Solve equations involving absolute values',
    description: 'Solve equations of the form |ax + b| = c by breaking them into two separate equations and finding all possible solutions.',
    overview: 'The Absolute Value Equation Solver handles equations containing modulus or absolute value signs. The engine isolates the absolute value expression, then splits the equation into its two constituent parts (ax+b = c and ax+b = -c). It solves both equations simultaneously, showing the algebraic steps for each branch, and clearly displays both valid solutions (or indicates no solution if c is negative).',
    intentKeywords: ['absolute value equation calculator steps', 'solve modulus equation algebra', 'equations with absolute value bars', 'two solutions absolute value'],
    category: 'Algebra',
    type: 'algebra',
    keywords: ['absolute value', 'modulus', 'algebra calculator', 'equation solver'],
    schema: { name: 'TheCalcPro Absolute Value Solver', description: 'Solver for absolute value equations with branched step-by-step logic.', category: 'AlgebraicApplication' },
    faqs: [
      { question: 'How do you solve an absolute value equation?', answer: 'First, isolate the absolute value expression on one side. If the other side is a positive number c, split the equation into two cases: inside = c, and inside = -c. Solve both resulting equations to find all solutions.' },
      { question: 'Can an absolute value equation have no solution?', answer: 'Yes. If the isolated absolute value expression equals a negative number (e.g., |x| = -5), there is no solution, because the absolute value of any real number is always non-negative.' }
    ],
    steps: [
      { title: 'Isolate Absolute Value', content: 'Move all other terms away from the absolute value expression.' },
      { title: 'Create Two Cases', content: 'Set the expression inside the bars equal to both the positive and negative value of the other side.' },
      { title: 'Solve Both Branches', content: 'Perform algebraic operations to find the values of x for both cases.' }
    ]
  },
  {
    slug: 'simpsons-rule-calculator',
    title: 'Simpson\'s Rule Calculator',
    subtitle: 'Approximate definite integrals numerically',
    description: 'Use Simpson\'s 1/3 Rule or the Trapezoidal Rule to approximate the area under a curve using numerical integration techniques.',
    overview: 'The Simpson\'s Rule Calculator approximates definite integrals when a function cannot be integrated analytically. By dividing the integration interval into an even number of subintervals (n), it approximates the curve using parabolic arcs (Simpson\'s 1/3 rule) or straight lines (Trapezoidal rule). The engine generates a full table of x and y values and applies the numerical weighting formula to produce a highly accurate area estimation.',
    intentKeywords: ['simpsons rule numerical integration calculator', 'trapezoidal rule calculator with table', 'approximate definite integral area', 'simpsons 1/3 rule formula'],
    category: 'Calculus',
    type: 'calculus',
    keywords: ['simpson\'s rule', 'numerical integration', 'trapezoidal rule', 'calculus approximation'],
    schema: { name: 'TheCalcPro Numerical Integration Tool', description: 'Calculus calculator for numerical integration using Simpson\'s and Trapezoidal rules.', category: 'CalculusApplication' },
    faqs: [
      { question: 'What is Simpson\'s Rule?', answer: 'Simpson\'s Rule is a numerical method for approximating a definite integral. Instead of connecting points on the curve with straight lines (like the Trapezoidal rule), it connects groups of three points with parabolas, yielding a much more accurate approximation for smooth curves.' },
      { question: 'Why does Simpson\'s Rule require an even number of intervals?', answer: 'The standard Simpson\'s 1/3 Rule works by fitting a parabola to three consecutive points (which span two subintervals). Therefore, the total number of subintervals (n) across the entire integration range must be an even number.' }
    ],
    steps: [
      { title: 'Calculate Step Size (h)', content: 'Divide the interval length (b-a) by the number of subintervals (n).' },
      { title: 'Generate Data Table', content: 'Calculate the function value f(x) at each subinterval point.' },
      { title: 'Apply Weighting Formula', content: 'Multiply the y-values by the Simpson\'s 1-4-2-4-1 pattern and sum the results.' }
    ]
  },
  {
    slug: 'critical-points-calculator',
    title: 'Critical Points Calculator',
    subtitle: 'Find local maxima, minima, and saddle points',
    description: 'Determine the critical points of a function by finding where the first derivative is zero or undefined, and classify them using the first derivative test.',
    overview: 'The Critical Points Calculator analyzes a function to find its peaks, valleys, and plateaus. It computes the first derivative f\'(x) and solves for x when f\'(x) = 0. The engine then uses the First Derivative Test, creating a sign chart to evaluate the slope on intervals around each critical point, classifying each one as a local maximum, local minimum, or neither.',
    intentKeywords: ['find critical points of a function calculator', 'first derivative test solver', 'local maxima and minima calculator', 'where is derivative zero'],
    category: 'Calculus',
    type: 'calculus',
    keywords: ['critical points', 'local maximum', 'local minimum', 'first derivative test', 'calculus'],
    schema: { name: 'TheCalcPro Critical Points Tool', description: 'Calculus solver for finding critical points and local extrema.', category: 'CalculusApplication' },
    faqs: [
      { question: 'What is a critical point?', answer: 'A critical point of a function is a point on the graph where the first derivative is either zero (horizontal tangent) or undefined. These are the candidate points for local maximums and minimums.' },
      { question: 'How do you classify a critical point?', answer: 'Use the First Derivative Test. If the derivative changes from positive to negative at the point, it is a local maximum. If it changes from negative to positive, it is a local minimum. If the sign doesn\'t change, it is neither.' }
    ],
    steps: [
      { title: 'Find First Derivative', content: 'Compute f\'(x) using differentiation rules.' },
      { title: 'Solve f\'(x) = 0', content: 'Find the x-values that make the derivative zero or undefined.' },
      { title: 'Classify Extrema', content: 'Test intervals around the critical points to determine max, min, or saddle points.' }
    ]
  },
  {
    slug: 'solar-panel-calculator',
    title: 'Solar Panel Calculator',
    subtitle: 'Estimate system size, savings, and payback period',
    description: 'Calculate solar panel system size (kW), annual kWh production, 25-year lifecycle savings, and payback period using real irradiance and efficiency coefficients.',

    overview:
      'The Solar Panel Calculator models residential and commercial PV systems using the '
      + 'production formula: Annual kWh = System Size (kW) × Peak Sun Hours × 365 × '
      + 'efficiency factor (0.75–0.85 accounting for inverter losses, shading, and '
      + 'temperature derating). It derives the required system size from your monthly '
      + 'electricity bill and local utility rate, computes 25-year lifecycle savings '
      + 'against a 3% annual utility inflation model, and calculates a simple payback '
      + 'period in years (install cost ÷ annual savings). Federal ITC (30%) and optional '
      + 'state incentives are applied before payback computation.',

    intentKeywords: [
      'how many solar panels do I need calculator',
      'solar system size from electricity bill',
      'solar payback period calculator',
      '25-year solar savings projection',
      'kWh production from solar panels',
      'solar panel ROI calculator',
      'federal solar tax credit ITC 30 percent',
      'residential solar energy cost savings',
    ],

    category: 'Energy',
    type: 'utility',
    keywords: ['solar panel calculator', 'solar system size', 'solar payback period', 'kWh production', 'solar savings', 'PV system calculator'],
    schema: {
      name: 'TheCalcPro Solar Panel Calculator',
      description: 'PV system sizing tool with 25-year lifecycle savings and payback period projection.',
      category: 'UtilityApplication',
    },
    faqs: [
      {
        question: 'How do I calculate how many solar panels I need?',
        answer:
          'Divide your average monthly kWh usage by the average monthly sun hours for your location, '
          + 'then divide by the wattage per panel (typically 400 W). For example, 1,000 kWh/month '
          + 'in a region with 150 peak sun-hours per month requires about 1,000 ÷ 150 ÷ 0.4 = '
          + '16–17 panels at 400 W each, before applying a 15–20% efficiency correction.'
      },
      {
        question: 'What is a solar payback period?',
        answer:
          'The payback period is the number of years it takes for your cumulative energy savings '
          + 'to equal the upfront installation cost net of incentives. It is calculated as '
          + '(Net Install Cost) ÷ (Annual kWh × Utility Rate). With the 30% federal ITC, '
          + 'most residential systems achieve payback in 6–10 years.'
      },
      {
        question: 'What efficiency factor should I use for my solar system?',
        answer:
          'A conservative overall system efficiency of 75–80% (also called the performance ratio) '
          + 'accounts for inverter conversion losses (~4%), temperature derating (~7%), wiring '
          + 'resistance (~2%), and typical shading or soiling (~5%). High-quality modern systems '
          + 'in optimal conditions can achieve 82–85%.'
      },
      {
        question: 'Does the 30% federal solar tax credit apply to all systems?',
        answer:
          'The Investment Tax Credit (ITC) allows you to deduct 30% of the total installed cost '
          + 'of a solar system from your federal income taxes through 2032 for both residential '
          + 'and commercial installations. You must have a federal tax liability to benefit; '
          + 'unused credit can be carried forward to subsequent tax years.'
      },
    ],
    steps: [
      { title: 'Enter Monthly Bill & Rate', content: 'Input your average monthly electricity bill and your utility rate ($/kWh) to derive monthly kWh consumption.' },
      { title: 'Set Peak Sun Hours', content: 'Enter the daily peak sun hours for your location (e.g. 4.5 h for the US average) — this drives annual production.' },
      { title: 'Size the System', content: 'System size (kW) = Monthly kWh ÷ (Peak Sun Hours × 30 × 0.80 efficiency).' },
      { title: 'Apply Federal ITC', content: 'Multiply total install cost (kW × $/kW) by 0.70 to get net cost after the 30% tax credit.' },
      { title: 'Project 25-Year Savings', content: 'Sum annual savings compounded at 3% utility inflation, subtract net install cost to show total lifecycle return.' },
    ],
  },
  {
    slug: 'electric-load-calculator',
    title: 'Electric Load Calculator',
    subtitle: 'NEC demand-factor electrical load analysis',
    description: 'Calculate total electrical load in watts and amperes using NEC Article 220 demand factors for general lighting, HVAC, small appliances, and large loads.',

    overview:
      'The Electric Load Calculator applies NEC Article 220 demand-factor methodology to '
      + 'estimate a building\'s total electrical service load. General lighting load is '
      + 'computed at 3 VA/ft² (residential) or per-occupancy table values (commercial). '
      + 'The first 3,000 VA of small-appliance and laundry branch circuits are taken at '
      + '100% demand; the next 117,000 VA at 35%; and the remainder at 25%, per NEC '
      + 'Table 220.42. HVAC uses the larger of heating or cooling load at 100%. The engine '
      + 'sums all demand-adjusted loads, divides by service voltage (120/240 V single-phase '
      + 'or 208/480 V three-phase), and outputs the minimum service ampacity.',

    intentKeywords: [
      'NEC electrical load calculation residential',
      'demand factor calculation NEC Article 220',
      'electrical service size calculator',
      'total connected load vs demand load',
      'ampere service panel size calculator',
      'commercial building electrical load estimate',
      'HVAC heating cooling load NEC',
      'how to size electrical service panel',
    ],

    category: 'Engineering',
    type: 'utility',
    keywords: ['electric load calculator', 'NEC demand factor', 'electrical service size', 'ampere calculation', 'watt load calculator'],
    schema: {
      name: 'TheCalcPro Electric Load Calculator',
      description: 'NEC Article 220 demand-factor electrical load analysis for residential and commercial buildings.',
      category: 'UtilityApplication',
    },
    faqs: [
      {
        question: 'What is a demand factor in electrical calculations?',
        answer:
          'A demand factor is the ratio of the maximum demand on a system to the total connected load. '
          + 'Because not all loads run simultaneously at full capacity, the NEC allows you to reduce '
          + 'the connected load by a demand factor percentage when sizing conductors and service '
          + 'equipment. For example, the NEC applies a 35% demand factor to general lighting loads '
          + 'between 3,001 VA and 120,000 VA for dwelling units.'
      },
      {
        question: 'How do I calculate the electrical load for a house?',
        answer:
          'Per NEC 220.12, start with 3 VA × gross square footage for general lighting. Add '
          + 'two 1,500-VA small-appliance circuits and one 1,500-VA laundry circuit. Apply '
          + 'NEC Table 220.42 demand factors (100% on first 3,000 VA, 35% on next 117,000 VA). '
          + 'Add 100% of the nameplate rating for all fixed appliances and the larger of '
          + 'heating or cooling load. Divide the total VA by the service voltage to get amps.'
      },
      {
        question: 'What service panel size do I need?',
        answer:
          'Most modern single-family homes require 200-amp service. If the calculated total '
          + 'demand load divided by 240 V is less than 100 A, a 100-amp panel may suffice; '
          + '101–160 A suggests 150–200 A service. EV chargers, hot tubs, and electric '
          + 'vehicles may push requirements to 320–400 A for high-demand homes.'
      },
      {
        question: 'Should I use heating or cooling load for HVAC in the NEC calculation?',
        answer:
          'NEC 220.60 (non-coincident loads) allows you to omit the smaller of two loads '
          + 'that will never run simultaneously. For most climates, you include 100% of the '
          + 'larger HVAC load (whichever of heating or cooling draws more amperes) and '
          + 'exclude the smaller one from the service calculation.'
      },
    ],
    steps: [
      { title: 'Enter Floor Area', content: 'Input gross square footage — general lighting load = 3 VA/ft² for residential.' },
      { title: 'Add Branch Circuits', content: 'Include small-appliance (2 × 1,500 VA) and laundry (1,500 VA) branch circuit loads.' },
      { title: 'Apply NEC Demand Factors', content: 'Use NEC Table 220.42: 100% on first 3,000 VA, 35% on next 117,000 VA, 25% on remainder.' },
      { title: 'Add Fixed & HVAC Loads', content: 'Sum 100% nameplate ratings for fixed appliances and include larger of heating or cooling.' },
      { title: 'Compute Service Ampacity', content: 'Divide total demand VA by service voltage (240 V single-phase) to determine minimum amps.' },
    ],
  },
  {
    slug: 'concrete-slab-calculator',
    title: 'Concrete Slab Calculator',
    subtitle: 'Cubic yards, bags, and cost for any concrete pour',
    description: 'Calculate concrete volume in cubic yards and cubic feet, number of 60 lb or 80 lb bags required, and total material cost for slabs, footings, and columns.',

    overview:
      'The Concrete Slab Calculator converts slab dimensions to volume using '
      + 'V = Length × Width × Thickness (all converted to feet before multiplication, '
      + 'then divided by 27 to yield cubic yards). A 10% waste/overpour factor is '
      + 'added automatically to prevent short pours. The engine then divides total '
      + 'volume by the yield per bag (0.45 ft³ for 60 lb bags, 0.60 ft³ for 80 lb bags) '
      + 'to compute bag count, rounds up to the nearest whole bag, and multiplies by '
      + 'the entered unit cost to produce a total material estimate.',

    intentKeywords: [
      'concrete slab calculator cubic yards',
      'how many bags of concrete do I need',
      'concrete volume calculator feet to yards',
      'concrete cost estimator per yard',
      '80 lb bag concrete yield calculator',
      'footing concrete calculator',
      'concrete pour volume with waste factor',
      'slab thickness cubic yards calculator',
    ],

    category: 'Construction',
    type: 'utility',
    keywords: ['concrete calculator', 'cubic yards concrete', 'concrete bags calculator', 'slab calculator', 'concrete cost estimator'],
    schema: {
      name: 'TheCalcPro Concrete Slab Calculator',
      description: 'Concrete volume, bag count, and cost estimator with waste factor for slabs and footings.',
      category: 'UtilityApplication',
    },
    faqs: [
      {
        question: 'How do I calculate cubic yards of concrete?',
        answer:
          'Convert all dimensions to feet (1 inch = 0.0833 ft), multiply Length × Width × Thickness '
          + 'to get cubic feet, then divide by 27 to convert to cubic yards (since 1 yd³ = 27 ft³). '
          + 'Always add a 10% overage for waste, spillage, and uneven subgrade.'
      },
      {
        question: 'How many 80 lb bags of concrete make a cubic yard?',
        answer:
          'One 80 lb bag of premixed concrete yields approximately 0.60 cubic feet when mixed. '
          + 'Since one cubic yard = 27 cubic feet, you need 27 ÷ 0.60 ≈ 45 bags per cubic yard. '
          + 'For 60 lb bags (yield 0.45 ft³ each), you need about 60 bags per cubic yard.'
      },
      {
        question: 'What thickness should a concrete slab be?',
        answer:
          'Standard residential driveway slabs are 4 inches thick (6 inches for heavy vehicles). '
          + 'Sidewalks and patios are typically 4 inches. Structural slabs and garage floors '
          + 'range from 4 to 6 inches. Footings are typically 8–12 inches thick depending on '
          + 'load and local frost depth requirements.'
      },
      {
        question: 'Why add a 10% waste factor to concrete orders?',
        answer:
          'Concrete volume calculations assume perfectly level subgrades and exact form dimensions. '
          + 'In practice, subgrade irregularities, form flex under pressure, spillage during '
          + 'pouring, and pump line residuals typically consume 5–10% additional material. '
          + 'Ordering short is costly — running out mid-pour creates cold joints that weaken the slab.'
      },
    ],
    steps: [
      { title: 'Enter Dimensions', content: 'Input slab length and width in feet, and thickness in inches.' },
      { title: 'Convert & Compute Volume', content: 'Convert thickness to feet (÷ 12), multiply L × W × T for cubic feet, divide by 27 for cubic yards.' },
      { title: 'Apply Waste Factor', content: 'Add 10% overage: Total yd³ = Volume × 1.10.' },
      { title: 'Count Bags', content: 'Divide total cubic feet by bag yield (0.60 ft³ for 80 lb, 0.45 ft³ for 60 lb) and round up.' },
      { title: 'Estimate Cost', content: 'Multiply bag count by cost per bag to get total material cost.' },
    ],
  },
  {
    slug: 'cash-on-cash-calculator',
    title: 'Cash-on-Cash Return Calculator',
    subtitle: 'Analyze rental property investment yield',
    description: 'Calculate cash-on-cash return, net operating income (NOI), cap rate, and annual cash flow for rental properties using actual cash invested and pre-tax income.',

    overview:
      'The Cash-on-Cash Return Calculator computes CoC = Annual Pre-Tax Cash Flow ÷ '
      + 'Total Cash Invested × 100%, where Annual Pre-Tax Cash Flow = Gross Rental '
      + 'Income − Operating Expenses − Annual Debt Service (mortgage P&I). Net '
      + 'Operating Income (NOI) is computed as Gross Income × (1 − Vacancy Rate) − '
      + 'Operating Expenses (taxes, insurance, maintenance, management). The cap rate '
      + 'is shown as NOI ÷ Property Value × 100%. The engine separates NOI from cash '
      + 'flow so investors can compare leveraged (CoC) versus unlevered (cap rate) yield.',

    intentKeywords: [
      'cash on cash return calculator rental property',
      'how to calculate cash on cash return',
      'NOI cap rate calculator real estate',
      'rental property cash flow calculator',
      'real estate investment yield analysis',
      'leveraged vs unlevered real estate return',
      'cap rate vs cash on cash difference',
      'rental property ROI annual cash flow',
    ],

    category: 'Finance',
    type: 'utility',
    keywords: ['cash on cash return', 'rental property calculator', 'NOI calculator', 'cap rate calculator', 'real estate cash flow'],
    schema: {
      name: 'TheCalcPro Cash-on-Cash Calculator',
      description: 'Real estate investment analyzer computing CoC return, NOI, cap rate, and annual cash flow.',
      category: 'FinanceApplication',
    },
    faqs: [
      {
        question: 'What is cash-on-cash return in real estate?',
        answer:
          'Cash-on-cash (CoC) return measures the annual pre-tax cash income earned on the '
          + 'actual cash you invested (down payment + closing costs + renovation). Unlike '
          + 'ROI, it excludes appreciation and principal paydown — it only captures the '
          + 'income yield on your out-of-pocket equity. A CoC of 6–10% is generally '
          + 'considered a solid return for residential rentals.'
      },
      {
        question: 'How is cash-on-cash return different from cap rate?',
        answer:
          'Cap rate = NOI ÷ Property Value and measures unlevered yield (as if you paid '
          + 'all cash). Cash-on-cash accounts for financing by subtracting mortgage payments '
          + 'before dividing by equity invested. A property with a 7% cap rate may yield '
          + '10%+ CoC with leverage, or below cap rate if loan terms are unfavorable.'
      },
      {
        question: 'What expenses go into Net Operating Income?',
        answer:
          'NOI = Effective Gross Income − Operating Expenses. Operating expenses include '
          + 'property taxes, insurance, property management fees (typically 8–10%), '
          + 'maintenance/repairs (1% of value/year is a common estimate), vacancy loss '
          + '(5–10% of gross rent), and utilities paid by the owner. Mortgage payments '
          + 'are NOT included in NOI — they appear below the line in cash flow.'
      },
      {
        question: 'What is a good cash-on-cash return for rental property?',
        answer:
          'Most real estate investors target 6–10% CoC for stable residential properties. '
          + 'Value-add and commercial deals may target 10–15%. Markets with high appreciation '
          + 'potential (coastal cities) often trade at 3–5% CoC. Always weigh CoC alongside '
          + 'total return (appreciation + principal paydown + tax benefits) for a '
          + 'complete investment picture.'
      },
    ],
    steps: [
      { title: 'Enter Gross Rental Income', content: 'Input expected annual gross rent; apply vacancy rate to compute effective gross income.' },
      { title: 'Subtract Operating Expenses', content: 'Deduct taxes, insurance, management, maintenance to arrive at NOI.' },
      { title: 'Subtract Debt Service', content: 'Deduct annual mortgage payments (P&I) to get annual pre-tax cash flow.' },
      { title: 'Compute Cash Invested', content: 'Sum down payment, closing costs, and any initial renovation capital.' },
      { title: 'Calculate CoC & Cap Rate', content: 'CoC = Cash Flow ÷ Cash Invested × 100%; Cap Rate = NOI ÷ Property Value × 100%.' },
    ],
  },
  {
    slug: 'tdee-calculator',
    title: 'TDEE Calculator',
    subtitle: 'Total Daily Energy Expenditure with Mifflin-St Jeor',
    description: 'Calculate BMR using the Mifflin-St Jeor equation and multiply by your NEAT activity multiplier to get TDEE — your total daily calorie burn for weight management.',

    overview:
      'The TDEE Calculator uses the Mifflin-St Jeor equation — the most accurate '
      + 'BMR predictor for the general population per the Academy of Nutrition and '
      + 'Dietetics — to compute Basal Metabolic Rate: BMR = (10 × weight kg) + '
      + '(6.25 × height cm) − (5 × age) + 5 (men) or − 161 (women). The BMR is '
      + 'then multiplied by an activity factor (1.2 sedentary to 1.9 extra active) '
      + 'to yield TDEE. The engine outputs calorie targets for weight loss (TDEE − 500), '
      + 'maintenance (TDEE), and lean bulk (TDEE + 250), and breaks down the '
      + 'Mifflin-St Jeor coefficient application step by step.',

    intentKeywords: [
      'TDEE calculator Mifflin-St Jeor',
      'how to calculate total daily energy expenditure',
      'BMR to TDEE activity multiplier calculator',
      'calories to eat to lose weight calculator',
      'basal metabolic rate formula for men and women',
      'caloric deficit for weight loss calculator',
      'NEAT activity level calorie calculator',
      'maintenance calories calculator body weight',
    ],

    category: 'Health',
    type: 'utility',
    keywords: ['TDEE calculator', 'BMR calculator', 'Mifflin-St Jeor', 'calorie calculator', 'total daily energy expenditure', 'maintenance calories'],
    schema: {
      name: 'TheCalcPro TDEE Calculator',
      description: 'Mifflin-St Jeor BMR and TDEE calculator with activity multipliers and calorie targets.',
      category: 'HealthApplication',
    },
    faqs: [
      {
        question: 'What is the Mifflin-St Jeor equation?',
        answer:
          'The Mifflin-St Jeor equation estimates Basal Metabolic Rate (BMR) — the calories '
          + 'your body burns at complete rest. The formula is: Men: BMR = (10 × weight in kg) '
          + '+ (6.25 × height in cm) − (5 × age in years) + 5. Women: BMR = (10 × weight kg) '
          + '+ (6.25 × height cm) − (5 × age) − 161. It was validated in a 1990 study and '
          + 'consistently outperforms the older Harris-Benedict equation in accuracy.'
      },
      {
        question: 'What activity multiplier should I use for TDEE?',
        answer:
          'TDEE = BMR × Activity Factor, where: Sedentary (desk job, no exercise) = 1.2; '
          + 'Lightly Active (1–3 days/week exercise) = 1.375; Moderately Active (3–5 days) '
          + '= 1.55; Very Active (6–7 days hard exercise) = 1.725; Extra Active (physical '
          + 'job + hard exercise) = 1.9. Most people overestimate their activity level — '
          + 'when in doubt, choose the lower multiplier.'
      },
      {
        question: 'How many calories should I eat to lose weight?',
        answer:
          'A deficit of 500 kcal/day below TDEE produces approximately 0.45 kg (1 lb) of '
          + 'fat loss per week, since 3,500 kcal ≈ 1 lb of body fat. Do not go below '
          + 'BMR in caloric intake — very low calorie diets cause muscle catabolism and '
          + 'metabolic adaptation. A moderate deficit of 300–500 kcal/day is sustainable '
          + 'and preserves lean mass, especially when paired with adequate protein intake.'
      },
      {
        question: 'What is the difference between BMR and TDEE?',
        answer:
          'BMR (Basal Metabolic Rate) is the energy your body needs to sustain basic '
          + 'physiological functions (breathing, circulation, organ function) at complete rest. '
          + 'TDEE (Total Daily Energy Expenditure) adds all physical activity on top of BMR. '
          + 'TDEE is your true maintenance calorie level — the number of calories you burn '
          + 'per day given your actual lifestyle.'
      },
    ],
    steps: [
      { title: 'Enter Biometrics', content: 'Provide weight (kg or lbs), height (cm or ft/in), age, and biological sex for the Mifflin-St Jeor formula.' },
      { title: 'Compute BMR', content: 'Men: (10×kg) + (6.25×cm) − (5×age) + 5. Women: same formula −161 instead of +5.' },
      { title: 'Select Activity Level', content: 'Choose your NEAT multiplier from Sedentary (1.2) to Extra Active (1.9).' },
      { title: 'Calculate TDEE', content: 'TDEE = BMR × Activity Multiplier — this is your daily maintenance calorie target.' },
      { title: 'Output Calorie Targets', content: 'Display weight loss (TDEE−500), maintenance (TDEE), and lean bulk (TDEE+250) goals.' },
    ],
  },
  {
    slug: 'sleep-calculator',
    title: 'Sleep Time Calculator',
    subtitle: 'Optimal Sleep Cycle Finder',
    description: 'Calculate the perfect time to go to bed or wake up. Optimize your 90-minute sleep cycles to wake up feeling refreshed and eliminate morning grogginess.',
    overview: 'The Sleep Time Calculator operates on the biological principle of human circadian rhythms, plotting out sequential 90-minute REM cycles. To prevent sleep inertia (waking up groggy mid-cycle), the engine backwards-calculates from your target alarm time, adding a standard 15-minute buffer to fall asleep. It provides precise times to target 3, 4, 5, or 6 complete sleep cycles, highlighting 5 cycles (7.5 hours) as the optimal adult recommendation.',
    intentKeywords: [
      'sleep calculator',
      'when should I go to bed',
      'what time to wake up calculator',
      '90 minute sleep cycle calculator',
      'prevent sleep inertia',
      'how many hours of sleep',
      'REM cycle alarm calculator'
    ],
    category: 'Health & Fitness',
    type: 'utility',
    keywords: ['sleep calculator', 'sleep cycles', 'bedtime calculator', 'wake up time', 'sleep inertia', 'circadian rhythm'],
    schema: {
      name: 'TheCalcPro Sleep Time Calculator',
      description: 'Calculate optimal sleep cycles to wake up refreshed. Avoid morning grogginess by aligning your alarm with natural 90-minute REM intervals.',
      category: 'HealthApplication',
    },
    faqs: [
      { question: 'Why am I groggy when I wake up after 8 hours of sleep?', answer: 'Waking up in the middle of deep sleep causes "sleep inertia," a feeling of grogginess. Since a full sleep cycle is roughly 90 minutes, sleeping exactly 8 hours means your alarm interrupts a cycle. Sleeping for 7.5 hours (exactly 5 cycles) often leaves you feeling more refreshed.' },
      { question: 'How long does it take to fall asleep?', answer: 'The average adult takes 10 to 20 minutes to fall asleep (sleep latency). This calculator automatically builds a 15-minute buffer into all bedtimes so your cycles begin accurately.' },
      { question: 'How many sleep cycles do I need?', answer: 'Most adults require 4 to 5 complete sleep cycles per night, totaling 6 to 7.5 hours of sleep. The optimal recommendation for maximum restoration and lowest sleep inertia is 5 cycles.' }
    ],
    steps: [
      { title: 'Select Mode', content: 'Choose whether you want to wake up at a specific time or go to bed right now.' },
      { title: 'Enter Time', content: 'Input your target wake time.' },
      { title: 'Calculate Cycles', content: 'The engine adds a 15-minute buffer, then measures out 90-minute intervals backwards (or forwards).' },
      { title: 'Find Optimal Bedtime', content: 'Select the recommended 5-cycle (7.5 hours) target to wake up feeling completely refreshed.' }
    ],
  },
  {
    slug: 'fire-calculator',
    title: 'FIRE Calculator',
    subtitle: 'Compound Interest & Early Retirement Planner',
    description: 'Plan your early retirement with our free FIRE calculator. Project compound interest, calculate your 4% safe withdrawal rate, and find your financial independence number.',
    overview: 'The FIRE Calculator projects year-over-year portfolio growth using future value annuity math to pinpoint the exact crossover year when your investments can safely sustain your target annual retirement income indefinitely.',
    intentKeywords: [
      'FIRE calculator',
      'financial independence retire early',
      'compound interest with monthly contributions',
      '4% safe withdrawal rate calculator',
      'how to find my FIRE number',
      'early retirement planner'
    ],
    category: 'Finance',
    type: 'utility',
    keywords: ['FIRE calculator', 'compound interest', 'early retirement', 'financial independence', '4 percent rule'],
    schema: {
      name: 'TheCalcPro FIRE & Compound Interest Calculator',
      description: 'Calculate your exact Financial Independence (FIRE) number. Model your compound interest and monthly contributions to find out when you can retire.',
      category: 'FinanceApplication',
    },
    faqs: [
      { question: 'What is the FIRE movement 4% rule?', answer: 'The 4% rule states you can safely withdraw 4% of your invested portfolio your first year of retirement, adjusting for inflation subsequently, without running out of money over 30 years.' },
      { question: 'How do I calculate my FIRE number?', answer: 'Multiply your desired annual retirement income by 25. If you want $40,000 a year, your FIRE number is $1,000,000.' },
      { question: 'Does compound interest include monthly contributions?', answer: 'Yes, our calculator compounds both your initial principal and your recurring monthly investments to project your true portfolio growth.' }
    ],
    steps: [
      { title: 'Define Financial Baseline', content: 'Input your current principal savings and recurring monthly contribution.' },
      { title: 'Set Target Retirement Income', content: 'Enter the annual income you need to live on comfortably in retirement.' },
      { title: 'Calculate FIRE Number', content: 'The engine multiplies your target income by 25 based on the 4% safe withdrawal rule.' },
      { title: 'Project Compound Growth', content: 'Review the year-by-year amortization table to find the exact year your balance crosses the FIRE target.' }
    ],
  }
]
