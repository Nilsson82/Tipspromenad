const {test} = require('node:test');
const assert = require('node:assert/strict');
const Core = require('../public/lib/quiz-core');
const I18n = require('../public/lib/i18n');
const bank = require('../public/Data/multilingual.json');
const legacy = require('../public/Data/legacy_sv.json');
const messages = require('../public/locales/ui.json');
test('original twelve Swedish questions keep their answer keys', () => {
  Core.validateLegacy(legacy);
  const questions = legacy[0].QuestionList;
  assert.equal(questions.length,12);
  assert.equal(Core.score(questions,questions.map(Core.correctIndex)),12);
  assert.equal(Core.score(questions,[]),0);
  assert.equal(Core.score(questions,questions.map(q=>(Core.correctIndex(q)+1)%q.answers.length)),0);
});
test('six languages have complete UI keys and playable starter questions', () => {
  for (const language of Core.languages) {
    assert.deepEqual(Object.keys(messages[language]).sort(),Object.keys(messages.en).sort());
    const quiz = Core.projectBank(bank,language)[0];
    assert.equal(quiz.QuestionList.length,6);
    assert.equal(Core.score(quiz.QuestionList,quiz.QuestionList.map(Core.correctIndex)),6);
  }
});
test('legacy aliases work independently of UI language', () => {
  assert.equal(Core.normalizeLanguage('se-SE'),'sv');
  assert.equal(Core.normalizeLanguage('dk'),'da');
  assert.equal(Core.normalizeLanguage('nb-NO'),'no');
  assert.equal(Core.projectBank(bank,'fi')[0].listName,bank.names.fi);
  assert.equal(I18n.translate(messages,'es','submit'),messages.es.submit);
});
test('invalid keys and missing language cannot silently produce a quiz', () => {
  const bad = JSON.parse(JSON.stringify(bank));
  bad.questions[0].correctAnswerId = 'unknown';
  assert.throws(()=>Core.projectBank(bad,'en'));
  assert.throws(()=>Core.projectBank(bank,'de'));
  const partial = JSON.parse(JSON.stringify(bank));
  partial.questions.forEach(q=>delete q.translations.fi);
  assert.deepEqual(Core.projectBank(partial,'fi'),[]);
});
