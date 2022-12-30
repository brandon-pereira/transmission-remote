import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import { version } from '../../package.json';

(async () => {
  const destPath = resolve(__dirname, '../../release/app/package.json');
  const current = require(destPath);
  current.version = version;
  await writeFile(destPath, `${JSON.stringify(current, null, '  ')}\n`);
})();
