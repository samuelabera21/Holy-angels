# Books Import Guide

This project now supports **bulk PDF import** from `public/books`.

## 1) Folder structure

Use this structure (already created):

- `public/books/gubae-bet/akwam/akwam-basic/`
- `public/books/gubae-bet/kine/`
- `public/books/gubae-bet/zema/`
- `public/books/gubae-bet/kidase/kidase-merha/`
- `public/books/gubae-bet/nibab/nibab-qidamawi/`
- `public/books/gubae-bet/nibab/nibab-kalawi/`
- `public/books/timhirte-haymanot/timhirte-meseretawi/`
- `public/books/timhirte-haymanot/timhirte-tewahdo/`

## 2) Add PDFs

Copy your local PDF files into the correct folder.

Example:
- `public/books/gubae-bet/nibab/nibab-qidamawi/book-1.pdf`
- `public/books/gubae-bet/nibab/nibab-qidamawi/book-2.pdf`
- `public/books/timhirte-haymanot/timhirte-meseretawi/introduction.pdf`

## 3) Sync books

Run:

```bash
npm run books:sync
```

This generates `src/data/books.auto.js` automatically.

## 4) Start app

```bash
npm run dev
```

Open `/books` and test the read/open buttons.

---

## Notes

- Do **not** use `C:\...` or `D:\...` in data.
- Just place PDFs in `public/books/...` and run sync.
- File name becomes book title automatically (e.g. `my-first-book.pdf` -> `My first book`).
- If you rename or remove a PDF, run `npm run books:sync` again.
