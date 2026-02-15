// import { Link } from "react-router-dom";
// import kidase from "../data/teachings/kidase";
// import "../styles/KidaseTypes.css";

// function KidaseTypes() {
//   return (
//     <div className="kidase-types-page">
//       <h1 className="title">{kidase.title}</h1>
//       <p className="description">{kidase.description}</p>

//       <div className="types-grid">
//         {kidase.types.map((type) => (
//           <Link
//             key={type.id}
//             to={`/teachings/kidase/${type.id}`}
//             className="type-card"
//           >
//             <img src={type.image} alt={type.title} />
//             <h3>{type.title}</h3>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default KidaseTypes;



// import { useParams, Link } from "react-router-dom";
// import kidase from "../data/teachings/kidase";
// import "../styles/KidaseTypes.css";

// function KidaseTypes() {
//   const { lang } = useParams();
//   const languageData = kidase.languages[lang];

//   if (!languageData) {
//     return <p>Language not found</p>;
//   }

//   return (
//     <div>
//       <h1>{languageData.title} ቅዳሴ</h1>

//       <div className="kidase-types">
//         {languageData.types.map((type) => (
//           <Link
//             key={type.id}
//             to={`/teachings/kidase/${lang}/${type.id}`}
//             className="kidase-card"
//           >
//             <img src={type.image} alt={type.title} />
//             <h3>{type.title}</h3>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default KidaseTypes;






// import { useParams, Link } from "react-router-dom";
// import kidase from "../data/teachings/kidase";
// import "../styles/KidaseTypes.css";

// function KidaseTypes() {
//   const { lang } = useParams();
//   const languageData = kidase.languages[lang];

//   if (!languageData) {
//     return <p>Language not found</p>;
//   }

//   return (
//     <div className="kidase-page">
//       {/* background video */}
//       <video className="bg-video" autoPlay muted loop playsInline>
//         <source src="/Teaching/teaching.mp4" type="video/mp4" />
//       </video>

//       <div className="overlay" />

//       <div className="kidase-content">
//         <h1>{languageData.title} ቅዳሴ</h1>
//         <p>የቅዳሴ አይነቶችን ይምረጡ</p>

//         <div className="kidase-types">
//           {languageData.types.map((type) => (
//             <Link
//               key={type.id}
//               to={`/teachings/kidase/${lang}/${type.id}`}
//               className="kidase-card"
//             >
//               <img src={type.image} alt={type.title} />
//               <h3>{type.title}</h3>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default KidaseTypes;


import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useGlobalReveal from "../hooks/useGlobalReveal";
import "../styles/reveal.css";
import kidase from "../data/teachings/kidase";
import "../styles/KidaseTypesSimple.css";

const ITEMS_PER_PAGE = 6; // show six items per page

function KidaseTypes() {
  const { lang } = useParams();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const { t } = useTranslation();

  useGlobalReveal(".kidase-simple-page");

  const languageData = kidase.languages[lang];
  if (!languageData) return <p>{t("kidase.errors.languageNotFound")}</p>;

  const languageTitle = t(`kidase.languages.${lang}`);

  const totalPages = Math.ceil(
    languageData.types.length / ITEMS_PER_PAGE
  );

  const start = (page - 1) * ITEMS_PER_PAGE;
  const visibleTypes = languageData.types.slice(
    start,
    start + ITEMS_PER_PAGE
  );

  const filtered = visibleTypes.filter((type) => {
    const typeTitle = t(`kidase.content.${lang}.types.${type.id}.title`);
    return typeTitle.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="kidase-simple-page">
      <header className="kidase-types-hero">
        <nav className="kidase-types-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">{t("kidase.breadcrumbs.home")}</Link>
          <span aria-hidden="true">/</span>
          <Link to="/teachings">{t("kidase.breadcrumbs.teachings")}</Link>
          <span aria-hidden="true">/</span>
          <Link to="/teachings/kidase">{t("kidase.breadcrumbs.kidase")}</Link>
          <span aria-hidden="true">/</span>
          <span>{languageTitle}</span>
        </nav>

        <div className="kidase-types-hero-content">
          <h1>
            {t("kidase.types.heroTitle", {
              language: languageTitle
            })}
          </h1>
          <p>{t("kidase.types.heroSubtitle")}</p>
        </div>
      </header>

      <div className="container">
        <header className="page-header">
          <h2>{t("kidase.types.sectionTitle")}</h2>
          <p className="subtitle">{t("kidase.types.sectionSubtitle")}</p>
        </header>

        <div className="controls-row">
          <input
            className="simple-search"
            placeholder={t("kidase.types.searchPlaceholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={t("kidase.types.searchAriaLabel")}
          />
        </div>

        <div className="cards-grid">
          {filtered.map((type) => {
            const typeTitle = t(`kidase.content.${lang}.types.${type.id}.title`);
            return (
              <Link
                key={type.id}
                to={`/teachings/kidase/${lang}/${type.id}`}
                className="teach-card"
              >
                <div className="card-img-wrap">
                  <img src={type.image} alt={typeTitle} />
                </div>
                <div className="card-content">
                  <h3 className="card-title">{typeTitle}</h3>
                  <p className="card-desc">
                    {t("kidase.types.cardDescription")}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="kidase-pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              {t("kidase.pagination.previous")}
            </button>

            <span>
              {t("kidase.pagination.pageOf", {
                page,
                total: totalPages
              })}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              {t("kidase.pagination.next")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default KidaseTypes;
