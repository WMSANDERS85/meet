import {render, screen} from '@testing-library/react';
import EventList from '../components/EventList';
import {getEvents} from '../api';

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
