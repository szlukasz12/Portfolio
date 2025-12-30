const fs = require("fs");
const path = require("path");
const shell = require("shelljs");

// Konfiguracja
const mode = process.argv[2]; // Przyjmuje "prod" lub "test"
const sourceFolder = "prod";  // Folder z buildem
const targetBase = "/mnt/SMB/Ogolne/NAUKA_JS_TS_REACT/Portfolio";

if (!mode) {
  console.error("Błąd: Podaj docelowy folder (np. node script.js prod)");
  process.exit(1);
}

const destinationPath = path.join(targetBase, mode);

// 1. Sprawdzenie czy folder źródłowy istnieje
if (!fs.existsSync(sourceFolder)) {
  console.error(`Błąd: Folder źródłowy '${sourceFolder}' nie istnieje. Uruchom najpierw build.`);
  process.exit(1);
}

// 2. Czyszczenie folderu docelowego na sieci
console.log(`Czyszczenie lokalizacji docelowej: ${destinationPath}...`);
shell.rm("-rf", destinationPath);

// 3. Tworzenie folderu docelowego (jeśli został usunięty lub nie istnieje)
shell.mkdir("-p", destinationPath);

// 4. Kopiowanie nowej wersji
console.log(`Kopiowanie plików z '${sourceFolder}' do '${destinationPath}'...`);
const result = shell.cp("-R", path.join(sourceFolder, "*"), destinationPath);

if (result.code === 0) {
  console.log(`✅ Gotowe! Projekt został skopiowany do: ${destinationPath}`);
} else {
  console.error("❌ Błąd podczas kopiowania plików na dysk sieciowy.");
  console.error(result.stderr);
}