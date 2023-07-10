// Name: Current Time
// Description: Inserts the current date
// Author: Samuel Otterman
// Snippet: xtt

import '@johnlindquist/kit';

let { format } = await npm('date-fns');

let currentTime = format(new Date(), 'hh:mm a');
await keyboard.type(currentTime);
