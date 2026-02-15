
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Holy from "../components/holy/Holy";
import holyAngels from "../data/holy/holyAngels";
import "../styles/holy/HolyAngels.css";

function HolyAngels() {
  const [current, setCurrent] = useState(0);
  const total = holyAngels.length;
  const { t } = useTranslation();

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (total === 0) return undefined;

    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [total]);

  const getAngelLabel = (id) => {
    const amName = t(`holyAngels.items.${id}.amharicName`, {
      lng: "am",
      defaultValue: ""
    });
    const enName = t(`holyAngels.items.${id}.name`, {
      lng: "en",
      defaultValue: ""
    });

    return amName || enName;
  };

  return (
    <main className="holy-angels-page">
      <header className="holy-angels-hero">
        <div className="holy-angels-hero-media" aria-hidden="true">
          <img
            src={holyAngels[current]?.image}
            alt=""
            className="holy-angels-hero-image"
          />
          <div className="holy-angels-hero-overlay" />

          <button
            className="holy-angels-arrow left"
            onClick={prevSlide}
            aria-label={t("holyAngels.slider.prevAria")}
            type="button"
          >
            ❮
          </button>
          <button
            className="holy-angels-arrow right"
            onClick={nextSlide}
            aria-label={t("holyAngels.slider.nextAria")}
            type="button"
          >
            ❯
          </button>
        </div>



        <div className="holy-angels-hero-content">
          <br /><br /><br />
          <h1>{t("holyAngels.hero.title")}</h1>
          <a className="holy-angels-hero-cta" href="#holy-angels-list">
            {t("holyAngels.hero.cta")}
          </a>
        </div>
      </header>

      <div className="holy-angels-layout">
        <aside
          className="holy-angels-toc"
          aria-label={t("holyAngels.toc.ariaLabel")}
        >
          <h2>{t("holyAngels.toc.title")}</h2>
          <a href="#holy-angels-list">{t("holyAngels.toc.all")}</a>
          {holyAngels.map((angel) => (
            <a key={angel.id} href={`#angel-${angel.id}`}>
              {getAngelLabel(angel.id)}
            </a>
          ))}
        </aside>

        <div className="holy-angels-content" id="holy-angels-list">
          <Holy showSlider={false} />
        </div>
      </div>
    </main>
  );
}

export default HolyAngels;