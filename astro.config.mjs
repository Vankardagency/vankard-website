import { defineConfig } from 'astro/config';
const site=process.env.SITE_URL?.trim();
if(process.env.SEARCH_INDEXABLE==='true' && !site) throw new Error('Indexable production builds require SITE_URL.');
if(site){const url=new URL(site);if(url.protocol!=='https:' || url.pathname!=='/' || url.search || url.hash || url.username || url.password) throw new Error('SITE_URL must be an HTTPS origin, for example https://your-domain.com');}
export default defineConfig({output:'static', site:site || undefined, trailingSlash:'always'});
