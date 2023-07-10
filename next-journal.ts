/*
# Markdown Journal
- Creates a new markdown file based on the day (or opens existing file)
- Opens the file in the built-in editor
- Adds a timestamp
- Auto-saves as you type
- On first run, will prompt the user to select where to store files
*/

// Name: Next daily log

import { createPathResolver } from '@johnlindquist/kit';
import _ from 'lodash';

let { format } = await npm('date-fns');

let journalDir = await env('JOURNAL_DIR', async () => {
  setDescription(`Select a Journal Directory`);
  return await path();
});

let journalPath = createPathResolver(journalDir);
await ensureDir(journalPath());
cd(journalPath());

const today = new Date();
const tomorrow = today.setDate(today.getDate() + 1);
const dates = [tomorrow];
for (let i = 0; i < 6; i++) {
  dates.push(dates[i] + 86400000);
}

const options = dates.map((num, index) => {
  const selectedDate = new Date(num);
  const readableDate = format(selectedDate, 'yyyy-MM-dd');
  const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
  const name = index === 0 ? 'Tomorrow' : dayName;
  const fileHeading = `${readableDate} - ${dayName}`;
  return {
    name,
    description: readableDate,
    value: {
      readableDate,
      originalDate: num,
      fileHeading,
    },
  };
});
let selectedDate = await arg('Select date', options);

// let dashedDate = format(new Date(selectedDate.originalDate), 'yyyy-MM-dd');
let dashedDate = selectedDate.readableDate;

let filePath = journalPath(dashedDate + '.md');
setDescription(filePath);
const defaultContent = `
tags: #journal #capabuild #work
links: [[journal]]

---
${selectedDate.fileHeading}
`;

let value = await ensureReadFile(filePath, defaultContent);

let changed = false;

let autoSave = _.debounce(async (input: string) => {
  await writeFile(filePath, input.trim());
}, 3000);

let cmd = isWin ? 'ctrl' : 'cmd';

let content = await editor({
  value,
  scrollTo: 'bottom',
  shortcuts: [
    {
      name: 'Save',
      key: `${cmd}+s`,
      onPress: (input) => {
        submit(input);
      },
      bar: 'right',
    },
    {
      name: 'Open',
      key: `${cmd}+o`,
      onPress: async () => {
        open(filePath);
      },
      bar: 'right',
    },
  ],
  onEscape: async (input) => {
    submit(input);
  },
  onAbandon: async (input) => {
    submit(input);
  },
  onInput: async (input) => {
    changed = true;
    autoSave(input);
  },
});
hide();

let trimmed = content.trim();
if (!changed) {
  exit();
}

await writeFile(filePath, trimmed);
