// Preserve the approved QAR offer. USD is a display conversion, not a new tariff.
// Qatar Central Bank: https://www.qcb.gov.qa/en/Pages/MonetaryPolicyTools.aspx
export const qarPerUsd = 3.64;
export const basePrices = Object.freeze({quarterlyMonthly:6000,quarterlyTotal:18000,monthly:8000});
export const preferenceKey = 'vankard-pricing-currency';
export function normalizeCurrency(value){return value==='QAR'?'QAR':'USD';}
export function convertedAmount(qar,currency='USD'){
 if(!Number.isFinite(qar) || qar<0) throw new TypeError('Expected a nonnegative QAR amount');
 return normalizeCurrency(currency)==='QAR'?qar:Math.round((qar/qarPerUsd+Number.EPSILON)*100)/100;
}
export function formatAmount(qar,currency='USD'){
 const unit=normalizeCurrency(currency);
 return new Intl.NumberFormat('en-US',{minimumFractionDigits:unit==='USD'?2:0,maximumFractionDigits:unit==='USD'?2:0}).format(convertedAmount(qar,unit));
}
export function priceText(qar,currency='USD'){return `${normalizeCurrency(currency)==='USD'?'$':''}${formatAmount(qar,currency)} ${normalizeCurrency(currency)}`;}
export function offerSummary(currency='USD'){
 const unit=normalizeCurrency(currency);
 const reference=unit==='USD'?' USD equivalents use 1 USD = 3.64 QAR; the approved offer is denominated in QAR.':'';
 return `${priceText(basePrices.quarterlyMonthly,unit)} per month on quarterly billing, paid as ${priceText(basePrices.quarterlyTotal,unit)} per quarter, or ${priceText(basePrices.monthly,unit)} paid monthly.${reference}`;
}
export function storedCurrency(){try{return normalizeCurrency(localStorage.getItem(preferenceKey));}catch{return 'USD';}}
export function saveCurrency(currency){try{localStorage.setItem(preferenceKey,normalizeCurrency(currency));}catch{/* Currency selection still works when storage is unavailable. */}}
