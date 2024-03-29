/*
he Markdown Journal
- Creates a new markdown file based on the day (or opens existing file)
- Opens the file in the built-in editor
- Adds a timestamp
- Auto-saves as you type
- On first run, will prompt the user to select where to store files
*/

// Name: Log Activity
// shortcut: cmd + j

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

let dashedDate = format(new Date(), 'yyyy-MM-dd');

let filePath = journalPath(dashedDate + '.md');
setDescription(filePath);

const defaultContent = `
tags: #journal #capabuild #work
links: [[journal]]

---
${dashedDate}
`;

let value = await ensureReadFile(filePath, defaultContent);

let dashedTime = format(new Date(), 'hh:mm a');

if (!value.includes(dashedTime)) {
  value = `${value}

## ${dashedTime}
`;
}

let changed = false;

let autoSave = _.debounce(async (input) => {
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

let trimmed = content.trim();
if (!changed) {
  exit();
}

await writeFile(filePath, trimmed);

copy(content.split(/##.*/).pop().trim());

// Push changes if the path is a git repo
let isGit = await isDir(journalPath('.git'));
if (isGit) {
  try {
    let { stdout } = await exec(
      `git add . && git commit -m "${dashedDate}-${dashedTime}" && git push`
    );
    log({ stdout });
  } catch (error) {
    log(error);
  }
}
