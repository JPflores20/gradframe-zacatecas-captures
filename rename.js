import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src');

function toSnakeCase(str) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).replace(/^_/, '');
}

const renames = [];

function collectRenames(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectRenames(fullPath);
    } else {
      const ext = path.extname(entry.name);
      
      if (!['.ts', '.tsx', '.css'].includes(ext)) continue;

      const nameWithoutExt = path.basename(entry.name, ext);
      
      if (!/[A-Z]/.test(nameWithoutExt)) continue;
      
      let newNameWithoutExt = toSnakeCase(nameWithoutExt);

      if (newNameWithoutExt !== nameWithoutExt) {
        const newFullName = newNameWithoutExt + ext;
        const newPath = path.join(dir, newFullName);
        
        renames.push({
          oldName: nameWithoutExt,
          newName: newNameWithoutExt,
          oldPath: fullPath,
          newPath: newPath,
          dir: dir
        });
      }
    }
  }
}

collectRenames(srcDir);

renames.sort((a, b) => b.oldName.length - a.oldName.length);

function updateImportsAndExports(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      updateImportsAndExports(fullPath);
    } else {
      const ext = path.extname(entry.name);
      if (!['.ts', '.tsx'].includes(ext)) continue;

      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      for (const rename of renames) {
        const regexPath1 = new RegExp(`from\\s*['"](.*)/${rename.oldName}['"]`, 'g');
        content = content.replace(regexPath1, `from '$1/${rename.newName}'`);

        const regexPath2 = new RegExp(`import\\s*['"](.*)/${rename.oldName}['"]`, 'g');
        content = content.replace(regexPath2, `import '$1/${rename.newName}'`);

        const regexPath3 = new RegExp(`import\\(['"](.*)/${rename.oldName}['"]\\)`, 'g');
        content = content.replace(regexPath3, `import('$1/${rename.newName}')`);
        
        const regexPath4 = new RegExp(`from\\s*['"]\\.\\/${rename.oldName}['"]`, 'g');
        content = content.replace(regexPath4, `from './${rename.newName}'`);
      }

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

updateImportsAndExports(srcDir);

for (const rename of renames) {
  console.log(`Renaming: ${path.basename(rename.oldPath)} -> ${path.basename(rename.newPath)}`);
  const tempPath = path.join(rename.dir, path.basename(rename.newPath) + '.temp');
  fs.renameSync(rename.oldPath, tempPath);
  fs.renameSync(tempPath, rename.newPath);
}

const indexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(indexPath)) {
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  if (indexContent.includes('main.tsx')) {
    // just in case
  }
}

console.log(`Renamed ${renames.length} files to snake_case and updated references.`);
