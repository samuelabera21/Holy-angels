import { Link } from "react-router-dom";
import "../styles/Teachings.css";

function KidaseLanguages() {
  return (
    <div className="teaching-page">
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src="/Teaching/teaching.mp4" type="video/mp4" />
      </video>

      <div className="overlay"></div>

      <div className="teaching-content">
        <h1>ቅዳሴ</h1>
        <p>Choose language:</p>

        <div className="teaching-links">
          <Link to="/teachings/kidase/geez">ግዕዝ</Link>
          <Link to="/teachings/kidase/ezel">ዕዝል</Link>
        </div>
      </div>
    </div>
  );
}

export default KidaseLanguages;
