import mockData from './mock-data';

export const extractLocations = (events) => {
  // use map to create a new array with only locations.
  const extractedLocations = events.map((event) => event.location);
  // remove all duplicates by creating another new array using spread operations and spreading a Set
  const locations = [...new Set(extractedLocations)];
  return locations;
};

// get a list of all events
export const getEvents = async () => {
  return mockData;
};
