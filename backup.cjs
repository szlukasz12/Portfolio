const fs = require("fs");
const path = require("path");
const shell = require("shelljs");

const folder = process.argv[2]; // np. "test" lub "prod"
const backupFolder = `${folder}_backup`;

// Tworzymy folder backup jeśli nie istnieje
if (!fs.existsSync(backupFolder)) {
  fs.mkdirSync(backupFolder);
}

// Pobieramy obecny timestamp
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

// Tworzymy backup
const sourceFolder = folder;
const backupName = path.join(backupFolder, `${folder}_${timestamp}`);
if (fs.existsSync(sourceFolder)) {
  shell.cp("-R", sourceFolder, backupName);
  console.log(`Backup folderu ${folder} zapisany jako ${backupName}`);
} else {
  console.log(`Folder ${folder} nie istnieje, brak backupu`);
}

// Zachowujemy tylko ostatnie 5 kopii
const backups = fs.readdirSync(backupFolder)
  .filter(f => f.startsWith(folder))
  .sort(); // alfabetycznie, czyli timestamp rosnąco

if (backups.length > 5) {
  const toDelete = backups.slice(0, backups.length - 5);
  toDelete.forEach(f => {
    shell.rm("-rf", path.join(backupFolder, f));
    console.log(`Usunięto stary backup: ${f}`);
  });
}
