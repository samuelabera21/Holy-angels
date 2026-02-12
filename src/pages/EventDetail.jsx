import { useParams } from "react-router-dom";
import events from "../data/events";
import "../styles/holy/HolyDetail.css";

function EventDetail() {
  const { id } = useParams();

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <section className="angel-detail">
        <h2>Event Not Found</h2>
      </section>
    );
  }

  return (
    <section className="angel-detail">
      <div className="detail-hero">
        <h1>{event.title}</h1>
        <p className="meaning">{event.date}</p>
      </div>

      <div className="detail-body">
        <div className="image-wrapper">
          {event.video ? (
            <video controls poster={event.image}>
              <source src={event.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={event.image} alt={event.title} />
          )}
        </div>

        <div className="description">
          <p>{event.desc}</p>
        </div>
      </div>
    </section>
  );
}

export default EventDetail;
