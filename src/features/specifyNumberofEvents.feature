Feature: specify number of events

Scenario:  When user did not specified a number, 32 is the default number
Given the user has opened the app
And the event list has been loaded
When a user does not select a specific number of events to be displayed
Then 32 events will be displayed by default

Scenario: User can change the number of events they want to see
Given the user has opened the app
And the event list has been loaded
When a user selects a specific number of events to be displayed
Then that is the number of events to be displayed 