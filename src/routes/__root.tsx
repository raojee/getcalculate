import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { ThemeProvider } from '../context/ThemeContext'
import AppLayout from '../components/layout/AppLayout'
import { NotFoundPage } from '../components/NotFound'
import { ADS_CONFIG } from '../config/adsConfig'
import '../styles.css'


export const Route = createRootRoute({
  notFoundComponent: NotFoundPage,
  head: (ctx) => {
    // Derive the active pathname from the deepest (leaf) match
    const pathname = ctx.matches[ctx.matches.length - 1]?.pathname ?? '/'
    // Guard: never emit unresolved route patterns (containing $) as canonical URLs
    const resolvedPath = pathname.includes('$') ? '/' : pathname
    const canonicalUrl = `https://thecalcpro.com${resolvedPath === '/' ? '' : resolvedPath}`

    return ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'TheCalcPro — Free Online Math Platform' },
      {
        name: 'description',
        content:
          'TheCalcPro is a free all-in-one math platform with Algebra Solver, Trigonometry, Calculus, Equation Solver, Graph Plotter, Matrix Calculator and more. Step-by-step solutions.',
      },
      { name: 'keywords', content: 'calculator, algebra solver, calculus, trigonometry, equation solver, graph plotter, matrix calculator, math solver, online calculator' },
      { property: 'og:title', content: 'TheCalcPro — Free Online Math Platform' },
      { property: 'og:description', content: 'Free all-in-one math platform. Algebra, Calculus, Trigonometry, Graphing, Matrix and more with step-by-step solutions.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://thecalcpro.com' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'TheCalcPro — Free Online Math Platform' },
      { name: 'twitter:description', content: 'Free all-in-one math solver platform. No sign-up. No downloads.' },
      { name: 'theme-color', content: '#ff9d2e' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossOrigin: 'anonymous' },
      { rel: 'dns-prefetch', href: 'https://pagead2.googlesyndication.com' },
      { rel: 'canonical', href: canonicalUrl },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'icon', href: '/favicon.ico' },
    ],

    scripts: [
      ...(ADS_CONFIG.isAdSenseApproved
        ? [
            {
              async: true as const,
              src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8138211887478220',
              crossOrigin: 'anonymous' as const,
            },
          ]
        : []),

      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'TheCalcPro',
          url: 'https://thecalcpro.com',
          description: 'Free all-in-one math solving platform with step-by-step solutions.',
          applicationCategory: 'EducationApplication',
          operatingSystem: 'Web',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          sameAs: [
            'https://github.com/raojee',
            'https://www.facebook.com/profile.php?id=61590309694532',
            'https://www.youtube.com/@Thecalcpro',
          ],
        }),
      },
    ],
  })},
  shellComponent: RootDocument,
  component: AppLayout,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />

        {/* Ahrefs Web Analytics */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="SRTn2J8jrRq204RGYkFtTw"
          async
        />

        {/* ── Non-blocking async font loading (eliminates render-block on 4G) ── */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          as="style"
        />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
          as="style"
        />

        {/* Async stylesheet swap: preload fires onload to flip rel to stylesheet */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('calcpro-theme') || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              })();

              (function() {
                function loadCSS(href) {
                  var l = document.createElement('link');
                  l.rel = 'stylesheet';
                  l.href = href;
                  document.head.appendChild(l);
                }
                if (requestIdleCallback) {
                  requestIdleCallback(function() {
                    loadCSS('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
                    loadCSS('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css');
                  });
                } else {
                  window.addEventListener('load', function() {
                    loadCSS('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
                    loadCSS('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css');
                  });
                }
              })();

              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(console.error);
                });
              }
            `,
          }}
        />

        {/* No-JS fallback: load stylesheets synchronously if JS is disabled */}
        <noscript>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" />
        </noscript>
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>

        <Scripts />
      </body>
    </html>
  )
}
