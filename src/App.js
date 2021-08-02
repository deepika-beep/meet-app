import React ,{Component} from 'react';
import './App.css';
// imports the EventList component into the App component..
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './EventGenre';
import { getEvents,extractLocations,checkToken, getAccessToken } from './api';
import WelcomeScreen from './WelcomeScreen';
import { WarningAlert } from './Alert';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,ResponsiveContainer} from 'recharts';

class App extends Component{
  state = {
    events: [],
    locations: [],
    displayedEvents:32,
    defaultLocation:'all',
    showWelcomeScreen: undefined,
    warningText: ''
  }
  
 async componentDidMount() {
  this.mounted = true;
  const accessToken = localStorage.getItem('access_token');
  const isTokenValid = (await checkToken(accessToken)).error ? false : true;
  const searchParams = new URLSearchParams(window.location.search);
const code = searchParams.get("code");
this.setState({ showWelcomeScreen: !(code || isTokenValid) });
//this keeps the alert displayed if the user is offline and refreshes the page.
		if (!navigator.onLine) {
			this.setState({
				warningText: 'You are currently offline. Some features of the app might be limited!'
			})
		}

		window.addEventListener('offline', () => {
			this.setState({
				warningText: 'You are currently offline. Some features of the app might be limited!'
			})
		});

		window.addEventListener('online', () => {
			this.setState({
				warningText: 'You are back online!'
			})

			setTimeout(() => {
				this.setState({
					warningText: ''
				})
			}, 3000)
		});
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
  window.removeEventListener('offline', () => {
			this.setState({
				warningText: 'You are currently offline. Some features of the app might be limited!'
			})
		});

		window.removeEventListener('online', () => {
			this.setState({
				warningText: 'You are back online!'
			})

			setTimeout(() => {
				this.setState({
					warningText: ''
				})
			}, 3000)
		});
	
} 
updateEvents = (location,eventCount) => {
getEvents().then((events) => {
  const locationEvents = (location === 'all') ? events.slice(0, this.state.displayedEvents) : 
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
// Extracting the location and number of events belonging to the location to use them in the chart
	getData = () => {
		const { locations, events } = this.state;
		const data = locations.map((location) => {
			const number = events.filter((event) => event.location === location).length;
			const city = location.split(', ').shift();
			return {city, number};
		})
		return data;
	}
render(){

if (this.state.showWelcomeScreen === undefined) return <div className="App" />

return (
    <div className="App">
      <WarningAlert text={this.state.warningText} />
      <CitySearch locations ={this.state.locations} updateEvents ={this.updateEvents}/>
      <NumberOfEvents updateEventsLength ={(value) => this.updateEventsLength(value)}
      displayedEvents={this.state.displayedEvents} />

      <div className="data-vis-wrapper">
				<h3 style={{marginTop: "40px"}}>Events by genre</h3>
					<EventGenre events={this.state.events} />
          <h3 style={{marginTop: "40px"}}>Events in each city</h3>

          <ResponsiveContainer height={400}>
          <ScatterChart margin={{top: 10, right: 10, bottom: 20, left: 20,}}>
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="city"  />
            <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
 
           <Tooltip cursor={{ strokeDasharray: '3 3' }} />
 
              <Scatter data={this.getData()} fill="#8884d8" />
</ScatterChart>
</ResponsiveContainer>
</div>
  <EventList events ={this.state.events}/>
<WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
getAccessToken={() => { getAccessToken() }} />
    </div>
  );
}

}
export default App;
