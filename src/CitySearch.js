
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InfoAlert } from './Alert';
class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: undefined,
    infoText: ''
  }

  //  event handler for <input> for the change event:
  handleInputChanged = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    this.setState({
      query: value,
      suggestions
    });
    if (value.length === 0) {
      this.setState({
        showSuggestions: undefined
      })
    } else {
      this.setState({
        showSuggestions: true
      })
    }
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText: "We can't find the city you are looking for. Please try another city"
      })
    } else {
      return this.setState({
        query: value,
        suggestions,
        infoText: ''
      })
    }
  }
  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: undefined,
      infoText: ''
    });
    this.props.updateEvents(suggestion);
  }
  render() {
    return (
      <div className="CitySearch">
        <h1>Meet App</h1>
        <h2>Select a City</h2>
        <InfoAlert text={this.state.infoText} />
        <div className='suggestion-wrapper'>

          <input type="text" className="city" value={this.state.query} onChange={this.handleInputChanged} onFocus={() => { this.setState({ showSuggestions: true }) }} />
          <ul className="suggestions" style={this.state.showSuggestions ? {} : { display: 'none' }}>
            {this.state.suggestions.map((suggestion) => (
              <li key={suggestion}
                onClick={() => this.handleItemClicked(suggestion)}>{suggestion}</li>
            ))}
            <li onClick={() => this.handleItemClicked('all')}>
              <b>see all cities</b>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default CitySearch;
CitySearch.propTypes = {
  updateEvents: PropTypes.func.isRequired
}