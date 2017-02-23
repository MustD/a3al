import React, { Component } from 'react';

const styles = {
  container: {
    display: 'block',
    padding: '5px',
    color: '#FFF',
    backgroundColor: 'transparent',
    maxHeight: '200px',
    overflowY: 'auto',
  },
  message: {
    margin: '5px 10px',
    width: 'calc(100% - 10px)',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
  }
};

export default class LogList extends Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    list: React.PropTypes.object,
  };

  render() {
    return (
      <code style={styles.container}>
        {this.props.list.size > 0 ? (<div>{this.props.name}</div>) : ''}
        {this.props.list.map((message, index) => (<div style={styles.message} key={index}>{index+1}. {message}</div>))}
      </code>
    );
  }
}
