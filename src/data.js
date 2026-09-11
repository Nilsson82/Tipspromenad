// Compatibility export for existing imports. Original content and answer order
// now live in JSON so UI logic no longer owns the question database.
import collections from '../public/Data/legacy_sv.json';
export const questions = collections[0].QuestionList;
export default questions;
