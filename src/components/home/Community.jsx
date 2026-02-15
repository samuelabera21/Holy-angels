// import { useEffect, useRef, useState } from "react";
// import "../../styles/Community.css";
// import community from "../../assets/images/community/community.jpg";
// import { useNavigate } from "react-router-dom";


// function Community() {
//   const sectionRef = useRef(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//           observer.disconnect(); // animate once
//         }
//       },
//       { threshold: 0.3 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className={`community ${visible ? "show" : ""}`}
//     >
//       <div className="community-text">
//        <h2>የቅዱሳን ማህበር</h2>
// <p>
// በኦርቶዶክስ ቤተክርስቲያን ማህበር ውስጥ እምነት፣ ፍቅር እና አገልግሎት በአንድነት ይኖራሉ።
// አማኞች በጸሎት፣ በቅዱሳን ሥነ-ሥርዓት እና በምስጋና እግዚአብሔርን ይቀርባሉ፤
// እርስ በርሳቸውም በፍቅር ይገናኛሉ። ማህበሩ የመንፈሳዊ እድገት ቦታ ሲሆን
// የተቸገሩትን መርዳት፣ ሰላምን ማስፋፋት እና ወንጌልን መኖር የሕይወታቸው ክፍል ነው።
// በዚህ ማህበር ውስጥ ሰዎች እምነታቸውን ያጠናክራሉ፣ በአንድነትም ወደ
// እግዚአብሔር ይቀርባሉ።
// </p>


//         <button >እዚህ ይማሩ</button>
//       </div>

//       <div className="community-image">
//        <img src={community} alt="Community gathering" />
//       </div>
//     </section>
//   );
// }

// export default Community;




import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "../../styles/Community.css";
import community from "../../assets/images/community/community.jpg";

function Community() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate(); // for navigation

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // animate once
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`community ${visible ? "show" : ""}`}
    >
      <div className="community-text">
        <h2>{t("home.community.title")}</h2>

        <p>{t("home.community.body")}</p>

        <button onClick={() => navigate("/teachings")}>
          {t("home.community.cta")}
        </button>
      </div>

      <div className="community-image">
        <video controls width="100%" height="100%">
    <source src="/history/hamelmal.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
      </div>
    </section>
  );
}

export default Community;
