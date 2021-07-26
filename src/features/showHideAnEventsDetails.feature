Feature: Show/hide event details

Scenario: An event element is collapsed by default.
Given the app has been loaded
When the event list is displayed
Then the events should be collapsed

Scenario: User can expand an event to see its details
Given the event list is displayed
When a user clicks on Show details button of an event
Then the event will expand to display more details

Scenario: User can collapse an event to hide its details
Given the user has clicked the Show more button and the event is expanded
When the user clicks on the Hide details button of an event
Then that event should collapse back