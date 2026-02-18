import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getCategoryById } from "../data/books";
import "../styles/Books.css";

function BookItem({ book, onRead }) {
  return (
    <article className="book-item-card">
      <h4>{book.title}</h4>
      {book.description ? <p>{book.description}</p> : null}
      <div className="book-item-actions">
        <button type="button" className="book-btn" onClick={() => onRead(book)}>
          በዚህ ገጽ አንብብ
        </button>
        <a href={book.pdfUrl} target="_blank" rel="noreferrer" className="book-btn ghost">
          PDF ክፈት
        </a>
      </div>
    </article>
  );
}

function BookCategoryDetails() {
  const { categoryId } = useParams();
  const category = getCategoryById(categoryId);
  const [activeBook, setActiveBook] = useState(null);

  if (!category) {
    return <Navigate to="/books" replace />;
  }

  useEffect(() => {
    if (!activeBook) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveBook(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeBook]);

  const renderBookGrid = (books) => {
    if (!books?.length) {
      return <p className="book-empty">እዚህ ክፍል ላይ ገና መጽሐፍ አልተጨመረም።</p>;
    }

    return (
      <div className="book-items-grid">
        {books.map((book) => (
          <BookItem key={book.id} book={book} onRead={setActiveBook} />
        ))}
      </div>
    );
  };

  const renderParts = (parts) => {
    if (!parts?.length) {
      return null;
    }

    return parts.map((part) => (
      <section key={part.id} className="book-part-block">
        <h4>{part.title}</h4>
        {renderBookGrid(part.books)}
      </section>
    ));
  };

  return (
    <div className="books-page">
      <header className="books-hero compact">
        <nav className="books-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">መነሻ</Link>
          <span aria-hidden="true">/</span>
          <Link to="/books">መጽሐፎች</Link>
          <span aria-hidden="true">/</span>
          <span>{category.title}</span>
        </nav>

        <div className="books-hero-content">
          <h1>{category.title}</h1>
          <p>{category.description}</p>
        </div>
      </header>

      <section className="books-section books-detail-section">
        {Array.isArray(category.subcategories) ? (
          category.subcategories.map((subcategory) => (
            <section key={subcategory.id} className="book-subcategory">
              <h3>{subcategory.title}</h3>

              {subcategory.books?.length ? (
                <section className="book-part-block">
                  <h4>መጽሐፎች</h4>
                  {renderBookGrid(subcategory.books)}
                </section>
              ) : null}

              {renderParts(subcategory.parts)}

              {!subcategory.books?.length && !subcategory.parts?.length ? (
                <p className="book-empty">እዚህ ክፍል ላይ ገና መጽሐፍ አልተጨመረም።</p>
              ) : null}
            </section>
          ))
        ) : (
          <>
            {category.books?.length ? (
              <section className="book-subcategory">
                <h3>መጽሐፎች</h3>
                {renderBookGrid(category.books)}
              </section>
            ) : null}

            {category.parts?.length ? (
              <section className="book-subcategory">
                <h3>ክፍሎች</h3>
                {renderParts(category.parts)}
              </section>
            ) : null}

            {!category.books?.length && !category.parts?.length ? (
              <p className="book-empty">ይህ ምድብ ላይ ገና መጽሐፍ አልተጨመረም።</p>
            ) : null}
          </>
        )}
      </section>

      {activeBook ? (
        <div className="book-reader-modal" role="dialog" aria-modal="true">
          <div
            className="book-reader-backdrop"
            onClick={() => setActiveBook(null)}
            aria-hidden="true"
          />
          <div className="book-reader-dialog">
            <header className="book-reader-header">
              <div>
                <h3>{activeBook.title}</h3>
                {activeBook.description ? <p>{activeBook.description}</p> : null}
              </div>
              <button
                type="button"
                className="book-reader-close"
                onClick={() => setActiveBook(null)}
              >
                ዝጋ
              </button>
            </header>
            <iframe
              title={activeBook.title}
              src={activeBook.pdfUrl}
              className="book-reader-frame book-reader-frame-modal"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default BookCategoryDetails;
