import type {APIRoute} from 'astro';
import {pageMetadata,indexable} from '../lib/seo';
import {getContent} from '../lib/content';
const xml=(v:string)=>v.replace(/[<>&'\"]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'}[c]!));
export const GET:APIRoute=async({site})=>{
 let urls:string[]=[];
 if(site && indexable){const {posts}=await getContent();urls=[...Object.keys(pageMetadata).filter(p=>p!=='/404.html'),...posts.map(p=>`/blog/${p.slug}/`)].map(path=>`<url><loc>${xml(new URL(path,site).href)}</loc></url>`);}
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
