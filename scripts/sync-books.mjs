import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const booksRoot = path.resolve(rootDir, "public", "books");
const outputFile = path.resolve(rootDir, "src", "data", "books.auto.js");

function toPosixPath(inputPath) {
  return inputPath.split(path.sep).join("/");
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9\s_-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function titleFromFilename(filename) {
  const noExt = filename.replace(/\.[^.]+$/, "");
  const spaced = noExt.replace(/[-_]+/g, " ").trim();
  if (!spaced) {
    return "Untitled Book";
  }
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

async function walkPdfFiles(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkPdfFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && path.extname(entry.name).toLowerCase() === ".pdf") {
      files.push(fullPath);
    }
  }

  return files;
}

function buildKey(parts) {
  if (parts.length >= 3) {
    return `${parts[0]}.${parts[1]}.${parts[2]}`;
  }
  if (parts.length === 2) {
    return `${parts[0]}.${parts[1]}`;
  }
  if (parts.length === 1) {
    return parts[0];
  }
  return null;
}

function sortByTitle(a, b) {
  return a.title.localeCompare(b.title, "en");
}

async function main() {
  let pdfFiles = [];

  try {
    pdfFiles = await walkPdfFiles(booksRoot);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(booksRoot, { recursive: true });
      pdfFiles = [];
    } else {
      throw error;
    }
  }

  const records = {};

  for (const filePath of pdfFiles) {
    const relativePath = path.relative(booksRoot, filePath);
    const pathSegments = relativePath.split(path.sep);
    const filename = pathSegments[pathSegments.length - 1];
    const folderSegments = pathSegments.slice(0, -1);

    const key = buildKey(folderSegments);
    if (!key) {
      continue;
    }

    const bookId = slugify(filename) || `book-${Date.now()}`;
    const encodedSegments = ["books", ...pathSegments].map((segment) =>
      encodeURIComponent(segment)
    );

    const book = {
      id: bookId,
      title: titleFromFilename(filename),
      description: "",
      pdfUrl: `/${encodedSegments.join("/")}`
    };

    if (!records[key]) {
      records[key] = [];
    }

    records[key].push(book);
  }

  for (const key of Object.keys(records)) {
    records[key].sort(sortByTitle);
  }

  const header =
    "// AUTO-GENERATED FILE. DO NOT EDIT MANUALLY.\n" +
    "// Run: npm run books:sync\n\n";
  const content = `${header}export const autoBookRecords = ${JSON.stringify(records, null, 2)};\n`;

  await fs.writeFile(outputFile, content, "utf8");

  const totalBooks = Object.values(records).reduce((sum, books) => sum + books.length, 0);
  console.log(`Synced ${totalBooks} PDF book(s) into src/data/books.auto.js`);
}

main().catch((error) => {
  console.error("books:sync failed", error);
  process.exitCode = 1;
});
