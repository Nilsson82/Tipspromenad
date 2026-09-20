const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const path=require('node:path');
const file=path.join(__dirname,'../database/revision-1.json');
const bank=JSON.parse(fs.readFileSync(file));
test('immutable revision, numeric IDs and four-option translations',()=>{
 assert.equal(bank.schemaVersion,2);assert.equal(bank.revision,1);
 const ids=new Set();for(const q of bank.questions){assert(Number.isInteger(q.questionId)&&q.questionId>=0&&q.questionId<=0xffffff&&!ids.has(q.questionId));ids.add(q.questionId);assert(bank.categories.includes(q.category));assert(q.subcategory);for(const [language,tr]of Object.entries(q.translations)){assert(['en','sv','es','da','no','fi'].includes(language));assert(tr.question.trim());assert.equal(tr.options.length,4);assert.equal(new Set(tr.options).size,4);assert(tr.options.every(v=>typeof v==='string'&&v.trim()));assert(Number.isInteger(tr.correctIndex)&&tr.correctIndex>=0&&tr.correctIndex<4);}}
 const expected=fs.readFileSync(path.join(__dirname,'../database/revision-1.sha256'),'utf8').trim();assert.equal(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),expected,'Do not edit a published revision; add a new revision.');
});
test('ID registry accounts for every canonical question',()=>{const registry=require('../database/id-registry.json');for(const q of bank.questions)assert(registry.mappings.some(m=>m.questionId===q.questionId));assert(registry.nextId>Math.max(...bank.questions.map(q=>q.questionId)));});
