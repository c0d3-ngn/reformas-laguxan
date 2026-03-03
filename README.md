# Construction & Renovation Corporate Website

Professional corporate website built with Astro, featuring modern design, performance optimization, and SEO best
practices for the construction industry.

## Features

- **Modern & Responsive Design**: Mobile-first approach with Tailwind CSS v4
- **View Transitions**: Smooth page navigation powered by Astro's ClientRouter
- **Project Portfolio**: Dynamic project gallery with infinite scroll and modal previews
- **Performance Optimized**: LCP, CLS, and INP metrics optimized for Core Web Vitals
- **SEO Ready**: Meta tags, structured data, and semantic HTML
- **Internationalization**: i18n support ready for multi-language expansion
- **Legal Pages**: Disclaimer, Privacy Policy, and Terms of Service included

## Tech Stack

- **Framework**: Astro 5.0
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide Astro
- **Animations**: tailwindcss-animate
- **Build**: Vite

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── home/           # Homepage sections (hero, pillars)
│   ├── services/       # Services grid
│   └── contact/       # Contact components
├── layouts/            # Page layouts
├── pages/              # Route-based pages
├── shared/             # Shared components and scripts
│   ├── components/    # Modal, Navbar, Footer components
│   └── scripts/        # TypeScript logic (mobile menu, projects)
├── styles/             # Global styles
├── utils/              # Helpers (i18n, assets, routes)
├── data/               # JSON data (projects)
└── locales/            # Translation files
```

## Commands

| Command        | Action                               |
| :------------- | :----------------------------------- |
| `pnpm install` | Install dependencies                 |
| `pnpm dev`     | Start dev server at `localhost:4321` |
| `pnpm build`   | Build for production in `./dist/`    |
| `pnpm preview` | Preview production build locally     |
| `pnpm format`  | Format code with Prettier            |
| `pnpm lint`    | Check code formatting                |

## Content Management

- **Projects**: Edit `src/data/projects.json` to add/modify portfolio items
- **Translations**: Modify `src/locales/es.json` for text content
- **Services**: Update service descriptions in the locales file using `services.N` keys

## SEO Optimization

This project includes comprehensive SEO features:

- **Semantic HTML**: Proper heading hierarchy (h1 → h2 → h3)
- **Meta Tags**: Title, description, Open Graph, and Twitter cards
- **Structured Data**: JSON-LD for organization and local business
- **Accessibility**: ARIA labels, semantic landmarks, keyboard navigation
- **Performance**: Optimized images, lazy loading, minimal JavaScript
- **Sitemap**: Auto-generated for search engines

### Local Business Schema

The website includes JSON-LD structured data for local business:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Company Name",
  "image": "https://example.com/logo.png",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Madrid",
    "addressCountry": "ES"
  },
  "areaServed": "Madrid, Spain",
  "priceRange": "€€€"
}
```

## Deployment

The site builds to static HTML/CSS/JS with zero runtime overhead. Deploy to:

- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting

```bash
pnpm build
# Upload dist/ folder to your host
```
