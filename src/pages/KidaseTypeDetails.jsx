// import { useParams, Link } from "react-router-dom";
// import { useState } from "react";
// import kidase from "../data/teachings/kidase";
// import "../styles/TeachingDetails.css";

// const ITEMS_PER_PAGE = 6;

// function KidaseTypeDetails() {
//   const { typeId } = useParams();
//   const [page, setPage] = useState(1);

//   const type = kidase.types.find(t => t.id === typeId);
//   if (!type) return <p>Kidase type not found</p>;

//   const totalPages = Math.ceil(type.slides.length / ITEMS_PER_PAGE);
//   const start = (page - 1) * ITEMS_PER_PAGE;
//   const visibleSlides = type.slides.slice(start, start + ITEMS_PER_PAGE);

//   return (
//     <div className="teaching-details">
//       <video className="teaching-bg-video" autoPlay muted loop playsInline>
//         <source src="/Teaching/teaching.mp4" type="video/mp4" />
//       </video>

//       <div className="teaching-content">
//         <h1 className="teaching-title">{type.title}</h1>

//         <div className="slides-wrapper">
//           {visibleSlides.map(slide => (
//             <Link
//               key={slide.id}
//               to={`/teachings/kidase/${type.id}/${slide.id}`}
//               className="media-card"
//             >
//               <img src={slide.image} alt={slide.caption} />
//               <h3>{slide.caption}</h3>
//             </Link>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="pagination">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage(p => p - 1)}
//           >
//             Previous
//           </button>

//           <span>Page {page} of {totalPages}</span>

//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage(p => p + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default KidaseTypeDetails;


import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import kidase from "../data/teachings/kidase";
import "../styles/KidaseTypeDetailsSimple.css";

const ITEMS_PER_PAGE = 6;

function KidaseTypeDetails() {
  const { lang, typeId } = useParams();
  const [page, setPage] = useState(1);

  const language = kidase.languages[lang];
  if (!language) return <p>Language not found</p>;

  const type = language.types.find(t => t.id === typeId);
  if (!type) return <p>Kidase type not found</p>;

  const totalPages = Math.ceil(type.slides.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const visibleSlides = type.slides.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="kidase-type-simple">
      <div className="kt-container">
        <header className="kt-header">
          <h1>{type.title}</h1>
          <p className="kt-sub">Choose a section to listen and continue the Kidase</p>
        </header>

        <div className="slides-wrapper">
          {visibleSlides.map((slide) => (
            <Link
              key={slide.id}
              to={`/teachings/kidase/${lang}/${typeId}/${slide.id}`}
              className="media-card-simple"
            >
              <div className="mc-img">
                <img src={slide.image} alt={slide.caption} />
              </div>
              <h3>{slide.caption}</h3>
            </Link>
          ))}
        </div>

        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </button>

          <span>Page {page} of {totalPages}</span>

          <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default KidaseTypeDetails;





// import { useParams, Link } from "react-router-dom";
// import { useState } from "react";
// import kidase from "../data/teachings/kidase";
// import "../styles/KidaseTypeDetails.css";

// const ITEMS_PER_PAGE = 6;

// function KidaseTypeDetails() {
//   const { lang, typeId } = useParams();
//   const [page, setPage] = useState(1);

//   const language = kidase.languages[lang];
//   if (!language) return <p>Language not found</p>;

//   const type = language.types.find(t => t.id === typeId);
//   if (!type) return <p>Kidase type not found</p>;

//   const totalPages = Math.ceil(type.slides.length / ITEMS_PER_PAGE);
//   const start = (page - 1) * ITEMS_PER_PAGE;
//   const visibleSlides = type.slides.slice(start, start + ITEMS_PER_PAGE);

//   return (
//     <div className="kidase-page">
//       {/* Background video */}
//       <video className="bg-video" autoPlay muted loop playsInline>
//         <source src="/Teaching/teaching.mp4" type="video/mp4" />
//       </video>

//       {/* Overlay */}
//       <div className="overlay" />

//       {/* Content */}
//       <div className="kidase-content">
//         <h1>{type.title}</h1>
//         <p>Choose a section to listen and continue the Kidase</p>

//         <div className="kidase-types">
//           {visibleSlides.map(slide => (
//             <Link
//               key={slide.id}
//               to={`/teachings/kidase/${lang}/${typeId}/${slide.id}`}
//               className="kidase-card"
//             >
//               <img src={slide.image} alt={slide.caption} />
//               <h3>{slide.caption}</h3>
//             </Link>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="pagination">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage(p => p - 1)}
//           >
//             Previous
//           </button>

//           <span>Page {page} of {totalPages}</span>

//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage(p => p + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default KidaseTypeDetails;
