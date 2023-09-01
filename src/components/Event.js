const Event = ({event}) => {
  return (
    <li>
      <h2 className="event-title">{event.summary}</h2>
      <p className="eventStart">{event.created}</p>
      <p className="event-location">{event.location}</p>
      <button className="details-btn">Details</button>
    </li>
  );
};

export default Event;
