import { solversData } from '../config/solversData'

export interface SmartParseResult {
  url: string | null;
  error?: string;
}

export function parseSmartQuery(rawInput: string): SmartParseResult {
  const input = rawInput.toLowerCase().trim();
  
  if (!input) return { url: null, error: 'Empty query' };

  // NLP Routing Keyword Mapping
  // Ordered by priority
  const keywordMap: { keywords: string[], slug: string, exactRoute?: string }[] = [
    { keywords: ['derivative', 'derive', 'd/dx', 'differentiate'], slug: 'derivative-calculator' },
    { keywords: ['integral', 'integrate', 'antiderivative'], slug: 'integral-calculator' },
    { keywords: ['limit', 'l\'hopital', 'lhopital'], slug: 'limit-calculator' },
    { keywords: ['quadratic', 'roots of', 'solve x^2', 'solve equation'], slug: 'quadratic-equation-solver' },
    { keywords: ['standard deviation', 'variance', 'z-score', 't-test'], slug: 'standard-deviation-calculator' }, // Route to stats umbrella or specific if added
    { keywords: ['volume of cylinder', 'cylinder volume'], slug: 'cylinder-volume-calculator' },
    { keywords: ['volume of sphere', 'sphere volume'], slug: 'sphere-volume-calculator' },
    { keywords: ['area of triangle', 'triangle area'], slug: 'triangle-area-calculator' },
    { keywords: ['matrix inverse', 'inverse matrix'], slug: 'matrix-inverse-calculator' },
    { keywords: ['eigenvalue', 'eigenvector'], slug: 'eigenvalue-calculator' },
    { keywords: ['graph', 'plot', 'sketch'], slug: '', exactRoute: '/grapher' },
    { keywords: ['scientific calculator', 'calculate'], slug: '', exactRoute: '/scientific' },
  ];

  let matchedSlug: string | null = null;
  let exactRoute: string | null = null;
  let payload = '';

  // 1. Check keyword maps
  for (const mapping of keywordMap) {
    const matchedWord = mapping.keywords.find(kw => input.includes(kw));
    if (matchedWord) {
      if (mapping.exactRoute) exactRoute = mapping.exactRoute;
      else matchedSlug = mapping.slug;
      
      // Extract payload (everything after the keyword)
      const afterKeyword = input.substring(input.indexOf(matchedWord) + matchedWord.length).trim();
      // Remove connecting words like "of", "for", "equation"
      payload = afterKeyword.replace(/^(of|for|equation)\s+/i, '').trim();
      break;
    }
  }

  // 2. Fallback check against solversData titles & keywords if no hardcoded map matched
  if (!matchedSlug && !exactRoute) {
    const fallbackSolver = solversData.find(s => 
      s.title.toLowerCase().includes(input) || 
      (s.keywords && s.keywords.some(k => input.includes(k.toLowerCase())))
    );
    if (fallbackSolver) {
      matchedSlug = fallbackSolver.slug;
    }
  }

  // 3. Construct Target URL
  if (exactRoute) {
    return { url: `${exactRoute}${payload ? `?query=${encodeURIComponent(payload)}` : ''}` };
  }

  if (matchedSlug) {
    return { url: `/solvers/${matchedSlug}${payload ? `?query=${encodeURIComponent(payload)}` : ''}` };
  }

  // No match found
  return { url: null, error: 'Tool not found. Try searching for "derivative", "graph", or "quadratic".' };
}
