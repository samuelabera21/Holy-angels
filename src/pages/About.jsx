import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();

  return (
    <main className="about-page">
      <header className="about-hero">
        <h1>{t("about.title")}</h1>
        <p>{t("about.subtitle")}</p>
      </header>
    </main>
  );
}

export default About;