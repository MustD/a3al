import React, { Component } from 'react';
import child_process from 'child_process';

const styles = {
  header: {
    margin: '5px',
  },
  menu: {
    margin: '5px',
  },
  button: {
    margin: '5px',
  },
  content: {
    margin: '5px',
    padding: '5px',
  }
};

export default class MainPage extends Component {

  static propTypes = {
    save: React.PropTypes.func,
    load: React.PropTypes.func,
    run: React.PropTypes.func,
  };

  render() {
    return (
      <div>
        <div style={styles.header}>
          ARMA3 Launcher
        </div>
        <div style={styles.menu}>
          <button style={styles.button} onClick={this.props.run}>Run ARMA3</button>
          <button style={styles.button} onClick={this.props.save}>save</button>
          <button style={styles.button} onClick={this.props.load}>load</button>
        </div>
        <div style={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
