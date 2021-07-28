import React,{Component} from 'react';
import PropTypes from 'prop-types';
class Alert extends Component{
  constructor(props){
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return{
      color:this.color,
    }
  }
  render(){
    return(
    <div className='alert'>
      <p style={this.getStyle()}>{this.props.text}</p>
    </div>
    )}
}
// Subclass of alert
class InfoAlert extends Alert{
constructor(props){
  super(props);
  this.color='blue';
}
}
class ErrorAlert extends Alert{
  constructor(props){
    super(props);
    this.color = 'red';
  }
}
// to use in Citysearch
export {InfoAlert,ErrorAlert};
Alert.propTypes={
text:PropTypes.string.isRequired
}