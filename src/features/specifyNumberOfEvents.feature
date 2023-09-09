Feature: Specify number of events
    Scenario: when user hasn’t specified a number, 32 events are shown by default
        Given the user doesn't specify the number of events they want to view per city
        When the user recieves the list of events in that city
        Then a number of 32 events will be displayed by default
    

    Scenario: user can change the number of events displayed
        Given the user recieved a list of 32 events per selected city
        When  the user wants to change the number of events displayed
        Then they should be able to modify the number of events

