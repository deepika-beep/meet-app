Description:

This is a serverless PWA (Progressive Web Application) created using React and a TDD (Test Driven Development) approach.
The App fetches data from the Google Calendar API and allows the users to see, filter and read more about the actual and upcoming events, based on the location and the number of events they choose.
To make the authentication/authorization process and the routing between frontend and Google Api possible, the apa uses serverless functions hosted by a cloud provider (AWS).

User stories:

1. As a user, I should be able to filter events by city, so that I can see the list of events that take place in that city.

2. As a user, I should be able to show and hide an event's details, so that the page is clean and I can check only the events I am interested in.

3. As a user, I should be able to specify the number of events that are shown, so that I can decide how to populate the page.

4. As a user, I should be able to use the app when being offline, so that I don't have to depend on an Internet connection

5. As a user, I should be able to see the cities with most events, so that I can decide at first sight what is worth visiting.

Scenarios

1.1 When user hasn't searched for a city, show upcoming events from all cities:

    Given user hasn't searched for any city, when the user opens the app
    then the user will see a list of all upcoming events.

1.2 User should see a list of suggestions when they search for a city:

    Given the main page is open, when user starts typing in the city
    textbox then the user should see a list of cities (suggestions) that
    match what they've typed.

1.3 User can select a city from the suggested list:

    Given the user was typing "Berlin" in the city textbox and the list of
    suggested cities is showing, when the user selects a city (e.g.,
    "Berlin, Germany") from the list then their city should be changed to
    that city (i.e., "Berlin, Germany") and the user should receive a list
    of upcoming events in that city.

2.1 An event element is collapsed by default:

    Given the app has been loaded, when the event list is displayed then the events should be collapsed.

2.2 User can expand an event to see its details:

    Given the event list is displayed, when a user clicks on "Show details" button of an event then the event will expand to display more details.

2.3 User can collapse an event to hide its details:

    Given the user has clicked the "Show more" button and the event is expanded, when the user clicks "Hide details" button of an event then that event should collapse back.

3.1 When user hasn't specified a number, 32 is the default number:

    Given the user has opened the app and the event list has been loaded, when a user does not select a speciffic number of events to be displayed then 32 events will be desplayed by default.

3.2 User can change the number of events they want to see:

    Given the user has opened the app and the event list has been loaded, when a user select a speciffic number of events to be displayed then that is the number of events to be displayed.

4.1 Show cached data when there's no internet connection:

    Given the user has no internet connection, when the user uses the app, then the app will work with the data cached when the app was connected to internet last time.

4.2 Show error when user changes the settings (city, time range):

    Given the user has no internet connection, when the user wants to use other data than the data previously cached when an internet connection was enebled then the app will show errors to inform the user about the failed access of uncached data.

5.1 Show a chart with the number of upcoming events in each city:

    Given the event list has been loaded, when a user wants to see the upcoming events then a chart with the number of events in each city should be displayed.

    Dependencies:

    "@testing-library/jest-dom": "^5.14.1",

"@testing-library/react": "^11.2.7",
"@testing-library/user-event": "^12.8.3",
"atatus-spa": "^4.3.2",
"axios": "^0.21.1",
"nprogress": "^0.2.0",
"prop-types": "^15.7.2",
"react": "^17.0.2",
"react-dom": "^17.0.2",
"react-scripts": "4.0.3",
"recharts": "^2.0.10",
"web-vitals": "^0.2.4",
"workbox-background-sync": "^5.1.4",
"workbox-broadcast-update": "^5.1.4",
"workbox-cacheable-response": "^5.1.4",
"workbox-core": "^5.1.4",
"workbox-expiration": "^5.1.4",
"workbox-google-analytics": "^5.1.4",
"workbox-navigation-preload": "^5.1.4",
"workbox-precaching": "^5.1.4",
"workbox-range-requests": "^5.1.4",
"workbox-routing": "^5.1.4",
"workbox-strategies": "^5.1.4",
"workbox-streams": "^5.1.4"

Testing libraries:

"@wojtekmaj/enzyme-adapter-react-17": "^0.6.2",
"enzyme": "^3.11.0",
"jest-cucumber": "^3.0.1",
"puppeteer": "^10.1.0"
