import assert from 'node:assert/strict';
import {basePrices,convertedAmount,formatAmount,normalizeCurrency,offerSummary,storedCurrency,saveCurrency} from '../src/lib/pricing.mjs';
assert.equal(convertedAmount(basePrices.quarterlyMonthly),1648.35);
assert.equal(convertedAmount(basePrices.quarterlyTotal),4945.05);
assert.equal(convertedAmount(basePrices.monthly),2197.80);
assert.equal(convertedAmount(basePrices.quarterlyTotal,'QAR'),18000);
assert.equal(formatAmount(8000), '2,197.80');
assert.equal(formatAmount(6000,'QAR'),'6,000');
assert.equal(normalizeCurrency('EUR'),'USD');
assert.equal(storedCurrency(),'USD'); // localStorage absent in Node: graceful fallback
assert.doesNotThrow(()=>saveCurrency('QAR'));
assert.throws(()=>convertedAmount(NaN),TypeError);
assert.throws(()=>convertedAmount(-1),TypeError);
assert.match(offerSummary(),/4,945\.05 USD/);
assert.match(offerSummary('QAR'),/18,000 QAR/);
console.log('PASS: approved prices, both currencies, cent rounding, invalid input and storage fallback.');
