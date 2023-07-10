// Name: check-health-capabuild

import '@johnlindquist/kit';

await term(`z capabuild && xc checkhealth && exit`);
