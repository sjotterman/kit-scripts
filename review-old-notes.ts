// Name: review-old-notes
// TODO: expand to include all notes, not just daily notes

import '@johnlindquist/kit';

const notePath = home('Dropbox/notes');

const files = ls(notePath);
const agResult = await $`cd ${notePath} && ag --markdown "#keep" -L`;
const agFiles = agResult.toString().split('\n');
console.log('agFiles:', agFiles.toString());
// const notes = files.filter((file) => file.endsWith('.md'));
const notes = agFiles.filter((file) => file.endsWith('.md'));
const regex = /(^\d{4}-\d{2}-\d{2}).md/g;
const dailyNotes = notes.filter((note) => {
  const match = regex.test(note);
  if (!match) {
    return false;
  }
  const noteDate = new Date(note.replace('.md', ''));
  const oneYearAgo = new Date(
    new Date().setFullYear(new Date().getFullYear() - 1)
  );
  return noteDate <= oneYearAgo;
});
const orderedNotes = dailyNotes.sort();
let countTrashed = 0;

let count = 0;
for (const note of orderedNotes) {
  let contents = await ensureReadFile(notePath + '/' + note);
  if (contents.includes('#keep')) {
    continue;
  }
  const keep = await arg(
    { placeholder: 'Keep?', hint: '[y]es, [n]o, [s]kip' },

    md(`
# ${note} (${count++}/${orderedNotes.length})
---
${contents}`)
  );
  if (keep === 'y') {
    contents = `${contents}
#keep`;
    await writeFile(notePath + '/' + note, contents);
  }
  if (keep === 'n') {
    const cmd = `trash ${notePath + '/' + note}`;
    console.log('trashing', cmd);
    const result = await $`trash ${notePath + '/' + note}`;
    console.log('result:', result);
    countTrashed++;
  }
  if (keep === 's') {
    continue;
  }
  console.log('contents:', contents);
}

await div(`trashed ${countTrashed} notes`);
