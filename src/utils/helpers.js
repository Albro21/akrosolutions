import fs from 'fs';
import path from 'path';

// Load BIM packages array from bim-packages.json
export function loadBimPackagesArray() {
  const packagesPath = path.join(process.cwd(), 'src/_data/bim-packages.json');
  const packages = JSON.parse(fs.readFileSync(packagesPath, 'utf8'));
  return packages;
}

