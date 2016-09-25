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
    width: 'calc(100% - 164px)',
  }
};

export default class ModEdit extends Component {

  static propTypes = {
    data: React.PropTypes.object,
    remove: React.PropTypes.func,
    update: React.PropTypes.func,
  };

  update(key, value) {
    this.props.update(this.props.data.get('id'), this.props.data.set(key, value));
  }

  render() {
    const name = this.props.data ? this.props.data.get('name') : '';
    const command = this.props.data ? this.props.data.get('command') : '';
    if (this.props.data === undefined) {
      return (
        <div style={styles.container}>
          <span>Add new set or choose existing one</span><br/>
          <hr/>
          <span>Example of command:</span><br/>
          <code>-mod="@CBA_A3\\;@lsd_nvg\\;"</code>
          <hr/>
          <span>Make sure that steam launch properties are empty</span>
        </div>
      )
    }
    return (
      <div style={styles.container}>
        <Input label={'Name'} type={Input.type.string} data={name} update={(value) => this.update('name', value)}/>
        <Input label={'Command'} type={Input.type.text} data={command}
               update={(value) => this.update('command', value)}/>
        <button onClick={() => this.props.remove(this.props.data.get('id'))}>delete</button>
      </div>
    );
  }
}
