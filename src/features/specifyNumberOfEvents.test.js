import { loadFeature,defineFeature } from "jest-cucumber";
import React from 'react';
import{mount,shallow} from 'enzyme';
import App from '../App';
import Event from '../Event';
import EventList from '../EventList';
import NumberOfEvents from "../NumberOfEvents";
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');
defineFeature(feature,test => {
    test('When user did not specified a number, 32 is the default number', ({ given, and, when, then }) => {

        let AppWrapper;
        given('the user has opened the app', () => {
            AppWrapper = mount(<App />);     
        });

        and('the event list has been loaded', () => {
            expect(AppWrapper.state('events').length).toBeGreaterThan(0);
        });

        when('a user does not select a specific number of events to be displayed', () => {/*Nothing here*/});

        then('32 events will be displayed by default', () => {
            expect(AppWrapper.state('displayedEvents')).toEqual(32);
            expect(AppWrapper.find('NumberOfEvents').state().displayedEvents).toEqual(32);
        });
    });


    test('User can change the number of events they want to see', ({ given, and, when, then }) => {

        let AppWrapper; 
        given('the user has opened the app', () => {
            AppWrapper = mount(<App />);
        });

        and('the event list has been loaded', () => {
            expect(AppWrapper.state('events').length).toBeGreaterThan(0);
        });

        when('a user selects a specific number of events to be displayed', () => {
            let eventObject = {target: {value: 3 }}
            AppWrapper.find('#events-number-input').simulate('change', eventObject);
        });

        then('that is the number of events to be displayed', () => {
            AppWrapper.update();
            expect(AppWrapper.state('displayedEvents')).toEqual(3);
            expect(AppWrapper.find('NumberOfEvents').state().displayedEvents).toEqual(3);
        });
    });
}) 
