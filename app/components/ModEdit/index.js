/**
 * Created by md on 10.09.16.
 */
import React, { Component } from 'react';
import Input from '../wrappers/Input';

const styles = {
  container: {
    padding: '5px',
    margin: '5px',
    color: '#FFF',
    border: '1px solid #FFF',
    display: 'inline-block',
    verticalAlign: 'top',
  }
};

export default class ModEdit extends Component {

  static propTypes = {
    data: React.PropTypes.object,
  };


  render() {
    const name = this.props.data ? this.props.data.name : '';
    const command = this.props.data ? this.props.data.command : '';
    return (
      <div style={styles.container}>
        <Input label={'Name'} type={Input.type.string} data={name} />
        <Input label={'Command'} type={Input.type.text} data={command} />
        <button>delete</button>
      </div>
    );
  }
}
