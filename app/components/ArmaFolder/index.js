import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  container: {
    padding: '5px',
    margin: '5px',
    color: '#FFF',
    border: '1px solid rgba(200, 200, 200, 0.5)',
    display: 'inline-block',
    verticalAlign: 'top',
    width: 'calc(100% - 232px)',
    backgroundColor: 'transparent',
  },
  button: {
    margin: '5px 10px 5px 0',
    backgroundColor: 'none',
    display: 'inline-block',
  },
  validation: {
    display: 'inline-block',
    margin: '5px',
  }
};

export default class ArmaFolder extends Component {

  static propTypes = {
    path: React.PropTypes.string,
    isValid: React.PropTypes.bool,
    setPath: React.PropTypes.func,
  };

  constructor(props){
    super(props);
    this.state = {
      path: props.path
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.state.path !== nextProps.path){
      this.setState({path: nextProps.path})
    }
  }

  render() {
    const path = this.state.path;
    return (
      <div style={styles.container}>
        <TextField
          floatingLabelText="Arma 3 folder path:"
          value={path}
          onChange={(event, value) => this.setState({path: value})}
          fullWidth
        />
        <RaisedButton
          label={'validate'}
          style={styles.button}
          onMouseUp={() => this.props.setPath(this.state.path)}
          secondary={true}
        />
        <div style={styles.validation}>
          Status: {this.props.isValid ? (<span style={{color: 'green'}}>Valid</span>): (<span style={{color: 'red'}}>Invalid</span>)}
        </div>
      </div>
    );
  }
}
