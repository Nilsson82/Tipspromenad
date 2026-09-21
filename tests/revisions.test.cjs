const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const directory=path.join(__dirname,'../database');
test('all revisions, numeric references, unique IDs and latest integrity',()=>{
 const registry=JSON.parse(fs.readFileSync(path.join(directory,'id-registry.json')));const latest=JSON.parse(fs.readFileSync(path.join(directory,'latest.json')));
 for(const file of fs.readdirSync(directory).filter(n=>/^revision-\d+\.json$/.test(n))){const text=fs.readFileSync(path.join(directory,file)),bank=JSON.parse(text),ids=new Set();assert.equal(bank.schemaVersion,2);assert.equal(file,'revision-'+bank.revision+'.json');assert.equal(crypto.createHash('sha256').update(text).digest('hex'),fs.readFileSync(path.join(directory,file.replace('.json','.sha256')),'utf8').trim());
 for(const q of bank.questions){assert(!ids.has(q.questionId));ids.add(q.questionId);assert(registry.mappings.some(m=>m.questionId===q.questionId));assert(bank.categories.includes(q.category));assert([1,2,3].includes(q.difficulty));for(const [lang,tr]of Object.entries(q.translations)){assert(/^[a-z]{2,3}$/.test(lang));assert(tr.question.trim());if(q.type==='numeric'){assert(Number.isFinite(q.referenceAnswer));assert(q.unit);}else{assert.equal(tr.options.length,4);assert.equal(new Set(tr.options).size,4);assert(Number.isInteger(tr.correctIndex)&&tr.correctIndex>=0&&tr.correctIndex<4);}}}
 for(const set of bank.sets||[])for(const id of set.questionIds)assert(bank.questions.some(q=>q.questionId===id&&q.type!=='numeric'));
 }
 assert.equal(latest.file,'revision-'+latest.revision+'.json');assert.equal(latest.sha256,fs.readFileSync(path.join(directory,'revision-'+latest.revision+'.sha256'),'utf8').trim());
});
