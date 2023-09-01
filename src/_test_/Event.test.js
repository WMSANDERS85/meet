import {render} from '@testing-library/react';
import Event from '../components/Event';
import mockData from '../mock-data';

const mockEvent = mockData[0];

describe('<Event /> component', () => {
  let EventComponent;
  beforeEach(() => {
    EventComponent = render(<Event event={mockEvent} />);
  });

  test('renders event title', () => {
    const eventTitle = EventComponent.queryByText(mockEvent.summary);
    expect(eventTitle).toBeInTheDocument();
  });

  test('renders event start time', () => {
    const eventStartTime = EventComponent.queryByText(mockEvent.created);
    expect(eventStartTime).toBeInTheDocument();
  });

  test('show events locations', () => {
    const eventLocation = EventComponent.queryByText(mockEvent.location);
    expect(eventLocation).toBeInTheDocument();
  });

  test('show details button', () => {
    const button = EventComponent.container.querySelector(`.details-btn`);
    expect(button).toBeInTheDocument();
  });
});
