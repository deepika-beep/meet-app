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
class WarningAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'white'
    }
    getStyle = () => {
        return {
            color: this.color,
            backgroundColor: '#fff',
            width: '100vw',
            display: 'block',
            lineHeight: '2rem',
            position: "fixed",
            top: '0',
            left:'0',
        }
        };
    }
// to use in Citysearch
export {InfoAlert,ErrorAlert,WarningAlert};
Alert.propTypes={
text:PropTypes.string.isRequired
}