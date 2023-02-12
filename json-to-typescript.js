// Name: JSON to TypeScript
// Description: Copy JSON and paste it to TypeScript interfaces
// Author: Marin Muštra
// LinkedIn:

import '@johnlindquist/kit';

const JsonToTS = await npm('json-to-ts');
const json = await paste();
let types = '';

try {
  const obj = JSON.parse(json);
  types = `${JsonToTS(obj).join('\n\n')}\n`;
} catch (error) {
  const hint = `${error.message}`;
  await editor({ hint, input: json, description: 'ERROR', readOnly: true, lineNumbers: 'on' });

  exit();
}

await setSelectedText(types);
