import {render, screen, waitFor, within} from '@testing-library/react';
import EventList from '../components/EventList';
import {getEvents} from '../api';
import App from '../App';

describe('<EventList /> component', () => {
  test('has an element with list role', () => {
    render(<EventList />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  test('renders correct number of events', async () => {
    const allEvents = await getEvents();
    render(<EventList events={allEvents} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(allEvents.length);
  });
});

describe('<EventList /> integration', () => {
  test('renders a list of 32 events when the app is mounted and rendered', async () => {
    const AppWrapper = render(<App />);
    const AppDom = AppWrapper.container.firstChild;
    const EventListDom = AppDom.querySelector('#event-list');
    await waitFor(() => {
      const EventListItems = within(EventListDom).queryAllByRole('listitem');
      expect(EventListItems.length).toBe(32);
    });
  });
});
