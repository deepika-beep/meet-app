
import React from 'react';
import {shallow} from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component',() => {
let numberOfEventsWrapper;
beforeAll(()=>{
    numberOfEventsWrapper = shallow(<NumberOfEvents updateEventsLength={() => {/* prop that will slice the events list in the uppermost component(App.js) to the input value */}}/>)
    });
    test('input is rendered', () => {
        expect(numberOfEventsWrapper.find('#events-number-input')).toHaveLength(1);
    });

    test('show 32 events by default', () => {
        expect(numberOfEventsWrapper.find('#events-number-input').prop('value')).toBe(32);
    })
    test('state value matches input value',()=> {
      const stateValue = numberOfEventsWrapper.state('displayedEvents');
      expect(numberOfEventsWrapper.find('#events-number-input').prop('value')).toEqual(stateValue);
    })

    test('update state with the input value', () => {
        let eventObject = {target: {value: 1}};
        numberOfEventsWrapper.find('#events-number-input').simulate('change', eventObject);
        expect(numberOfEventsWrapper.state('displayedEvents')).toBe(1);
    });
    })
