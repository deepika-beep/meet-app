
import React from 'react';
// mount used for integration testing.
import {shallow,mount} from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import {mockData} from '../mock-data';
import {extractLocations,getEvents} from '../api';
// Unit testing
describe('<App/> component',() => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper =shallow(<App />);
  })
  test('render list of events',()=> {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });
  test('render CitySearch',() => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });
  test('render NumberOfEvents',() => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
})
// Integration testing
describe('<App/> integration',() => {
  test('App passes event state as prop toEventlist',()=> {
    const AppWrapper = mount(<App/>);
    const AppEventState = AppWrapper.state('events');
    expect(AppEventState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventState);
    AppWrapper.unmount();
  })
  test('App passes "locations" state as a prop to CitySearch',()=> {
    const AppWrapper = mount(<App/>);
    const AppLocationsState =AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  })
    test('get list of events matching the city selected by user',async ()=> {
      const AppWrapper = mount(<App/>);
      const CitySearchWrapper = AppWrapper.find(CitySearch);
      const locations = extractLocations(mockData);
      CitySearchWrapper.setState({suggestions:locations});
      const suggestions= CitySearchWrapper.state('suggestions');
      const selectedIndex = Math.floor(Math.random() * (suggestions.length));
      const selectedCity = suggestions[selectedIndex];
      await CitySearchWrapper.instance().handleItemClicked(selectedCity);
      // API function: getEvents get all the events from the API asynchronously (and from the mock data )
      const allEvents = await getEvents();
      const eventsToShow = allEvents.filter(event => event.location === selectedCity);
      expect(AppWrapper.state('events')).toEqual(eventsToShow);
      AppWrapper.unmount();
    })
    test('list of all events  when user selects "see all cities"',async()=>{
const AppWrapper =mount(<App/>);
const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
await suggestionItems.at(suggestionItems.length - 1).simulate('click');
const allEvents = await getEvents();
expect(AppWrapper.state('events')).toEqual(allEvents);
AppWrapper.unmount();
    })
    test('"displayedEvents" state of App component is updated with number introduced in input of NumberofEvents',()=>{
      const AppWrapper = mount(<App/>);
      const eventObject = {target:{value:10}};
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      NumberOfEventsWrapper.find('#events-number-input').simulate('change',eventObject);
      expect(AppWrapper.state('displayedEvents')).toBe(10);
      AppWrapper.unmount();
    })
    test('length of eventlist reflect s the value of input in NumberofEvents',async()=> {
      const AppWrapper = mount(<App/>);
      const eventObject = { target: {value: 1}};
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      await NumberOfEventsWrapper.find("#events-number-input").simulate("change", eventObject);
      AppWrapper.update();
      expect(NumberOfEventsWrapper.state("displayedEvents")).toEqual(1);
      expect(AppWrapper.state("events").length).toBe(1); 
      expect(AppWrapper.find(EventList).prop('events').length).toEqual(1);
      AppWrapper.unmount();
    })
  })
