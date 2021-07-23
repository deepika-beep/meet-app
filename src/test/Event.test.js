import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let eventWrapper;
  beforeAll(() => {
    eventWrapper = shallow(<Event event ={mockData[0]}/>)
  })
  // collapsed event
  test('render event',()=> {
    expect(eventWrapper.find('.event-title')).toHaveLength(1);
  })
  // location and time 
  test('render event time and location',() => {
    expect(eventWrapper.find('.event-time span')).toHaveLength(2);
  })
  test('render show details button',()=>{
    expect(eventWrapper.find('btn-wrapper button')).toHaveLength(1);
  })
// toggle state to true
test('show button toggle to true',() => {
eventWrapper.find('.btn-wrapper button').simulate('click');
expect(eventWrapper.state('showMore')).toBe(true);
})
// toggle state to false
test('show button toggle to false',() => {
  eventWrapper.find('.btn-wrapper button').simulate('click');
  expect(eventWrapper.state('showMore')).toBe(false);
})
// show details
test('render details on click',() => {
  eventWrapper.find('.btn-wrapper button').simulate('click');
  expect(eventWrapper.find('.show-more')).toHaveLength(1);
})
// hide details
test('details are hiiden on click',() => {
  eventWrapper.find('.btn-wrapper button').simulate('click');
  expect(eventWrapper.find('.show-more')).toHaveLength(0);
})
// check if event des is rendered properly in show-more div
test('hidden details are rendered properly',() => {
  let description =mockData[0].description;
  eventWrapper.find('.btn-wrapper button').simulate('click');
  expect(eventWrapper.find('.event-description').text()).toBe(description);
})
// button text
test('button text',()=> {
  eventWrapper.setState({showMore:true});
  expect(eventWrapper.find('.btn-wrapper button').text()).toBe('show-less');
});
});