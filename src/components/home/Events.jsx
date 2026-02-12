// import "../../styles/Events.css";

// /*
//   Events Section
//   --------------
//   Later:
//   - Will use useState + useEffect
//   - Data may come from JSON or API
// */

// function Events() {
//   return (
//     <section className="events">
//       <h2>Upcoming Events</h2>

//       <div className="event-list">
//         <article className="event-card">
//           <h3>Feeding Those in Need</h3>
//           <p>Providing food and support for the poor and homeless.</p>
//           <span>September 12, 2023</span>
//         </article>

//         <article className="event-card">
//           <h3>Monthly Worship Gathering</h3>
//           <p>Join us for prayer, worship, and teaching.</p>
//           <span>October 24, 2023</span>
//         </article>
//       </div>
//     </section>
//   );
// }

// export default Events;


import "../../styles/Events.css";
import events from "../../data/events";
import { Link } from "react-router-dom";

function Events() {
  return (
    <section className="events">
      {/* HERO TITLE */}
      <div className="events-content">
        <h2>የቤተ ክርስቲያን በዓላት</h2>
        <p className="subtitle">የቤተ ክርስቲያን ታላቅ በዓላት እና ክብር</p>
      </div>

      {/* EVENTS - modern holy style: image on one side, description on the other */}
      <div className="events-container">
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`events-section ${index % 2 === 0 ? "normal" : "reverse"}`}
          >
            <div className="image-wrapper">
              <img src={event.image} alt={event.title} />
            </div>

            <div className="events-desc">
              <h3>{event.title}</h3>
              <p>{event.desc}</p>
              <span>{event.date}</span>

              <div style={{ marginTop: 18 }}>
                <Link to={`/events/${event.id}`} className="read-more">
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Events;
