# Meet App

## Table of Contents

- [Overview](#overview)
- [Links](#links)
- [Features, User Stories and Scenarios](#features-user-stories-and-scenarios)
- [Process](#process)

  - [Technologies](#technologies)
  - [Testing](#testing)
  - [Progressive Web App (PWA)](#Progressive-web-app-pwa)

- [Data Flow: Google Calendar API and Serverless Authorization](#data-flow-google-calendar-api-and-serverless-authorization)

## Overview

Meet is an app that provides users with a list of in person and virtual events in a selected city.

The app is built using Test Driven Development(TDD) and Behavior Driven Development(BDD). The Meet app is a Progressive Web App(PWA) that uses the Google Calendar API to retrieve upcoming events, with access authorization being handled by the serverless backend powered by Amazon Web Services(AWS). The backend verifies consumer keys and issues a token that allows the user to access the API. The Meet app will also work offline using cached data.

## Links

- [Live site URL](https://wmsanders85.github.io/meet/)
- [Code URL](https://github.com/WMSANDERS85/meet)

## Features, User Stories, and Scenarios

### Feature 1: Filter Events by City

**User Story**

**As a** User
**I should be able to** filter events by city.
**So that** I can see a list of events taking place in that city.

**Scenarios**

**Scenario 1: User hasn't searched for a specific city, show upcoming events from all cities**

**Given** user hasn't searched for any city;
**When** the user opens the app;
**Then** the user should see a list of upcoming events.

**Scenario 2: User should see a list of suggestions when they search for a city**

**Given** user hasn't searched for any city;
**When** the user starts typing in the city textbox;
**Then** the user should recieve a list of cities (suggestions) that match what they've typed.

**Scenario 3 User can select a city from the suggested list**

**Given** user was typing "San Diego" in the textbox AND the list of suggested cities is showing;
**When** the user selects a city (e.g., "San Diego, United States") from the list;
**Then** their city should be changed to that city (i.e., "San Diego, United States") AND the user should recieve a list of upcoming events in that city.

### Feature 2: Show/Hide Event Details

**User Story**

**As a** User
**I should be able to** Show/Hide Event Details.
**So that** I can see more or less information on events I am interested in.

**Scenarios**

**Scenario 1: Event Elements default state**

**Given** the user has selected a city to browse events;
**When** the user views a list of events for the selected city;
**Then** the default view for the events will be collapsed;

**Scenario 2: User can expand an event to view more details**

**Given** the user has found and event of intrest;
**When** the user clicks on the event or show more button;
**Then** the event will expand providing detailed information about the selected event.

**Scenario 3: User can collapse event details**

**Given** the user chooses to view another event or return to the list of events for the selected city;
**When** the user clicks outside the event description or clicks the close icon;
**Then** the event element will return to a collapsed state.

### Feature 3: Specify Number of Events

**User Story**

**As a** User
**I should be able to** Specify the number of events that are displayed
**So that** I can see more or fewer events in the events list at once.

**Scenarios**

**Scenario 1: When user hasn’t specified a number, 32 events are shown by default**

**Given** The user doesn't specify the number of events they want to view per city;
**When** The user selects a city to view events for;
**Then** The user will see the default number of events for the selected city;

**Scenario 2: User can change the number of events displayed**

**Given** The user specifies a set amount of events to view per city.
**When** The user selects a city to view events for;
**Then** The specified number of events will be shown for the selected city;

### Feature 4: Use the App When Offline

**User Story**

**As a** User
**I should be able to** Use the App when I am offline
**So that** I can see the events I viewed the last time I was online.

**Scenarios**

**Scenario 1: Show cached data when there’s no internet connection.**

**Given** The user loses or has no access to an internet connection;
**When** The user opens the app to view events;
**Then** The user will be able to view the events that they viewed the last time they were online (Cached data);

**Scenario 2: Show error when user changes search settings (city, number of events)**

**Given** The user has no internet connection and is viewing cached data offline;
**When** The user changes search settings (city,number of events);
**Then** an error message will be displayed notifying the user that they are not connected to the internet.

### Add an App Shortcut to the Home Screen

**User Story**

**As a** User
**I should be able to** add the app shortcut to my home screen
**So that** I can open the app faster

**Scenarios**

**Scenario 1: User can install the meet app as a shortcut on their device home screen.**

**Given** The users OS supports adding shortcuts;
**When** The user adds the app to the home screen;
**Then** The user will be able to access the app via the icon on the home screen;

### Display Charts Visualizing Event Details

**User Story**

**As a** User
**I should be able to** see a chart showing the upcoming events in each city.
**So that** I know what events are organized in which city.

**Scenarios**

**Scenario 1: Show a chart with the number of upcoming events in each city.**

**Given** The user hasn't selected a specific city;
**When** The user wants to compare the number of events for different cities;
**Then** They can compare cities by accessing the data chart;

## Process

### Technologies

- [React:](https://react.dev/) A JavaScript library for building user interfaces.
- [Amazon Web Services:](https://aws.amazon.com/) A cloud computing service.

## Testing

This app follows a Test-Driven-Development(TDD) approach to ensure the highest quality and reliability. The Meet app utilizes the various testing frameworks listed below.

- [Jest:](https://jestjs.io/) A Javascript testing framework with a focus on simplicity.
- [Cucumber:](https://cucumber.io/) tests appications for Behavior Driven Development(BDD) style. Tests are written in a natural language that is easily understandable for all.

## Progresive Web App (PWA)

The "Meet App" is a serverless, progressive web application (PWA) developed using React and the test-driven development (TDD) technique. It integrates with the Google Calendar API to showcase upcoming events and offers users the ability to filter events by city, view event details, and visualize event data using charts. Embracing PWA capabilities, the app ensures instant loading, offline accessibility, responsive design across devices, and the option to add the app to a device's home screen.

## Data Flow: Google Calendar API and Serverless Authorization

The Meet App fetches event data from Google Calendar using the Google Calendar API. To securely access this data, the app communicates with an authorization service hosted on AWS Lambda, a serverless computing platform. The app submits its credentials for verification; upon successful validation, it receives a JSON Web Token (JWT) to facilitate subsequent API requests.
