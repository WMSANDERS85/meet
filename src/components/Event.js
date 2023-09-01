import {useState} from 'react';

const Event = ({event}) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <li>
      <h2 className="event-title">{event.summary}</h2>
      <p className="eventStart">{event.created}</p>
      <p className="event-location">{event.location}</p>
      <button
        className="details-btn"
        onClick={() => {
          setShowDetails(!showDetails);
        }}
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails ? (
        <div className="details">
          <h2 className="event-title">{event.summary}</h2>
          <p className="eventStart">{event.created}</p>
          <p className="event-location">{event.location}</p>

          <h2>About event:</h2>
          <p>
            <a href="{event.htmlLink}">See Details on Google Calendar</a>
          </p>
          <p>{event.description}</p>
        </div>
      ) : null}
    </li>
  );
};

export default Event;
