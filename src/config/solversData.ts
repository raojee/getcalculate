export type SolverType = 'algebra' | 'geometry' | 'statistics' | 'grapher' | 'calculus' | 'matrix'

export interface SolverConfig {
  slug: string
  title: string
  subtitle: string
  description: string
  category: string
  type: SolverType
  keywords: string[]
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
    category: 'Algebra',
    type: 'algebra',
    keywords: ['quadratic formula', 'roots of equation', 'algebra solver', 'parabola vertex'],
    schema: {
      name: 'CalcPro Quadratic Solver',
      description: 'Advanced algebra tool for solving quadratic equations with real and complex root support.',
      category: 'AlgebraicApplication'
    },
    faqs: [
      {
        question: 'What is the quadratic formula?',
        answer: 'The quadratic formula is x = (-b ± √(b² - 4ac)) / 2a.'
      },
      {
        question: 'What happens if the discriminant is negative?',
        answer: 'If the discriminant (b² - 4ac) is negative, the equation has two complex (imaginary) roots.'
      }
    ],
    steps: [
      { title: 'Identify Coefficients', content: 'Extract a, b, and c from the standard form equation.' },
      { title: 'Calculate Discriminant', content: 'Compute Δ = b² - 4ac to determine root characteristics.' },
      { title: 'Apply Formula', content: 'Solve for x using the quadratic formula.' }
    ]
  },
  {
    slug: 'cylinder-volume-calculator',
    title: 'Cylinder Volume Calculator',
    subtitle: 'Calculate volume and surface area of cylinders',
    description: 'Enter radius and height to compute high-precision geometric metrics for any cylindrical object.',
    category: 'Geometry',
    type: 'geometry',
    keywords: ['cylinder volume', 'surface area of cylinder', 'geometric solver', '3d shapes'],
    schema: {
      name: 'CalcPro Cylinder Tool',
      description: 'Geometric visualizer for calculating cylindrical volume and surface area.',
      category: 'GeometryApplication'
    },
    faqs: [
      {
        question: 'How do I find the area of the base?',
        answer: 'The area of the base of a cylinder is A = πr², as it is a circle.'
      }
    ],
    steps: [
      { title: 'Enter Radius', content: 'Define the distance from the center to the edge of the circular base.' },
      { title: 'Enter Height', content: 'Provide the vertical distance between the two circular bases.' }
    ]
  },
  {
    slug: 'standard-deviation-calculator',
    title: 'Standard Deviation Solver',
    subtitle: 'Analyze dataset variability and spread',
    description: 'Compute population and sample standard deviation, variance, and mean for any numeric dataset.',
    category: 'Statistics',
    type: 'statistics',
    keywords: ['standard deviation', 'variance', 'statistical analysis', 'data spread'],
    schema: {
      name: 'CalcPro Statistics Visualizer',
      description: 'Data analysis tool for calculating standard deviation and variance with frequency charts.',
      category: 'StatisticsApplication'
    },
    faqs: [
      {
        question: 'What is standard deviation?',
        answer: 'Standard deviation is a measure of the amount of variation or dispersion of a set of values.'
      }
    ],
    steps: [
      { title: 'Input Dataset', content: 'Paste your comma-separated or newline-separated numeric data.' },
      { title: 'Analyze Spread', content: 'The engine computes mean and individual deviations instantly.' }
    ]
  }
]
