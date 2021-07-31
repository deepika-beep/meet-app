import React ,{Component} from 'react';
import './App.css';
// imports the EventList component into the App component..
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents,extractLocations,checkToken, getAccessToken } from './api';
import WelcomeScreen from './WelcomeScreen';

class App extends Component{
  state = {
    events: [],
    locations: [],
    displayedEvents:32,
    defaultLocation:'all',
    showWelcomeScreen: undefined

  }
  
 async componentDidMount() {
  this.mounted = true;
  getAccessToken = localStorage.getItem('access_token');
  const isTokenValid = (await checkToken(accessToken)).error ? false : true;
  const searchParams = new URLSearchParams(window.location.search);
const code = searchParams.get("code");
this.setState({ showWelcomeScreen: !(code || isTokenValid) });
if ((code || isTokenValid) && this.mounted) {
  getEvents().then((events)=> {
    if(this.mounted){
    this.setState({events:events.slice(0,this.state.displayedEvents),locations:extractLocations(events)});
}
})
}
}
componentWillUnmount(){
  this.mounted = false;
} 
updateEvents = (location,eventCount) => {
getEvents().then((events) => {
  const locationEvents = (location === 'all') ? 
  events:
  events.filter((event)=> event.location === location);
  if(this.mounted){
    this.setState({
    events:locationEvents.slice(0,eventCount),
    defaultLocation:location
  });
}
});
}
updateEventsLength(inputValue){
  this.setState({
    displayedEvents:inputValue
  });
  const {defaultLocation} = this.state
  this.updateEvents(defaultLocation,inputValue);
}
render(){

if (this.state.showWelcomeScreen === undefined) 

return (
    <div className="App">
  
      <CitySearch locations ={this.state.locations} updateEvents ={this.updateEvents}/>
      <NumberOfEvents updateEventsLength ={(value) => this.updateEventsLength(value)}/>
         <h4>Events in each city</h4>
  <EventList events ={this.state.events}/>
<WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
getAccessToken={() => { getAccessToken() }} />
    </div>
  );
}

// get data

}
export default App;
