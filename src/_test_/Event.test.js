import {render} from '@testing-library/react';
import Event from '../components/Event';
import mockData from '../mock-data';
import userEvent from '@testing-library/user-event';

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

  test('by default, event details are not shown', () => {
    const eventDom = EventComponent.container.firstChild;
    const details = eventDom.querySelector(`.details`);
    expect(details).not.toBeInTheDocument();
  });

  test('click on show details button, event details are shown', async () => {
    const user = userEvent.setup();
    const button = EventComponent.container.querySelector(`.details-btn`);
    await user.click(button);

    const eventDom = EventComponent.container.firstChild;
    const details = eventDom.querySelector(`.details`);
    expect(details).toBeInTheDocument();
  });

  test('click on hide details button, event details are hidden', async () => {
    const user = userEvent.setup();
    const button = EventComponent.container.querySelector(`.details-btn`);
    await user.click(button);
    await user.click(button);

    const eventDom = EventComponent.container.firstChild;
    const details = eventDom.querySelector(`.details`);
    expect(details).not.toBeInTheDocument();
  });
});
