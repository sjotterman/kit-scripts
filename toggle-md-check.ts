// Name: toggle-md-check

import '@johnlindquist/kit';

await hide();
await keystroke('command left');
await keystroke('command shift right');
let text = await getSelectedText();

const checked = text.startsWith('- [x]');
const unchecked = text.startsWith('- [ ]');
const startsWithHyphen = text.startsWith('- ');
if (checked) {
  text = text.replace('- [x]', '- [ ]');
} else if (unchecked) {
  text = text.replace('- [ ]', '- [x]');
} else if (startsWithHyphen) {
  text = text.replace('-', '- [ ]');
} else {
  text = `- ${text}`;
}

setSelectedText(text);

// dev(text);
