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







import { useParams } from "react-router-dom";
import holyAngels from "../data/holy/holyAngels";
import "../styles/holy/HolyDetail.css";

function HolyAngelDetail() {
  const { id } = useParams();

  const angel = holyAngels.find((a) => a.id === id);

  if (!angel) {
    return (
      <section className="angel-detail">
        <h2>መላዕክት አልተገኘም</h2>
      </section>
    );
  }

  return (
    <section className="angel-detail">
      <div className="detail-hero">
        <h1>{angel.amharic}</h1>
        <p className="meaning">{angel.meaning}</p>
      </div>

      <div className="detail-body">
        <div className="image-wrapper">
          <img src={angel.image} alt={angel.amharic} />
        </div>

        <div className="description">
          <p>{angel.descriptionAm}</p>
        </div>
      </div>



    </section>
  );
}

export default HolyAngelDetail;
