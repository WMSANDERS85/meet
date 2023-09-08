import {render, waitFor, within} from '@testing-library/react';
import {loadFeature, defineFeature} from 'jest-cucumber';
import App from '../App';
import {getEvents} from '../api';
import userEvent from '@testing-library/user-event';

// loadFeature() expects the file path to start from the root of the project
const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, (test) => {
  test("When a user hasn't searched for a city, show upcoming events from all cities.", ({
    given,
    when,
    then,
  }) => {
    given('user hasn’t searched for any city', () => {});

    let AppWrapper;
    when('the user opens the app', () => {
      AppWrapper = render(<App />);
    });

    then('the user should see a list of all upcoming events.', async () => {
      const AppDOM = AppWrapper.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  test('User should see a list of suggestions when they search for a city.', ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given('the main page is open', () => {
      AppWrapper = render(<App />);
    });
    let CitySearchDOM;
    when('the user starts typing in the city textbox', async () => {
      const AppDOM = AppWrapper.container.firstChild;
      CitySearchDOM = AppDOM.querySelector('#city-search');

      const citySearchInput = within(CitySearchDOM).getByRole('textbox');
      await userEvent.type(citySearchInput, 'Berlin');
    });

    then(
      'the user should see a list of cities (suggestions) that match what they’ve typed',
      async () => {
        const suggestionList = within(CitySearchDOM).queryAllByRole('listitem');
        expect(suggestionList).toHaveLength(2);
      }
    );
  });

  test('User can select a city from the suggested list.', ({
    given,
    and,
    when,
    then,
  }) => {
    let AppWrapper;
    let AppDOM;
    let CitySearchDOM;
    let citySearchInput;
    given('the user was typing “Berlin” in the city textbox', async () => {
      AppWrapper = render(<App />);
      AppDOM = AppWrapper.container.firstChild;
      CitySearchDOM = AppDOM.querySelector('#city-search');
      citySearchInput = within(CitySearchDOM).getByRole('textbox');
      await userEvent.type(citySearchInput, 'Berlin');
    });

    let suggestionList;
    and('the list of suggested cities is showing', () => {
      suggestionList = within(CitySearchDOM).queryAllByRole('listitem');
      expect(suggestionList).toHaveLength(2);
    });

    when(
      'the user selects a city (e.g., "Berlin, Germany") from the list',
      async () => {
        await userEvent.click(suggestionList[0]);
      }
    );

    then(
      'their city should be changed to that city (i.e., "Berlin, Germany")',
      () => {
        expect(citySearchInput).toHaveValue('Berlin, Germany');
      }
    );

    and(
      'the user should receive a list of upcoming events in that city',
      async () => {
        const EventListDOM = AppDOM.querySelector('#event-list');
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        const allEvents = await getEvents();
        const berlinEvnets = allEvents.filter(
          (event) => event.location === citySearchInput.value
        );
        expect(EventListItems).toHaveLength(berlinEvnets.length);
      }
    );
  });
});
