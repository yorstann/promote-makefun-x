// Entry for make.fun's "Promote make.fun's make-your-own-bounty
// post on X" bounty. The entry is the post itself:
// https://x.com/yorstan_id/status/2125033127857070364 — a quote of
// make.fun's announcement with its own photo, @makefunai, the
// sponsor link and the play code in its text. This program's only
// job is to hand in the post's address: it copies POST.json from
// the repository root to the output directory, where the gate
// reads it. Node standard library only.

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '.';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });
copyFileSync(join(botDir, 'POST.json'), join(outDir, 'POST.json'));
console.log('handed in', join(outDir, 'POST.json'));
