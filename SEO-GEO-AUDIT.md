# Vankard SEO and AI discovery audit

Date: 8 November 2026. Scope: local Astro source and generated HTML, not a deployed production domain. Vanka will be supplied by Knock Knock and installed later through Google Tag Manager; it is not a prerequisite for rendering or indexing the website.

## Outcome

The core website is readable from initial HTML without JavaScript. All 12 HTML routes build. Indexable production mode has 11 discoverable content pages; the custom 404 is excluded. Technical checks pass for both a staging build and a production-mode build using a reserved .invalid test origin. That origin is never shipped as a live domain; the delivered dist is a staging build.

## Findings and changes

| Area | Finding before audit | Change / evidence |
| --- | --- | --- |
| HTML readability | Astro already rendered main headings, services, articles and FAQs in HTML | Kept this architecture. Essential copy does not depend on GTM or the widget. |
| Pricing | Monthly payment price was available only after interacting with JavaScript | Both billing choices are visible in HTML. USD equivalents are the default display; original QAR amounts remain in a visible disclosure and structured data. |
| Metadata | Most non-article pages shared a generic description | Each route now has a distinct descriptive title and summary. Article summaries remain article-specific. |
| Canonical identity | Canonical URLs existed only when a domain was configured | Production domain is now required when enabling indexing; URLs and schema identities derive from it. |
| Crawl rules | No explicit robots file | Production allows all user agents; staging disallows crawling and uses HTML noindex. |
| Discovery | No sitemap | Production XML sitemap lists all 11 content routes and excludes the error page. |
| Entity clarity | Homepage was mainly persuasion-led | Added a visible “What is Vankard?” definition, audience fit summary, service sequence and pricing link. |
| Structured data | None | Added Organization, WebSite, WebPage, visible breadcrumbs, Service offers, BlogPosting and matching FAQPage data on relevant routes. |
| Article provenance | No machine-readable author/publisher or dates | Uses Vankard as the editorial author/publisher. Includes actual CMS dates only when available. |
| Social metadata | Basic Open Graph only | Added site name, page URL, article type, and social summary metadata. No invented preview image. |
| Verification | Only basic build/link checks | Added a reusable HTML-only SEO checker to the build workflow. |

Structured data describes real visible content. No ratings, customer proof, business addresses, social profiles, awards or service areas have been invented. FAQ markup is for accurate page description, not a claim of FAQ rich-result eligibility. Existing seed articles remain editorial starter content; original evidence and substantive case studies are still needed to improve their competitive value.

## Tests completed

- Default preview build succeeds; all pages are noindex and the sitemap is empty.
- Production-mode build succeeds with HTTPS test origin and explicit SEARCH_INDEXABLE=true.
- Exactly one H1 and a main landmark exist on each generated HTML page.
- All 12 HTML pages have unique titles and descriptions.
- Both billing choices and the no-guarantee/no-refund terms appear in initial HTML.
- Internal navigation links resolve to generated pages.
- Production canonicals and Open Graph URLs match each page.
- JSON-LD parses, and service prices and FAQ answers match the visible source.
- Sitemap coverage matches all 11 indexable routes and excludes 404.

These are code and generated-document checks. They do not establish actual rankings, indexing, rich-result eligibility, AI citations, live HTTP status codes, Cloudflare bot access or measured Core Web Vitals.

## Production launch checks

1. Set the real SITE_URL and SEARCH_INDEXABLE=true for production only; rebuild. Keep previews noindex. Use a single main host and redirect other host/protocol variants to it.
2. Fetch the live homepage, pricing, article, robots.txt and sitemap.xml. Check public access, content type, HTML content, canonicals and headers. Test an unknown URL returns HTTP 404, not a 200 fallback. Check the site is not behind Access, a login or a bot challenge for intended crawlers.
3. Inspect Cloudflare AI Crawl Control, bot policies, managed robots directives and WAF rules. Search and user-initiated AI crawlers must not be unintentionally blocked or charged. Do not disable general security to achieve this. Review logs and official crawler verification/IP guidance when troubleshooting.
4. Verify ownership in Google Search Console and Bing Webmaster Tools. Submit the XML sitemap. Inspect a commercial page and a published article. Confirm the selected canonical and indexing eligibility. Review any AI/search participation settings surfaced in those accounts.
5. Validate live markup with Schema.org Validator and relevant Google tools; passing a syntax check is not a rich-result guarantee.
6. Test mobile rendering and measure PageSpeed/Core Web Vitals on the final domain. Repeat after GTM and Knock Knock are installed, because third-party scripts can affect speed and layout.
7. Publish substantive articles and verified case studies. Add real author credentials, contact details and business identity when supplied. Avoid unsupported location pages or invented review claims. Connect genuine social/business profiles only after verifying them.
8. Monitor search impressions, indexed pages, qualified inquiries, AI referral traffic and crawler logs. A crawler visit does not prove that an answer engine cited the site. Manually sample relevant buyer questions across engines over time.

## Vanka integration boundary

Install the vendor-provided script through the owner's GTM container later. Do not move essential marketing copy, FAQs, pricing or schema into GTM. The website demo remains clearly marked. Disable the demo launcher when the real widget is enabled. Review current camera/microphone Permissions-Policy and the vendor's documented requirements if enabling calling features; do not broadly relax headers without a concrete requirement. No container ID, vendor script, live booking or tracking was installed during this audit.

## What “visible to all LLMs” can mean

Public textual HTML, links, accurate metadata, consistent entities and permissive production crawl rules improve eligibility for retrieval by systems that browse or search the web. Model training, search retrieval and user-triggered browsing are different mechanisms. Neither this code nor any SEO/GEO file can force an engine to crawl, index, cite, recommend or train on Vankard. Visibility must be checked on the deployed domain and measured over time.

## Official references reviewed

- Google AI features and your website: https://developers.google.com/search/docs/appearance/ai-features
- OpenAI crawler overview: https://developers.openai.com/api/docs/bots
- Cloudflare crawler management: https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/
- Cloudflare AI access policies: https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/
- Google FAQ eligibility: https://developers.google.com/search/blog/2023/08/howto-faq-changes

Google states that standard SEO applies to its AI features, important content should be textual, crawl access must be allowed by the host/CDN, and structured data must match visible text. No special AI text file is required. OpenAI documents OAI-SearchBot for ChatGPT search independently from GPTBot for model training.


## Pricing update, 8 November 2026

Added default USD display and a remembered manual QAR selector. There is no IP geolocation. Dollar values are display equivalents of the approved QAR offer, rounded to cents using the QCB peg of 3.64 QAR per USD. Initial HTML includes both USD billing choices and original QAR prices. Service schema retains the actual QAR-denominated offer; it matches the original-offer disclosure. The guided chat and FAQ use the same conversion helper. Arithmetic tests and browser checks for currency selection, billing selection and preference persistence passed. No checkout currency was changed.
