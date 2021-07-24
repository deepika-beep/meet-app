import React, {Component} from "react";

class Event extends Component{

  state = {
    showMore:false
  }
  // toggle state showMore
  toggleShowMore = () => {
    this.setState({
      showMore:!this.state.showMore
    });
  }
  render(){
    const {event} = this.props;
    return (
    <div className='event-wrapper'>
      <h1 className='event-title'>{event.summary}</h1>
    
    <div className='event-time'>
      <span>{event.start.dateTime}</span>;
          <span>{`(${event.start.timeZone})`}</span>
      </div>
      <div>
        <span>{event.summary}</span>
        <span>{event.location}</span>
        </div>

{this.state.showMore ? (
  <div className ='show-more'>
  <h4>About event</h4>
  <a href ={event.htmlLink}>See details on Google Calendar</a>
    <p className="event-description">{event.description}</p>
  </div>
):''}
  <div className='btn-wrapper'>
    <button onClick={this.toggleShowMore}>{this.state.showMore 
    ? 'Show less' : 'Show more'}</button>
    </div>
    </div>
    )
  }
}
export default Event;