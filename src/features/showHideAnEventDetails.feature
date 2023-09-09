Feature: Show/Hide Event Details
    Scenario: An event element is collapsed by default
        Given the user has selected a city to browse events
        When the user views the list of events for the selected city
        Then the default view for the events will be collapsed

    Scenario: User can expand an event to view more details
        Given the user has found an event of interest
        When the user clicks on the show details button
        Then the event will expand to show more details

    Scenario: User can collapse an event to hide details
        Given the user has expanded an event to view more details
        When the user clicks on the hide details button
        Then the event will collapse to hide the details