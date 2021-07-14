# meet-app

Objective

To build a serverless, progressive web application (PWA) with React using a test-driven
development (TDD) technique. The application uses the Google Calendar API to fetch
upcoming events.

User Stories:

1)As a user ,I should be able to view and hide an event’s details,so that I can know  what is happening in an event.

Scenario 1: An event element is collapsed by default

Given:user didn’t open an event

When:application shows list of events

Then:user should see the collapsed event by default

Scenario 2: User can expand an event to see its details

Given:event lists been loaded

When:user clicks on the button for an event

Then:the event will expand to show the details

Scenario 3: User can collapse an event to hide its details

Given: event lists been loaded

When: user clicks on the hide details button for an event

Then:that event will be collapsed to hide its details


2)As a user, I should be able to specify no of events ,so I can see the events that cater to my needs.

Scenario 1: When user hasn’t specified a number, 32 is the default number

Given:the events list is displayed

When:user hasn’t entered specified no.of events

Then:32 eents should be displayed as default


Scenario 2: User can change the number of events they want to see

Given:event list is loaded

When:user can select no.of events from the list

Then:displays no.of events the user wants to see


3)As a user, I should be able to use the app when I am offline,so I can use the app even without internet connection.

Scenario 1: Show cached data when there’s no internet connection

Given:the user doesn’t have at present an internet connection

When:user tries to access the app

Then:cached data stored during last log out session make the app to function without an internet connection

Scenario 2: Show error when user changes the settings (city, time range)

Given:user does not have an internet connection
When:user changes the city,time range settings 
Then:application display error message ‘unable to access data’

4)As a user ,I should be able to see the chart with no of upcoming events in each city,so I can have an idea what events are conducted in each city.

Scenario 1: Show a chart with the number of upcoming events in each city

Given:event lists has been loaded

When:enter name of the city

Then:user can see the events happening in tse selected city

