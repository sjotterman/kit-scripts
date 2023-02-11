// Name: graphite
// Description: Launch graphite in Firefox
// Author: Samuel Otterman
// alias: g

import '@johnlindquist/kit';

let url = 'https://app.graphite.dev';
await focusTab(url, 'Firefox');
// let items = [];
// let counter = 0;
// const scrapeGraphite = async () => {
//   items = await scrapeSelector(
//     url,
//     // CSS Selector to target elements
//     '#root',
//     // [Optional] function to transform the elements, if omitted then `element.innerText` is returned
//     (element) => {
//       return {
//         title: element.innerText,
//       };
//     },
//     // [Optional] options
//     {
//       // headless: false,
//       timeout: 60000,
//     }
//   );
//   counter++;
// };
// await scrapeGraphite();
//
// while (items[0].title.includes('Sharpening')) {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   scrapeGraphite();
//   counter++;
//
//   if (counter > 10) {
//     break;
//   }
// }
//
// dev(items);
