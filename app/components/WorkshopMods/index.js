import React, { Component } from 'react';

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
  }
};

export default class WorkshopMods extends Component {

  static propTypes = {
    path: React.PropTypes.string,
  };

  render() {
    return (
      <div style={styles.container}>
        <div>Workshop mod list:</div>
        <div>{this.props.path}</div>
      </div>
    );
  }
}
