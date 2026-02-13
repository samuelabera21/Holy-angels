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
import kidase from "../data/teachings/kidase";
import "../styles/KidaseTypesSimple.css";

const ITEMS_PER_PAGE = 6; // show six items per page

function KidaseTypes() {
  const { lang } = useParams();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const languageData = kidase.languages[lang];
  if (!languageData) return <p>Language not found</p>;

  const totalPages = Math.ceil(
    languageData.types.length / ITEMS_PER_PAGE
  );

  const start = (page - 1) * ITEMS_PER_PAGE;
  const visibleTypes = languageData.types.slice(
    start,
    start + ITEMS_PER_PAGE
  );

  const filtered = visibleTypes.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="kidase-simple-page">
      <div className="container">
        <header className="page-header">
          <h1>{languageData.title} ቅዳሴ</h1>
          <p className="subtitle">Choose a section below to view lessons and follow along.</p>
        </header>

        <div className="controls-row">
          <input
            className="simple-search"
            placeholder="Search sections..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search sections"
          />
        </div>

        <div className="cards-grid">
          {filtered.map((type) => (
            <Link
              key={type.id}
              to={`/teachings/kidase/${lang}/${type.id}`}
              className="teach-card"
            >
              <div className="card-img-wrap">
                <img src={type.image} alt={type.title} />
              </div>
              <div className="card-content">
                <h3 className="card-title">{type.title}</h3>
                <p className="card-desc">{type.description || "Open to view lessons and follow along."}</p>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="kidase-pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ◀ Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default KidaseTypes;
