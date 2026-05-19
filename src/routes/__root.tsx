import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { ThemeProvider } from '../context/ThemeContext'
import AppLayout from '../components/layout/AppLayout'
import { NotFoundPage } from '../components/NotFound'
import '../styles.css'


export const Route = createRootRoute({
  notFoundComponent: NotFoundPage,
  head: () => ({
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
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
      },
      { rel: 'canonical', href: 'https://thecalcpro.com' },
      { rel: 'manifest', href: '/manifest.webmanifest' },
      { rel: 'icon', href: '/favicon.ico' },
    ],

    scripts: [
      {
        async: true,
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8138211887478220',
        crossOrigin: 'anonymous',
      },
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
        }),
      },
    ],
  }),
  shellComponent: RootDocument,
  component: AppLayout,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('calcpro-theme') || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
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
