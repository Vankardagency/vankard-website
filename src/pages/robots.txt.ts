import type {APIRoute} from 'astro';
import {indexable} from '../lib/seo';
export const GET:APIRoute=({site})=> {
 const ready=indexable && site;
 const body=ready ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml',site).href}\n` : 'User-agent: *\nDisallow: /\n';
 return new Response(body,{headers:{'Content-Type':'text/plain; charset=utf-8'}});
};
