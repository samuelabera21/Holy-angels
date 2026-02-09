// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useRef } from "react";
// import kidase from "../data/teachings/kidase";
// import "../styles/KidaseDetail.css";

// function KidaseSlideDetail() {
//   const { typeId, slideId } = useParams();
//   const navigate = useNavigate();
//   const audioRef = useRef(null);

//   const type = kidase.types.find(t => t.id === typeId);
//   if (!type) return <p>Kidase type not found</p>;

//   const index = type.slides.findIndex(
//     s => String(s.id) === slideId
//   );

//   const slide = type.slides[index];
//   if (!slide) return <p>Slide not found</p>;

//   // auto-play audio when slide changes
//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.load();
//       audioRef.current.play();
//     }
//   }, [slideId]);

//   return (
//     <div className="kidase-detail">
//       {/* Background video */}
//       <video className="bg-video" autoPlay muted loop playsInline>
//         <source src="/Teaching/teaching.mp4" type="video/mp4" />
//       </video>

//       <div className="overlay" />

//       <div className="content">
//         <h1>{slide.caption}</h1>

//         <img
//           src={slide.image}
//           alt={slide.caption}
//           className="kidase-image"
//         />

//         <audio ref={audioRef} controls>
//           <source src={slide.audio} type="audio/mpeg" />
//         </audio>

//         {/* Navigation */}
//         <div className="kidase-nav">
//           <button
//             disabled={index === 0}
//             onClick={() =>
//               navigate(
//                 `/teachings/kidase/${typeId}/${type.slides[index - 1].id}`
//               )
//             }
//           >
//             ◀ Previous
//           </button>

//           <button
//             disabled={index === type.slides.length - 1}
//             onClick={() =>
//               navigate(
//                 `/teachings/kidase/${typeId}/${type.slides[index + 1].id}`
//               )
//             }
//           >
//             Next ▶
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default KidaseSlideDetail;



import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import kidase from "../data/teachings/kidase";
import "../styles/KidaseDetail.css";

function KidaseSlideDetail() {
  const { lang, typeId, slideId } = useParams();
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const language = kidase.languages[lang];
  if (!language) return <p>Language not found</p>;

  const type = language.types.find(t => t.id === typeId);
  if (!type) return <p>Kidase type not found</p>;

  const index = type.slides.findIndex(
    s => String(s.id) === slideId
  );

  const slide = type.slides[index];
  if (!slide) return <p>Slide not found</p>;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [slideId]);

  return (
    <div className="kidase-detail">
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src="/Teaching/teaching.mp4" type="video/mp4" />
      </video>

      <div className="overlay" />

      <div className="content">
        <h1>{slide.caption}</h1>

        <img
          src={slide.image}
          alt={slide.caption}
          className="kidase-image"
        />

        <audio ref={audioRef} controls>
          <source src={slide.audio} type="audio/mpeg" />
        </audio>

        <div className="kidase-nav">
          <button
            disabled={index === 0}
            onClick={() =>
              navigate(
                `/teachings/kidase/${lang}/${typeId}/${type.slides[index - 1].id}`
              )
            }
          >
            ◀ Previous
          </button>

          <button
            disabled={index === type.slides.length - 1}
            onClick={() =>
              navigate(
                `/teachings/kidase/${lang}/${typeId}/${type.slides[index + 1].id}`
              )
            }
          >
            Next ▶
          </button>
        </div>
      </div>
    </div>
  );
}

export default KidaseSlideDetail;
