# meet-app

Description:

This is a serverless PWA (Progressive Web Application) created using React and a TDD (Test Driven Development) approach.

The App fetches data from the Google Calendar API and allows the users to see, filter and read more about the actual and upcoming events, based on the location and the number of events they choose.

To make the authentication/authorization process and the routing between frontend and Google Api possible, the app uses serverless functions hosted by a cloud provider (AWS).

User stories:

1. As a user, I should be able to filter events by city, so that I can see the list of events that take place in that city.

2. As a user, I should be able to show and hide an event's details, so that the page is clean and I can check only the events I am interested in.

3. As a user, I should be able to specify the number of events that are shown, so that I can decide how to populate the page.

4. As a user, I should be able to use the app when being offline, so that I don't have to depend on an Internet connection

5. As a user, I should be able to see the cities with most events, so that I can decide at first sight what is worth visiting.

Dependencies:

 "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^11.2.7",
    "@testing-library/user-event": "^12.8.3",
    "axios": "^0.21.1",
    "nprogress": "^0.2.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3",
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
  
