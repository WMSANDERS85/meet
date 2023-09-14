import mockData from './mock-data';

export const extractLocations = (events) => {
  // use map to create a new array with only locations.
  const extractedLocations = events.map((event) => event.location);
  // remove all duplicates by creating another new array using spread operations and spreading a Set
  const locations = [...new Set(extractedLocations)];
  return locations;
};

const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    window.history.pushState('', '', newurl);
  } else {
    newurl = `${window.location.protocol}//${window.location.host}`;
    window.history.pushState('', '', newurl);
  }
};

const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(
      `https://c0n60utzj7.execute-api.us-west-1.amazonaws.com/dev/api/token/${encodeCode}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const {access_token} = await response.json();
    access_token && localStorage.setItem('access_token', access_token);

    return access_token;
  } catch (error) {
    error.json();
  }
};

// get a list of all events
export const getEvents = async () => {
  if (window.location.href.startsWith('http://localhost')) {
    return mockData;
  }
  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url = `https://c0n60utzj7.execute-api.us-west-1.amazonaws.com/dev/api/get-events/${token}`;
    const response = await fetch(url);
    if (!response.ok) {
      console.error('response not ok', response);
      return null;
    }
    const result = await response.json();
    if (result) {
      return result.events;
    } else return null;
  }
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code');
    if (!code) {
      const response = await fetch(
        'https://c0n60utzj7.execute-api.us-west-1.amazonaws.com/dev/api/get-auth-url'
      );
      const result = await response.json();
      const {authUrl} = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};
