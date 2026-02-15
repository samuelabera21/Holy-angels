// function InEthiopia() {
//   return (
//     <section className="history-section">
//       <h2>Orthodox Christianity in Ethiopia</h2>
//       <p>
//         This section will describe how Christianity reached Ethiopia, who introduced it,
//         and how it became deeply rooted in Ethiopian culture.
//       </p>
//     </section>
//   );
// }

// export default InEthiopia;


import { useTranslation } from "react-i18next";
import "../../styles/history/InEthiopia.css";

function InEthiopia() {
  const { t } = useTranslation();

  return (
    <section className="history-ethiopia" id="history-ethiopia">
      <div className="ethiopia-container">
        {/* Text */}
        <div className="ethiopia-text">
          <h2>
            {t("history.ethiopia.title", {
              defaultValue: "Orthodoxy in Ethiopia"
            })}
          </h2>
          <p>
            {t("history.ethiopia.paragraphs.0", {
              defaultValue:
                "Christianity reached Ethiopia in the early centuries through apostolic tradition. The Ethiopian Orthodox Tewahedo Church became a pillar of faith, culture, and national identity."
            })}
          </p>

          <p>
            {t("history.ethiopia.paragraphs.1", {
              defaultValue:
                "For centuries, the Church preserved scripture, tradition, and spiritual life, shaping Ethiopian history and civilization."
            })}
          </p>
        </div>

        {/* Image placeholder */}
        <div className="ethiopia-image">
<div className="image-box">
  <video controls width="100%" height="100%">
    <source src="/history/historyy.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

        </div>
      </div>
    </section>
  );
}

export default InEthiopia;
