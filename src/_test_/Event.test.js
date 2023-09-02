import {render, screen} from '@testing-library/react';
import Event from '../components/Event';
import mockData from '../mock-data';
import userEvent from '@testing-library/user-event';

const mockEvent = mockData[0];

describe('<Event /> component', () => {
  const renderComponent = () => render(<Event event={mockEvent} />);

  test('renders event title', () => {
    renderComponent();
    const eventTitle = screen.queryByText(mockEvent.summary);
    expect(eventTitle).toBeInTheDocument();
  });

  test('renders event start time', () => {
    renderComponent();
    const eventStartTime = screen.queryByText(mockEvent.created);
    expect(eventStartTime).toBeInTheDocument();
  });

  test('show events locations', () => {
    renderComponent();
    const eventLocation = screen.queryByText(mockEvent.location);
    expect(eventLocation).toBeInTheDocument();
  });

  test('show details button', () => {
    renderComponent();
    const button = screen.queryByRole('button', {name: /details/i});
    expect(button).toBeInTheDocument();
  });

  test('by default, event details are not shown', () => {
    renderComponent();
    const details = screen.queryByTestId('details');
    expect(details).not.toBeInTheDocument();
  });

  test('click on show details button, event details are shown', async () => {
    renderComponent();
    const button = screen.getByRole('button', {name: /details/i});
    userEvent.click(button);

    const details = await screen.findByText('About event:');
    expect(details).toBeInTheDocument();
  });

  test('click on hide details button, event details are hidden', async () => {
    renderComponent();
    const button = screen.getByRole('button', {name: /details/i});
    userEvent.click(button);
    userEvent.click(button);

    const details = screen.queryByTestId('details');
    expect(details).not.toBeInTheDocument();
  });
});
