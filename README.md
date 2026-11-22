# Vankard

Full Astro website. Fingerprint-inspired warm neutrals, orange accents, fine rules, product demonstration and an original serif Vankard wordmark. No Fingerprint logos or proprietary assets are included.

## Run

Node 22.12+ or Node 24 recommended.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Astro prerenders the site into `dist/`. No React runtime is shipped to website visitors. Google Fonts provides Inter and DM Mono; system fallbacks are included. The original HTML reference is a compiled React artifact; this project rebuilds its core proposition as maintainable Astro source.

## Routes

Home, How it works, Solutions, Pricing, About, Demo, FAQ, Insights index, three complete articles, and a custom 404.

## Offer

Recover: 6,000 QAR/month billed as 18,000 QAR quarterly, or 8,000 QAR paid monthly. No performance guarantee or refunds. Installation in 48 hours after required access and approvals. Optimize and Scale are qualified subsequent stages; no invented prices. Date-specific scarcity and unsupported statistics were omitted.

## Demo behavior

The comparison switch, billing switch, navigation, article search, FAQ accordions and guided Vanka dialogue work locally. Chat responses are scripted. The dialogue keeps answers in memory, offers a local text download, and sends nothing to a server. It does not track visitors, use live AI, call anyone, book meetings, hold slots, accept payment or submit an application. Vanka is supplied through a future Knock Knock subscription and will be installed through Google Tag Manager by the owner. No custom Vanka backend needs to be built for this website. When installing the real widget, disable the scripted demo launcher to avoid two competing widgets. Keep all service copy, pricing and FAQs in Astro-rendered HTML. No fabricated customer proof is displayed.

## Sanity connection later

Copy `.env.example` to `.env`. Set `SANITY_PROJECT_ID`, `SANITY_DATASET`, and `SITE_URL` to the final domain. For a private dataset, add a read-only `SANITY_API_TOKEN` in the build environment only. It is never used by browser scripts. With no project ID, editorial seed content is used. When connected, published Sanity FAQ and post documents are authoritative, including empty collections; request failures stop the build instead of silently showing stale content.

The optional `sanity/` Studio has its own package.json. Set `SANITY_STUDIO_PROJECT_ID` and optionally `SANITY_STUDIO_DATASET` in that environment, then install and start the Studio there. Schemas include FAQs, blog posts with structured heading/text sections, testimonials and case studies. Testimonials and case studies are future collections; the website does not currently render them. Publish only approved evidence and implement their rendering when real proof exists. The Studio is supplied but has not been connected or deployed.

`src/lib/content.ts` holds fallback content and the build-time GROQ query. Publish content to Sanity and trigger a website rebuild to update static pages. Configure a protected Cloudflare deploy hook as a Sanity publish webhook when connecting the platforms. Deploy hooks are credentials; do not commit them.

## GitHub and Cloudflare later

1. Create a GitHub repository and push this directory, excluding node_modules, dist and .env. The included GitHub workflow checks the frontend build; it does not deploy.
2. Connect the repository to Cloudflare Workers Builds: build command `npm run build`, deploy command `npx wrangler deploy`, Node 22 or 24. The supplied wrangler.jsonc serves static assets from dist. Cloudflare Pages is also supported with build command `npm run build` and output directory `dist`.
3. Configure environment variables in the build provider. Connect the production domain in Cloudflare and set SITE_URL before rebuilding. The site emits canonical URLs only after that variable is set.
4. Wire Sanity content publishing to a new static build. The owner will install the Knock Knock Vanka script through Google Tag Manager after purchasing a subscription. Search visibility does not depend on installing the widget.
5. Review the final commercial agreement and production privacy notice against the actual data processing before enabling live integrations. No legal entity or live privacy practices have been invented here.

## Design and editing

Shared layout: src/layouts/Layout.astro. Global design tokens and responsive styles: src/styles/global.css. Visitor comparison: src/components/Demo.astro. Guided dialogue: src/components/Chat.astro. All pages use semantic navigation and headings, visible focus states, reduced-motion support, and native keyboard-accessible accordions/dialogs.

No external platforms were changed or deployed as part of this source build.


## Search and AI discovery

See SEO-GEO-AUDIT.md for the audit and deployment checks. Preview builds default to `noindex,follow` and robots.txt `Disallow: /`. This is an indexing preference, not authentication.

For production, set **both** `SITE_URL=https://YOUR-REAL-DOMAIN` and `SEARCH_INDEXABLE=true` in the Cloudflare build environment, then rebuild. Replace the domain placeholder; never deploy it literally. The domain must be an HTTPS origin without a path. Indexable builds require a domain. Branch previews must retain SEARCH_INDEXABLE=false, including Cloudflare preview overrides.

Production emits domain-specific canonical URLs, Open Graph URLs, JSON-LD entity identifiers, an XML sitemap and permissive robots.txt for all crawlers. Staging has an empty sitemap and no indexable pages. No bot-specific alternate content is served. llms.txt is not required for Google AI features and has not been presented as a ranking solution.

Run `npm run check:seo` after building. Run the build and checker with the same SITE_URL and SEARCH_INDEXABLE values. The checker parses HTML without executing JavaScript and validates headings, unique metadata, pricing visibility, internal links, crawl rules and sitemap. In production mode it also validates canonical URLs, schema JSON and sitemap coverage. These checks are not a substitute for testing the deployed Cloudflare response or external search indexing.

Publish events from Sanity must rebuild the site so visible content and structured data update together. Blog datePublished/dateModified use actual CMS dates when available; no dates have been invented for seed articles.


## Pricing display

USD is the default display currency. Visitors can select QAR on the pricing page; this preference is stored locally when browser storage is available. No IP lookup, geolocation service or currency-rate API is used. Pricing, FAQ and the guided chat share `src/lib/pricing.mjs` for conversion and formatting. The approved offer remains denominated in QAR; USD values are display equivalents rounded to cents at 1 USD = 3.64 QAR, Qatar Central Bank's published peg (checked 8 November 2026). No new payment currency or checkout has been introduced.

- Quarterly plan: 6,000 QAR/month, paid as 18,000 QAR/quarter. Display equivalents: $1,648.35/month and $4,945.05/quarter.
- Monthly plan: 8,000 QAR/month. Display equivalent: $2,197.80/month.

Both billing choices and the original QAR offer remain in initial HTML for search/readability. Structured data describes the original QAR-denominated offers visible on the page. FAQ text includes both currencies. The page works with USD defaults when storage is blocked; billing details remain readable when JavaScript is disabled. To establish fixed USD billing amounts later, approve a USD tariff and align the payment processor, copy and schema with it rather than treating approximate conversions as new contracted prices.

Run `npm run check:pricing` to verify conversions, rounding and storage fallback. Browser checks passed for USD default, QAR monthly selection, QAR preference after reload, USD monthly selection and return to quarterly billing.

Rate source: https://www.qcb.gov.qa/en/Pages/MonetaryPolicyTools.aspx
