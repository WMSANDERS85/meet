import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import {extractLocations, getEvents} from '../api';
import App from '../App';

describe('<CitySearch /> component', () => {
  test('renders text input', () => {
    render(<CitySearch allLocations={[]} />);
    const cityTextBox = screen.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  test('suggestions list is hidden by default', () => {
    render(<CitySearch allLocations={[]} />);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  test('renders a list of suggestions when city textbox gains focus', async () => {
    render(<CitySearch allLocations={[]} />);
    const cityTextBox = screen.getByRole('textbox');
    await userEvent.click(cityTextBox);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('list')).toHaveClass('suggestions');
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    render(<CitySearch allLocations={allLocations} />);

    const cityTextBox = screen.getByRole('textbox');
    await userEvent.type(cityTextBox, 'Berlin');

    const suggestions = allLocations.filter((location) => {
      return (
        location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1
      );
    });

    const suggestionListItems = screen.queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);

    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion and hides suggestions', async () => {
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    render(
      <CitySearch allLocations={allLocations} setCurrentCity={() => {}} />
    );

    const cityTextBox = screen.getByRole('textbox');
    await userEvent.type(cityTextBox, 'Berlin');

    const BerlinGermanySuggestion = screen.queryAllByRole('listitem')[0];
    await userEvent.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);

    await userEvent.click(BerlinGermanySuggestion);

    // Check if suggestions are hidden
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});

describe('<CitySearch /> integration', () => {
  test('renders suggestion list when the app is rendered', async () => {
    const AppWrapper = render(<App />);
    const AppDom = AppWrapper.container.firstChild;

    const CitySearchDom = AppDom.querySelector('#city-search');
    const cityTextBox = within(CitySearchDom).queryByRole('textbox');

    await userEvent.click(cityTextBox);
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    const suggestionListItems =
      within(CitySearchDom).queryAllByRole('listitem');
    expect(suggestionListItems.length).toBe(allLocations.length + 1);
  });
});
