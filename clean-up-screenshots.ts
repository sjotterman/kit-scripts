// Name:

import '@johnlindquist/kit';

const notePath = home('Desktop');

const files = ls(notePath);
const screenShots = files.filter((file) => file.endsWith('.png'));
// dev(screenShots);

let count = 0;
const path = `${notePath}/${screenShots[0]}`;
// dev(path);

div(`
<div>
<img src="${notePath}/${screenShots[1]}" />
</div>
`);
// for (const image of screenShots) {
//   let contents = await ensureReadFile(notePath + '/' + note);
//   if (contents.includes('#keep')) {
//     continue;
//   }
//   const keep = await arg(
//     { placeholder: 'Keep?', hint: '[y]es, [n]o, [s]kip' },
//
//     md(`
// # ${note} (${count++}/${orderedNotes.length})
// ---
// ${contents}`)
//   );
//   if (keep === 'y') {
//     contents = `${contents}
// #keep`;
//     await writeFile(notePath + '/' + note, contents);
//   }
//   if (keep === 'n') {
//     const cmd = `trash ${notePath + '/' + note}`;
//     console.log('trashing', cmd);
//     const result = await $`trash ${notePath + '/' + note}`;
//     console.log('result:', result);
//     countTrashed++;
//   }
//   if (keep === 's') {
//     continue;
//   }
//   console.log('contents:', contents);
// }
//
// await div(`trashed ${countTrashed} notes`);
