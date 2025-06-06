const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'documentation', 'cycle1-textile');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const items = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      items.push({
        type: 'directory',
        name: entry.name,
        path: path.relative(rootDir, fullPath),
        children: walk(fullPath)
      });
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      items.push({
        type: 'file',
        name: entry.name,
        path: path.relative(rootDir, fullPath)
      });
    }
  }
  return items;
}

const tree = {
  type: 'directory',
  name: 'cycle1-textile',
  path: '',
  children: walk(rootDir)
};

fs.writeFileSync(path.join(rootDir, 'fileIndex.json'), JSON.stringify(tree, null, 2));
console.log('fileIndex.json generated');
