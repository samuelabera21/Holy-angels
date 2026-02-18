import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGlobalReveal from "../hooks/useGlobalReveal";
import { bookCategories } from "../data/books";
import "../styles/reveal.css";
import "../styles/Books.css";

function Books() {
  useGlobalReveal(".books-page");
  const { t } = useTranslation();

  return (
    <div className="books-page">
      <header className="books-hero" id="books-top">
        <nav className="books-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">{t("teachings.breadcrumbs.home")}</Link>
          <span aria-hidden="true">/</span>
          <span>መጽሐፎች</span>
        </nav>

        <div className="books-hero-content">
          <h1>መጽሐፎች</h1>
          <p>
            ከስር ያሉ ምድቦችን ይምረጡ፣ ከዚያ የፒዲኤፍ መጽሐፎችን በጣቢያው ውስጥ ያንብቡ።
          </p>
        </div>
      </header>

      <section className="books-section">
        <div className="books-grid">
          {bookCategories.map((category) => (
            <Link
              key={category.id}
              to={`/books/${category.id}`}
              className="books-card"
            >
              <h2>{category.title}</h2>
              <p>{category.description}</p>
              <span className="books-card-link">ክፈት</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Books;
