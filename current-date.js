/*
# Text Expansion Snippet

- Snippets run when you type the characters in the "// Snippet" metadata
- Think of snippets as a way to trigger scripts by simply typing anywhere

> 👋 On Mac, to allow Kit.app to monitor your keystrokes, you'll need to click:
>
> `Script Kit menubar icon -> Watchers -> Start Snippet/Clipboard Watcher`
*/

// Name: Current date
// Description: Inserts the current date
// Author: Samuel Otterman
// Snippet: ddate

import '@johnlindquist/kit';

let { format } = await npm('date-fns');

const readableDate = format(new Date(), 'yyyy-MM-dd');
await keyboard.type(readableDate);
