export const pageMetadata: Record<string,{title:string;description:string}> = {
 '/': {title:'AI sales conversations for existing website traffic', description:'Vankard installs and manages Vanka AI to help businesses turn existing website traffic into qualified conversations and meetings. Start with Recover.'},
 '/how-it-works/': {title:'How Vankard installs and manages Vanka AI',description:'See how Vankard maps your offer, writes conversations, installs Vanka AI, connects your CRM and tunes the experience during Recover.'},
 '/solutions/': {title:'Recover, Optimize and Scale | Vankard services',description:'Explore Vankard’s growth sequence: Recover existing visitor interest, Optimize the conversion experience, then qualify for Scale.'},
 '/pricing/': {title:'Recover pricing in USD and QAR | Vankard',description:'View Recover’s USD equivalents: $1,648.35/month on quarterly billing or $2,197.80 paid monthly. Switch to original QAR prices and review the full billing terms.'},
 '/about/': {title:'About Vankard | Conversion before acquisition',description:'Learn why Zak founded Vankard to recover missed website conversations, improve conversion and strengthen the foundation before scaling acquisition.'},
 '/demo/': {title:'Vanka AI guided demo | Vankard',description:'Compare illustrative website journeys with and without Vankard, then try the scripted qualification demo. No live tracking, calls or bookings.'},
 '/faq/': {title:'Vankard FAQs | Recover, pricing and implementation',description:'Answers about Vankard Recover: traffic requirements, Vanka AI, CRM connection, 48-hour installation conditions, pricing and no-refund terms.'},
 '/blog/': {title:'Conversion and growth insights | Vankard',description:'Read Vankard field notes on website conversion, buyer questions, visitor conversations and the Recover, Optimize, Scale approach to growth.'},
 '/404.html':{title:'Page not found',description:'This page could not be found. Explore Vankard’s services, pricing and website conversion insights.'}
};
export const indexable = (process.env.SEARCH_INDEXABLE ?? import.meta.env.SEARCH_INDEXABLE) === 'true';
export function schemaGraph({site,path,title,description,article,faqs}: {site:URL;path:string;title:string;description:string;article?:any;faqs?:any[]}) {
 const origin=site.origin;
 const canonical=new URL(path,site).href;
 const org=origin+'/#organization';const website=origin+'/#website';
 const entity:any[]=[
  {'@type':'Organization','@id':org,name:'Vankard',url:origin+'/',description:'Vankard installs and manages an AI sales layer to help businesses convert existing website traffic into qualified conversations and meetings.'},
  {'@type':'WebSite','@id':website,name:'Vankard',url:origin+'/',publisher:{'@id':org},inLanguage:'en'},
  {'@type':article?'WebPage':faqs?'FAQPage':path==='/about/'?'AboutPage':'WebPage','@id':canonical+'#webpage',url:canonical,name:title,description,isPartOf:{'@id':website},about:{'@id':org},inLanguage:'en',...(faqs?{mainEntity:faqs.map(f=>({'@type':'Question',name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer}}))}:{})}
 ];
 if(path!=='/'){
  const items=[{'@type':'ListItem',position:1,name:'Home',item:origin+'/'}];
  if(article)items.push({'@type':'ListItem',position:2,name:'Insights',item:origin+'/blog/'});
  items.push({'@type':'ListItem',position:items.length+1,name:title,item:canonical});
  entity.push({'@type':'BreadcrumbList','@id':canonical+'#breadcrumbs',itemListElement:items});
  entity[2].breadcrumb={'@id':canonical+'#breadcrumbs'};
 }
 if(article){entity.push({'@type':'BlogPosting','@id':canonical+'#article',headline:article.title,description:article.excerpt,articleSection:article.category,inLanguage:'en',author:{'@id':org},publisher:{'@id':org},mainEntityOfPage:{'@id':canonical+'#webpage'},...(article.publishedAt?{datePublished:article.publishedAt}:{}),...(article.updatedAt?{dateModified:article.updatedAt}:{})});}
 if(path==='/pricing/' || path==='/solutions/'){
  entity.push({'@type':'Service','@id':origin+'/solutions/#recover',name:'Vankard Recover',serviceType:'Managed AI sales conversation service',provider:{'@id':org},url:origin+'/solutions/#recover',description:'Vanka AI installation, offer-specific scripts, CRM connection, 14 days of live tuning and a 5am brief. Installation in 48 hours after required access and approvals.',offers:[{'@type':'Offer',name:'Recover — quarterly billing',url:origin+'/pricing/',price:'18000',priceCurrency:'QAR',description:'18,000 QAR per quarter, equivalent to 6,000 QAR per month. No performance guarantee or refunds.'},{'@type':'Offer',name:'Recover — monthly billing',url:origin+'/pricing/',price:'8000',priceCurrency:'QAR',description:'8,000 QAR per month. No performance guarantee or refunds.'}]});
 }
 return {'@context':'https://schema.org','@graph':entity};
}
