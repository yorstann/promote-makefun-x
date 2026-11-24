// Entry for make.fun's "Promote make.fun's make-your-own-bounty
// post on X" bounty. The entry is the post itself:
// https://x.com/yorstan_id/status/2125033127857070364 — a quote of
// make.fun's announcement with its own photo, @makefunai, the
// sponsor link and the play code in its text. This program's only
// job is to hand in the post's address: it copies POST.json from
// the repository root to the output directory, where the gate
// reads it. Node standard library only.

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '.';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? '/output';

// Pass 2: validate the address before handing it in. The gate
// refuses anything that is not a real post address, and the post
// named must be the entrant's own — never make.fun's announcement
// (status 2124915864336236646), which this entry quotes.
const MAKEFUNS_POST_ID = '2124915864336236646';
const raw = readFileSync(join(botDir, 'POST.json'), 'utf8');
let url;
try {
  url = JSON.parse(raw).url;
} catch {
  console.error('POST.json is not valid JSON');
  process.exit(1);
}
const m = /^https:\/\/(x|twitter)\.com\/[A-Za-z0-9_]+\/status\/(\d+)$/.exec(url ?? '');
if (!m) {
  console.error('POST.json url is not an X post address:', url);
  process.exit(1);
}
if (m[2] === MAKEFUNS_POST_ID) {
  console.error('POST.json names make.fun\'s own post, not the entrant\'s');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(join(botDir, 'POST.json'), join(outDir, 'POST.json'));
console.log('handed in', join(outDir, 'POST.json'), 'for', url);
