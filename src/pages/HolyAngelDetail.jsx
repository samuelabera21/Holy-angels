// import { useParams } from "react-router-dom";
// import angels from "../data/holy/holyAngels";

// function HolyAngelDetail() {
//   const { id } = useParams();

//   const angel = angels.find((a) => a.id === id);

//   if (!angel) return <h2>Angel Not Found</h2>;

//   return (
//     <section className="angel-detail">
//       <h1>{angel.name}</h1>
//       <h3>{angel.amharicName}</h3>

//       <img src={angel.image} alt={angel.name} />

//       <div className="description">
//         <h4>Amharic</h4>
//         <p>{angel.descriptionAm}</p>

//         <h4>English</h4>
//         <p>{angel.descriptionEn}</p>
//       </div>
//     </section>
//   );
// }

// export default HolyAngelDetail;





// import { useParams } from "react-router-dom";
// import holyAngels from "../data/holy/holyAngels";
// import "../styles/holy/HolyDetail.css";

// function HolyAngelDetail() {
//   const { id } = useParams();

//   const angel = holyAngels.find((a) => a.id === id);

//   if (!angel) {
//     return (
//       <section className="angel-detail">
//         <h2>Angel Not Found</h2>
//       </section>
//     );
//   }

//   return (
//     <section className="angel-detail">
//       <div className="detail-hero">
//         <h1>{angel.name}</h1>
//         <h3>{angel.amharic}</h3>
//       </div>

//       <div className="detail-body">
//         <img src={angel.image} alt={angel.name} />

//         <div className="description">
//           <h4>Meaning</h4>
//           <p>{angel.meaning}</p>

//           <h4>English</h4>
//           <p>{angel.descriptionEn}</p>

//           <h4>Amharic</h4>
//           <p>{angel.descriptionAm}</p>
//         </div>
//       </div>

//       {angel.video && (
//         <video controls poster={angel.image}>
//           <source src={angel.video} type="video/mp4" />
//         </video>
//       )}
//     </section>
//   );
// }

// export default HolyAngelDetail;







import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import holyAngels from "../data/holy/holyAngels";
import "../styles/holy/HolyAngelDetail.css";

function HolyAngelDetail() {
  const { id } = useParams();
  const { t } = useTranslation();

  const angel = holyAngels.find((a) => a.id === id);

  if (!angel) {
    return (
      <section className="holy-angel-detail-page">
        <header className="holy-angel-detail-hero">
          <nav className="holy-angel-detail-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">{t("holyAngelDetail.breadcrumbs.home")}</Link>
            <span aria-hidden="true">/</span>
            <Link to="/holy-angels">{t("holyAngelDetail.breadcrumbs.holyAngels")}</Link>
            <span aria-hidden="true">/</span>
            <span>{t("holyAngelDetail.notFound.breadcrumb")}</span>
          </nav>

          <div className="holy-angel-detail-hero-content">
            <h1>{t("holyAngelDetail.notFound.title")}</h1>
            <p>{t("holyAngelDetail.notFound.subtitle")}</p>
          </div>
        </header>
      </section>
    );
  }

  const enName = t(`holyAngels.items.${angel.id}.name`, { lng: "en" });
  const amName = t(`holyAngels.items.${angel.id}.amharicName`, { lng: "am" });
  const shortDescription = t(
    `holyAngels.items.${angel.id}.shortDescription`
  );
  const descriptionAm = t(`holyAngels.items.${angel.id}.descriptionAm`, {
    lng: "am"
  });
  const descriptionEn = t(`holyAngels.items.${angel.id}.descriptionEn`, {
    lng: "en"
  });

  return (
    <section className="holy-angel-detail-page">
      <header className="holy-angel-detail-hero">
        <nav className="holy-angel-detail-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">{t("holyAngelDetail.breadcrumbs.home")}</Link>
          <span aria-hidden="true">/</span>
          <Link to="/holy-angels">{t("holyAngelDetail.breadcrumbs.holyAngels")}</Link>
          <span aria-hidden="true">/</span>
          <span>{amName || enName}</span>
        </nav>

        <div className="holy-angel-detail-hero-content">
          <h1>{amName || enName}</h1>
          {enName && <p className="holy-angel-detail-subtitle">{enName}</p>}
        </div>
      </header>

      <div className="holy-angel-detail-container">
        <div className="holy-angel-detail-body">
          <div className="holy-angel-detail-media">
            <img src={angel.image} alt={enName || amName} />

            {angel.video && (
              <video controls poster={angel.image}>
                <source src={angel.video} type="video/mp4" />
                {t("holyAngelDetail.videoFallback")}
              </video>
            )}
          </div>

          <div className="holy-angel-detail-text">
            <h2>{t("holyAngelDetail.aboutTitle")}</h2>
            {shortDescription && <p>{shortDescription}</p>}

            {descriptionAm && (
              <div className="holy-angel-detail-section">
                <h3>{t("holyAngelDetail.sections.amharic")}</h3>
                <p>{descriptionAm}</p>
              </div>
            )}

            {descriptionEn && (
              <div className="holy-angel-detail-section">
                <h3>{t("holyAngelDetail.sections.english")}</h3>
                <p>{descriptionEn}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HolyAngelDetail;
