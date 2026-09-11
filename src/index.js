// Keep the existing webpack/DOM app. The same quiz runtime is distributed from
// TipspromenadQuizWebPage; this project retains its own original Swedish quiz.
const Core = require('../public/lib/quiz-core');
const UI = require('../public/lib/quiz-ui');
const messages = require('../public/locales/ui.json');
const bank = require('../public/Data/multilingual.json');
const legacy = require('../public/Data/legacy_sv.json');

UI.mount({
  host: document.getElementById('app'), storageId: 'tipspromenad', messages,
  async loadCollections(language) {
    const starter = Core.projectBank(bank, language);
    return language === 'sv' ? [...Core.validateLegacy(legacy), ...starter] : starter;
  }
}).catch(error => {
  console.error(error);
  document.getElementById('app').textContent = 'Could not load the quiz. Reload the page to try again.';
});
