import { autoBookRecords } from "./books.auto";

const baseCategories = [
  {
    id: "gubae-bet",
    title: "ጉባኤ ቤት",
    description: "የጉባኤ ቤት መጽሐፎች በክፍል ተደራጅተው",
    subcategories: [
      {
        id: "akwam",
        title: "አቋቋም",
        parts: [
          {
            id: "akwam-basic",
            title: "መሠረታዊ",
            books: []
          }
        ]
      },
      {
        id: "kine",
        title: "ቅኔ",
        parts: []
      },
      {
        id: "zema",
        title: "ዜማ",
        parts: []
      },
      {
        id: "kidase",
        title: "ቅዳሴ",
        parts: [
          {
            id: "kidase-merha",
            title: "መርሐ ግብር",
            books: []
          }
        ]
      },
      {
        id: "nibab",
        title: "ንባብ",
        parts: [
          {
            id: "nibab-qidamawi",
            title: "ቀዳማዊ ክፍል",
            books: []
          },
          {
            id: "nibab-kalawi",
            title: "ካላዊ ክፍል",
            books: []
          }
        ]
      }
    ]
  },
  {
    id: "timhirte-haymanot",
    title: "ትምህርተ ሀይማኖት",
    description: "የእምነት እና ሥርዓተ ቤተክርስቲያን ትምህርቶች",
    parts: [
      {
        id: "timhirte-meseretawi",
        title: "መሠረታዊ ትምህርተ ሀይማኖት",
        books: []
      },
      {
        id: "timhirte-tewahdo",
        title: "ተዋሕዶ መሠረቶች",
        books: []
      }
    ]
  }
];

function getAutoBooks(...pathParts) {
  const key = pathParts.filter(Boolean).join(".");
  return autoBookRecords[key] || [];
}

function hydrateCategories(categories) {
  return categories.map((category) => {
    const hydratedCategory = {
      ...category,
      books: getAutoBooks(category.id)
    };

    if (Array.isArray(category.parts)) {
      hydratedCategory.parts = category.parts.map((part) => ({
        ...part,
        books: getAutoBooks(category.id, part.id)
      }));
    }

    if (Array.isArray(category.subcategories)) {
      hydratedCategory.subcategories = category.subcategories.map((subcategory) => {
        const hydratedSubcategory = {
          ...subcategory,
          books: getAutoBooks(category.id, subcategory.id)
        };

        if (Array.isArray(subcategory.parts)) {
          hydratedSubcategory.parts = subcategory.parts.map((part) => ({
            ...part,
            books: getAutoBooks(category.id, subcategory.id, part.id)
          }));
        }

        return hydratedSubcategory;
      });
    }

    return hydratedCategory;
  });
}

export const bookCategories = hydrateCategories(baseCategories);

export function getCategoryById(categoryId) {
  return bookCategories.find((category) => category.id === categoryId);
}

export function getBookByIds(categoryId, bookId) {
  const category = getCategoryById(categoryId);

  if (!category) {
    return null;
  }

  const topLevelBook = category.books?.find((book) => book.id === bookId);
  if (topLevelBook) {
    return {
      category,
      sectionTitle: category.title,
      partTitle: null,
      book: topLevelBook
    };
  }

  if (Array.isArray(category.parts)) {
    for (const part of category.parts) {
      const partBook = part.books?.find((book) => book.id === bookId);
      if (partBook) {
        return {
          category,
          sectionTitle: category.title,
          partTitle: part.title,
          book: partBook
        };
      }
    }
  }

  if (Array.isArray(category.subcategories)) {
    for (const section of category.subcategories) {
      const match = section.books?.find((book) => book.id === bookId);
      if (match) {
        return {
          category,
          sectionTitle: section.title,
          partTitle: null,
          book: match
        };
      }

      if (Array.isArray(section.parts)) {
        for (const part of section.parts) {
          const nestedMatch = part.books?.find((book) => book.id === bookId);
          if (nestedMatch) {
            return {
              category,
              sectionTitle: section.title,
              partTitle: part.title,
              book: nestedMatch
            };
          }
        }
      }
    }
  }

  return null;
}
