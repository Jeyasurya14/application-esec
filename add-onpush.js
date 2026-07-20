const fs = require('fs');
const path = require('path');

function findFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findFiles(full));
    } else if (entry.name.endsWith('.ts')) {
      files.push(full);
    }
  }
  return files;
}

const srcDir = path.resolve('src/app');
const allFiles = findFiles(srcDir);

let updated = 0;
let skipped = 0;

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('@Component(')) continue;
  if (content.includes('ChangeDetectionStrategy.OnPush')) {
    skipped++;
    continue;
  }

  // Add ChangeDetectionStrategy import
  const importRegex = /import \{([^}]+)\} from ['"]@angular\/core['"]/;
  const importMatch = content.match(importRegex);
  if (importMatch) {
    const existing = importMatch[1].trim();
    if (!existing.includes('ChangeDetectionStrategy')) {
      const newImport = importMatch[0].replace(existing, existing + ', ChangeDetectionStrategy');
      content = content.replace(importMatch[0], newImport);
    }
  }

  // Add changeDetection to @Component decorator
  content = content.replace(/@Component\(\{([\s\S]*?)\n\}\)/, (match, inner) => {
    if (inner.includes('changeDetection:')) return match;
    return '@Component({' + inner + ',\n  changeDetection: ChangeDetectionStrategy.OnPush,\n})';
  });

  fs.writeFileSync(file, content, 'utf8');
  updated++;
}

console.log('Updated: ' + updated + ', Skipped: ' + skipped);
