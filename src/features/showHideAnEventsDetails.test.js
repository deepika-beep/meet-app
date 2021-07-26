
import { loadFeature,defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount,shallow } from 'enzyme';
import App from '../App';
import Event from '../Event';
import {mockData} from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');
defineFeature(feature,test => {
test('An event element is collapsed by default.', ({ given, when, then }) => {

        let AppWrapper;
        given('the app has been loaded', () => {
            AppWrapper = mount(<App />);
        });

        when('the event list is displayed', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event-wrapper')).toHaveLength(mockData.length);
        });

        then('the events should be collapsed', () => {
           expect(AppWrapper.find('.event-wrapper .show-more')).toEqual({});
        });
    });
    let EventWrapper;
    let event = mockData[0];
    test('User can expand an event to see its details', ({ given, when, then }) => {

        given('the event list is displayed', () => {
            EventWrapper = shallow(<Event event={event} />);
        });

        when('a user clicks on Show details button of an event', () => {
            EventWrapper.find('.btn-wrapper button').simulate('click');
        });

        then('the event will expand to display more details', () => {
            expect(EventWrapper.find('.event-wrapper .show-more')).toBeDefined();
        });
    });
    test('User can collapse an event to hide its details', ({ given, when, then }) => {

        given('the user has clicked the Show more button and the event is expanded', () => {
            EventWrapper = shallow(<Event event={event} />)
            EventWrapper.find('.btn-wrapper button').simulate('click');
            expect(EventWrapper.find('.event-wrapper .show-more')).toBeDefined();
        });

        when('the user clicks on the Hide details button of an event', () => {
            EventWrapper.find('.btn-wrapper button').simulate('click');
        });

        then('that event should collapse back', () => {
            expect(EventWrapper.find('.event-wrapper .show-more')).toEqual({});
        });
    });
}) 
