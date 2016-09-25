import React, { Component } from 'react';

const styles = {
  container: {
    background: 'rgba(80, 80, 80, 0.9)',
    padding: '10px',
    borderRadius: '5px',
  },
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
    runMod: React.PropTypes.func,
    command: React.PropTypes.string,
  };

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          ARMA3 Launcher
        </div>
        <div style={styles.menu}>
          <button style={styles.button} onClick={this.props.run}>Run vanilla ARMA3</button>
          <button style={styles.button} onClick={this.props.save}>save</button>
          <button style={styles.button} onClick={this.props.load}>load</button>
        </div>
        <div style={styles.content}>
          {this.props.children}
        </div>
        <div style={styles.menu}>
          <button style={styles.button} onClick={this.props.runMod}>Run modded ARMA3</button>
          <code style={styles.command}>{this.props.command}</code>
        </div>
      </div>
    );
  }
}
