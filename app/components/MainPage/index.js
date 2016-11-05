import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

const styles = {
  container: {
    position: 'relative',
    background: 'rgba(100, 100, 100, 0.8)',
    padding: '10px',
    borderRadius: '5px',
  },
  header: {
    backgroundColor: 'none',
    padding: '5px',
  },
  menu: {
    margin: '5px',
  },
  button: {
    margin: '5px 10px 5px 0',
    backgroundColor: 'none',
  },
  btnLabel: {
    padding: '0 10px',
  },
  content: {
    margin: '0',
  },
  command: {
    display: 'block',
    width: '100%',
    wordWrap: 'break-word',
  }
};

export default class MainPage extends Component {

  static propTypes = {
    save: React.PropTypes.func,
    load: React.PropTypes.func,
    run: React.PropTypes.func,
    command: React.PropTypes.string,
  };

  render() {
    return (
      <div style={styles.container}>
        <AppBar
          style={styles.header}
          title="ARMA3 Launcher"
          showMenuIconButton={false}
        />
        <div style={styles.menu}>
          <RaisedButton
            label={'Run vanilla ARMA3'}
            style={styles.button}
            labelStyle={styles.btnLabel}
            onMouseUp={this.props.run}
            primary={true}
          />
          <RaisedButton
            label={'save'}
            style={styles.button}
            onMouseUp={this.props.save}
            secondary={true}
          />
          <RaisedButton
            label={'load'}
            style={styles.button}
            onMouseUp={this.props.load}
            secondary={true}
          />
        </div>
        <div style={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
