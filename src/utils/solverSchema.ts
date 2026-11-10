import type { SolverConfig, SolverType } from '../config/solversData'

/**
 * Programmatic JSON-LD builder for /solvers/$slug pages.
 *
 * Emits a single @graph containing:
 *  - WebPage            (#webpage)  — page-level entity, links everything together
 *  - WebApplication     (#app)      — the interactive tool itself
 *      + LearningResource           — for every math/statistics tool
 *      + MathSolver                 — ONLY when the page's engine really solves a
 *                                     `?query=` expression on load (see MATH_SOLVER_SLUGS)
 *  - HowTo              (#howto)    — built from solver.steps
 *  - BreadcrumbList     (#breadcrumb)
 *
 * Organization / WebSite are referenced by @id and defined once in __root.tsx.
 */

const SITE = 'https://thecalcpro.com'
const ORG_ID = `${SITE}/#organization`
const WEBSITE_ID = `${SITE}/#website`

/**
 * Slugs whose rendered engine reads `?query=` and auto-solves on mount.
 * Google's MathSolver markup requires the SolveMathAction target URL to return
 * a solved problem, so only list a slug here if that is literally true.
 *  - AlgebraSolver  → linear + quadratic equations only
 *  - CalculusSolver → symbolic derivatives only (mathjs `derivative`)
 */
const MATH_SOLVER_SLUGS: Record<string, string[]> = {
  'quadratic-equation-solver': ['Quadratic Equation', 'Polynomial Equation'],
  'quadratic-discriminant-calculator': ['Quadratic Equation', 'Polynomial Equation'],
  'linear-equation-solver': ['Linear Equation'],
  'derivative-calculator': ['Derivative', 'Calculus'],
}

const HUB_ROUTES: Partial<Record<SolverType, { name: string; path: string }>> = {
  algebra: { name: 'Algebra', path: '/algebra' },
  calculus: { name: 'Calculus', path: '/calculus' },
  geometry: { name: 'Geometry', path: '/geometry' },
  statistics: { name: 'Statistics', path: '/statistics' },
  grapher: { name: 'Graphing', path: '/grapher' },
  matrix: { name: 'Matrix', path: '/matrix' },
}

const EDUCATIONAL_LEVEL: Partial<Record<SolverType, string>> = {
  algebra: 'High School',
  geometry: 'Middle School, High School',
  statistics: 'High School, Undergraduate',
  calculus: 'High School, Undergraduate',
  matrix: 'Undergraduate',
  grapher: 'High School, Undergraduate',
}

const TYPE_FEATURES: Record<SolverType, string[]> = {
  algebra: ['Exact and decimal roots', 'Discriminant analysis', 'Formula display with substituted values'],
  calculus: ['Symbolic differentiation', 'Power, product, quotient and chain rule support', 'Rendered math notation'],
  geometry: ['Area, volume and surface area results', 'Live shape visualization', 'Formula display with substituted values'],
  statistics: ['Paste data directly from Excel or Google Sheets', 'Sample and population metrics', 'Frequency distribution chart'],
  grapher: ['Plot multiple functions at once', 'Asymptote detection', 'Zoom and pan'],
  matrix: ['2×2 and 3×3 matrix support', 'Determinant and inverse', 'Step-by-step row operations'],
  utility: ['Instant recalculation as you type', 'Clear breakdown of every input', 'Metric and imperial friendly inputs'],
}

/** Google-recognised applicationCategory values. */
function applicationCategory(solver: SolverConfig): string {
  if (solver.type !== 'utility') return 'EducationalApplication'
  const c = solver.category.toLowerCase()
  if (c.includes('finance')) return 'FinanceApplication'
  if (c.includes('health')) return 'HealthApplication'
  return 'BusinessApplication' // Energy, Engineering, Construction
}

export function buildSolverSchema(solver: SolverConfig, opts: { hasEngine?: boolean } = {}) {
  const { hasEngine = true } = opts
  const url = `${SITE}/solvers/${solver.slug}`
  const isUtility = solver.type === 'utility'
  const mathSolverTypes = MATH_SOLVER_SLUGS[solver.slug]
  const isMathSolver = Boolean(mathSolverTypes)
  const hub = HUB_ROUTES[solver.type]

  const appTypes = isUtility
    ? 'WebApplication'
    : isMathSolver
      ? ['WebApplication', 'MathSolver', 'LearningResource']
      : ['WebApplication', 'LearningResource']

  const app: Record<string, unknown> = {
    '@type': appTypes,
    '@id': `${url}#app`,
    name: solver.title,
    url,
    description: solver.description,
    ...(solver.overview ? { abstract: solver.overview } : {}),
    keywords: [...solver.keywords, ...(solver.intentKeywords ?? [])].join(', '),
    inLanguage: 'en',
    image: `${SITE}/icons/icon-512.png`,
    applicationCategory: applicationCategory(solver),
    applicationSubCategory: solver.category,
    operatingSystem: 'Windows, macOS, Linux, Android, iOS, ChromeOS',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    isAccessibleForFree: true,
    featureList: [
      solver.subtitle,
      ...TYPE_FEATURES[solver.type],
      'Step-by-step explanation',
      'Shareable result links',
      '100% client-side — no data stored',
    ],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    publisher: { '@id': ORG_ID },
    creator: { '@id': ORG_ID },
    mainEntityOfPage: { '@id': `${url}#webpage` },
  }

  if (solver.formula) {
    app.about = {
      '@type': 'DefinedTerm',
      name: `${solver.title} formula`,
      description: solver.formula,
    }
  }

  if (!isUtility) {
    app.learningResourceType = isMathSolver ? 'Math solver' : 'Interactive calculator'
    app.educationalLevel = EDUCATIONAL_LEVEL[solver.type]
    app.teaches = solver.category
    app.usageInfo = `${SITE}/terms-of-service`
  }

  if (isMathSolver) {
    app.assesses = mathSolverTypes
    app.potentialAction = {
      '@type': 'SolveMathAction',
      target: `${url}?query={math_expression_string}`,
      'mathExpression-input': 'required name=math_expression_string',
      eduQuestionType: mathSolverTypes,
    }
  }

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: solver.title,
      description: solver.description,
      inLanguage: 'en',
      isPartOf: { '@id': WEBSITE_ID },
      publisher: { '@id': ORG_ID },
      breadcrumb: { '@id': `${url}#breadcrumb` },
      ...(hasEngine ? { mainEntity: { '@id': `${url}#app` } } : {}),
    },
    ...(hasEngine ? [app] : []),
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        ...(hub ? [{ '@type': 'ListItem', position: 2, name: hub.name, item: `${SITE}${hub.path}` }] : []),
        { '@type': 'ListItem', position: hub ? 3 : 2, name: solver.title, item: url },
      ],
    },
  ]

  if (hasEngine && solver.steps.length > 0) {
    graph.push({
      '@type': 'HowTo',
      '@id': `${url}#howto`,
      name: `How to use the ${solver.title}`,
      description: solver.description,
      tool: { '@type': 'HowToTool', name: solver.title },
      step: solver.steps.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.title,
        text: s.content,
      })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

/** Serialize for a <script type="application/ld+json"> tag (prevents `</script>` breakout). */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
