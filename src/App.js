import {useEffect, useState} from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import {extractLocations, getEvents} from './api';
import {InfoAlert, ErrorAlert} from './components/Alert';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNoe, setCurrentNoe] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');
  const [infoAlert, setInfoAlert] = useState('');

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents =
      currentCity === 'See all cities'
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNoe));
    setAllLocations(extractLocations(allEvents));
  };

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNoe]);

  return (
    <div className="App">
      <header className="header">
        <div className="logo">Meet App</div>
        <div className="slogan">Never miss another Event</div>
      </header>
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
      </div>
      <div className
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />
      <NumberOfEvents setCurrentNoe={setCurrentNoe} />
      <EventList events={events} />
    </div>
  );
};

export default App;

