import {loadFeature, defineFeature} from 'jest-cucumber';
import {render, waitFor, within} from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  // Scenario 1
  test('when user hasn’t specified a number, 32 events are shown by default', ({
    given,
    when,
    then,
  }) => {
    let AppWrapper, AppDOM, EventListItems;
    given(
      "the user doesn't specify the number of events they want to view per city",
      () => {
        AppWrapper = render(<App />);
      }
    );

    when('the user recieves the list of events in that city', async () => {
      AppDOM = AppWrapper.container.firstChild;
      await waitFor(() => {
        const EventListDOM = AppDOM.querySelector('#event-list');
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems[0]).toBeDefined();
      });
    });

    then(`a number of 32 events will be displayed by default`, () => {
      expect(EventListItems).toHaveLength(32);
    });
  });

  // Scenario 2
  test('User can change the number of events displayed', ({
    given,
    when,
    then,
  }) => {
    let AppWrapper, AppDOM, EventListItems, EventsInput;

    given(
      'the user recieved a list of 32 events per selected city',
      async () => {
        AppWrapper = render(<App />);
        AppDOM = AppWrapper.container.firstChild;

        await waitFor(() => {
          const EventListDOM = AppDOM.querySelector('#event-list');
          EventListItems = within(EventListDOM).queryAllByRole('listitem');
          expect(EventListItems).toHaveLength(32);
        });
      }
    );

    when(
      'the user wants to change the number of events displayed',
      async () => {
        const EventsDOM = AppDOM.querySelector('#number-of-events');
        EventsInput = within(EventsDOM).getByRole('textbox');

        // Clear the input value first to ensure we set it to '10'
        await userEvent.clear(EventsInput); // Instead of backspacing
        await userEvent.type(EventsInput, '10');

        expect(EventsInput.value.trim()).toBe('10');
      }
    );

    then('they should be able to modify the number of events', async () => {
      await waitFor(() => {
        const EventList = within(AppDOM).queryAllByRole('listitem');
        expect(EventList).toHaveLength(10);
      });
    });
  });
});
