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






import { useParams, Link } from "react-router-dom";
import kidase from "../data/teachings/kidase";
import "../styles/KidaseTypes.css";

function KidaseTypes() {
  const { lang } = useParams();
  const languageData = kidase.languages[lang];

  if (!languageData) {
    return <p>Language not found</p>;
  }

  return (
    <div className="kidase-page">
      {/* background video */}
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src="/Teaching/teaching.mp4" type="video/mp4" />
      </video>

      <div className="overlay" />

      <div className="kidase-content">
        <h1>{languageData.title} ቅዳሴ</h1>
        <p>የቅዳሴ አይነቶችን ይምረጡ</p>

        <div className="kidase-types">
          {languageData.types.map((type) => (
            <Link
              key={type.id}
              to={`/teachings/kidase/${lang}/${type.id}`}
              className="kidase-card"
            >
              <img src={type.image} alt={type.title} />
              <h3>{type.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default KidaseTypes;
