

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
import { useTranslation } from "react-i18next";
import holyAngels from "../../data/holy/holyAngels";
import "../../styles/holy/Holy.css";
import { Link } from "react-router-dom";

function Holy({ showSlider = true }) {
  const videoRefs = useRef([]);
  const { t } = useTranslation();

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
    if (!showSlider) return undefined;

    const interval = setInterval(() => {
      nextSlide();
    }, 6000); // change time if you want

    return () => clearInterval(interval);
  }, [showSlider]);

  useEffect(() => {
    const sections = document.querySelectorAll(".holy-section");
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handlePlay = (currentIndex) => {
    videoRefs.current.forEach((video, index) => {
      if (index !== currentIndex && video) {
        video.pause();
      }
    });
  };

  const getAngelText = (id) => ({
    name: t(`holyAngels.items.${id}.name`, { lng: "en" }),
    amharicName: t(`holyAngels.items.${id}.amharicName`, { lng: "am" }),
    shortDescription: t(`holyAngels.items.${id}.shortDescription`)
  });

  return (
    <section className="holy-page">
      {showSlider && (
        <div className="holy-slider">
          {(() => {
            const currentAngel = holyAngels[current];
            const text = getAngelText(currentAngel.id);

            return (
              <>
                <img
                  src={currentAngel.image}
                  alt={text.name || text.amharicName}
                  className="slider-image"
                />

                <div className="overlay"></div>

                <div className="slider-content">
                  <h1>{text.name}</h1>
                  <h2>{text.amharicName}</h2>
                  <p>{text.shortDescription}</p>
                </div>
              </>
            );
          })()}

          <button className="arrow left" onClick={prevSlide}>
            ❮
          </button>

          <button className="arrow right" onClick={nextSlide}>
            ❯
          </button>
        </div>
      )}

      <div className="holy-container">
        {holyAngels.map((angel, index) => (
          (() => {
            const text = getAngelText(angel.id);

            return (
              <div
                key={angel.id}
                id={`angel-${angel.id}`}
                className={`holy-section ${
                  index % 2 === 0 ? "normal" : "reverse"
                }`}
              >
                <div className="holy-image">
                  <img src={angel.image} alt={text.name || text.amharicName} />
                </div>

                <div className="holy-content">
                  <h3>{text.name}</h3>
                  <h4>{text.amharicName}</h4>
                  <p>{text.shortDescription}</p>

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
                  {t("holyAngels.readMore")}
                </Link>
              </div>
            );
          })()
        ))}
      </div>
    </section>
  );
}

export default Holy;
