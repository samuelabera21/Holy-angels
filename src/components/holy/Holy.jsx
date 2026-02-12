

// import { useRef, useState, useEffect } from "react";

// import holyAngels from "../../data/holy/holyAngels";
// import "../../styles/holy/Holy.css";
// import { Link } from "react-router-dom";
// import { useRef } from "react";




// function Holy() {

//   const videoRefs = useRef([]);

// const handlePlay = (currentIndex) => {
//   videoRefs.current.forEach((video, index) => {
//     if (index !== currentIndex && video) {
//       video.pause();
//     }
//   });
// };
//   return (
//     <section className="holy-page">

//       {/* HERO */}
//       <div className="holy-hero">
//         <h1>Holy Angels</h1>
//         <h2>ቅዱሳን መላዕክት</h2>
//         <p>
//           ሰባቱ  ቅዱሳን ሊቃነ መላዕክት  
//         </p>
//       </div>

//       {/* ANGELS */}
//       <div className="holy-container">
//         {holyAngels.map((angel, index) => (
//           <div
//             key={angel.id}
//             className={`holy-section ${
//               index % 2 === 0 ? "normal" : "reverse"
//             }`}
//           >
//             <div className="holy-image">
//               <img src={angel.image} alt={angel.name} />
//             </div>

//             <div className="holy-content">
//               <h3>{angel.name}</h3>
// <h4>{angel.amharicName}</h4>
// <p>{angel.shortDescription}</p>


//             {angel.video && (
//  <video
//   ref={(el) => (videoRefs.current[index] = el)}
//   src={angel.video}
//   controls
//   poster={angel.image}
//   onPlay={() => handlePlay(index)}
// />

// )}

//             </div>
//             <Link to={`/holy-angels/${angel.id}`} className="read-more">
//   Read More →
// </Link>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Holy;









import { useRef, useState, useEffect } from "react";
import holyAngels from "../../data/holy/holyAngels";
import "../../styles/holy/Holy.css";
import { Link } from "react-router-dom";

function Holy() {

  const videoRefs = useRef([]);

  /* 🔥 SLIDER STATE */
  const [current, setCurrent] = useState(0);
  const total = holyAngels.length;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  /* 🔥 AUTO SLIDE */
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000); // change time if you want

    return () => clearInterval(interval);
  }, []);

  const handlePlay = (currentIndex) => {
    videoRefs.current.forEach((video, index) => {
      if (index !== currentIndex && video) {
        video.pause();
      }
    });
  };

  return (
    <section className="holy-page">

      {/* 🔥 NEW FULL SCREEN SLIDER HERO */}
      <div className="holy-slider">

  <img
    src={holyAngels[current].image}
    alt={holyAngels[current].name}
    className="slider-image"
  />

        <div className="overlay"></div>

        <div className="slider-content">
          <h1>{holyAngels[current].name}</h1>
          <h2>{holyAngels[current].amharicName}</h2>
          <p>{holyAngels[current].shortDescription}</p>
        </div>

        <button className="arrow left" onClick={prevSlide}>
          ❮
        </button>

        <button className="arrow right" onClick={nextSlide}>
          ❯
        </button>
      </div>

      {/* ANGELS (UNCHANGED) */}
      <div className="holy-container">
        {holyAngels.map((angel, index) => (
          <div
            key={angel.id}
            className={`holy-section ${
              index % 2 === 0 ? "normal" : "reverse"
            }`}
          >
            <div className="holy-image">
              <img src={angel.image} alt={angel.name} />
            </div>

            <div className="holy-content">
              <h3>{angel.name}</h3>
              <h4>{angel.amharicName}</h4>
              <p>{angel.shortDescription}</p>

              {angel.video && (
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={angel.video}
                  controls
                  poster={angel.image}
                  onPlay={() => handlePlay(index)}
                />
              )}
            </div>

            <Link
              to={`/holy-angels/${angel.id}`}
              className="read-more"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Holy;
