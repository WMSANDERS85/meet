/* eslint-disable testing-library/no-node-access */
import {loadFeature, defineFeature} from 'jest-cucumber';
import {render, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {getEvents} from '../api';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventDetails.feature');

defineFeature(feature, (test) => {
  // Scenario 1
  test('An event element is collapsed by default', ({given, when, then}) => {
    let AppWrapper;
    let AppDOM;
    let citySearchInput;
    given('the user has selected a city to browse events', async () => {
      AppWrapper = render(<App />);
      AppDOM = AppWrapper.container.firstChild;
      const CitySearchDOM = AppDOM.querySelector('#city-search');
      citySearchInput = within(CitySearchDOM).getByRole('textbox');
      await userEvent.type(citySearchInput, 'Berlin');

      const suggestionList = within(CitySearchDOM).queryAllByRole('listitem');
      await userEvent.click(suggestionList[0]);
      expect(citySearchInput.value).toBe('Berlin, Germany');
    });

    when(
      'the user views the list of events for the selected city',
      async () => {
        const EventListDOM = AppDOM.querySelector('#event-list');
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        const allEvents = await getEvents();
        const berlinEvents = allEvents.filter(
          (event) => event.location === citySearchInput.value
        );
        expect(EventListItems).toHaveLength(berlinEvents.length);
      }
    );

    then('the default view for the events will be collapsed', () => {
      const details = AppDOM.querySelector('.event .details');
      expect(details).toBeNull();
    });

    // Scenario 2
    test('User can expand an event to view more details', ({
      given,
      when,
      then,
    }) => {
      let AppWrapper;
      let AppDOM;
      let EventListDOM;
      let EventListItems;
      given('the user has found an event of interest', async () => {
        AppWrapper = render(<App />);
        AppDOM = AppWrapper.container.firstChild;

        await waitFor(() => {
          EventListDOM = AppDOM.querySelector('#event-list');
          EventListItems = within(EventListDOM).queryAllByRole('listitem');
          expect(EventListItems).toHaveLength(32);
        });
      });

      when('the user clicks on the show details button', async () => {
        const event = EventListItems[0];
        const detailsBtn = within(event).getByRole('button');
        await userEvent.click(detailsBtn);
      });

      then('the event will expand to show more details', () => {
        const details = AppDOM.querySelector('.event .details');
        expect(details).toBeDefined();
      });
    });

    // Scenario 3
    test('User can collapse an event to hide details', ({
      given,
      when,
      then,
    }) => {
      let button;
      let AppDOM;

      given('the user has expanded an event to view more details', async () => {
        // eslint-disable-next-line testing-library/render-result-naming-convention
        const appWrapper = render(<App />);
        AppDOM = appWrapper.container.firstChild;

        await waitFor(() => {
          const EventListDOM = AppDOM.querySelector('#event-list');
          const EventListItems =
            within(EventListDOM).queryAllByRole('listitem');
          expect(EventListItems).toHaveLength(32);
        });

        button = AppDOM.querySelector('.event .details-btn');
        await userEvent.click(button);
        const details = AppDOM.querySelector('.event .details');
        expect(details).toBeDefined();
      });

      when('the user clicks on the hide details button', async () => {
        await userEvent.click(button);
      });

      then('the event will collapse to hide the details', () => {
        const details = AppDOM.querySelector('.event .details');
        expect(details).toBeNull();
      });
    });
  });
});
