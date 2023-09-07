/* eslint-disable testing-library/no-node-access */
import {render, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {getEvents} from '../api';
import App from '../App';

describe('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });
  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  test('render number of events', () => {
    expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
  });
});

describe('<App /> integration', () => {
  test('renders a list of events matching the city selected by the user', async () => {
    const AppWrapper = render(<App />);
    const AppDOM = AppWrapper.container.firstChild;
    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

    await userEvent.type(CitySearchInput, 'Berlin');
    const berlinSuggestionItem =
      within(CitySearchDOM).queryByText('Berlin, Germany');

    await userEvent.click(berlinSuggestionItem);

    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEvents = within(EventListDOM).queryAllByRole('listitem');

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      (event) => event.location === 'Berlin, Germany'
    );

    expect(allRenderedEvents.length).toBe(berlinEvents.length);

    allRenderedEvents.forEach((event) => {
      expect(event.textContent).toContain('Berlin, Germany');
    });
  });

  test('renders a list of events matching the number selected by the user', async () => {
    const AppWrapper = render(<App />);
    const AppDOM = AppWrapper.container.firstChild;
    const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
    const NumberOfEventsInput =
      within(NumberOfEventsDOM).queryByRole('textbox');

    await userEvent.type(NumberOfEventsInput, `{backspace}{backspace}10`);

    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEvents = within(EventListDOM).queryAllByRole('listitem');
    expect(allRenderedEvents.length).toEqual(10);
  });
});
