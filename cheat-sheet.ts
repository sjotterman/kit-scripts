// Name: Cheat Sheet

import "@johnlindquist/kit";

let topic = await arg("Cheat Sheet Topic", async (input) => {
  if (!input) return;
  let response = await get(`https://cheat.sh/${input}`);
  return response.data;
});
