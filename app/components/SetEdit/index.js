/**
 * Created by md on 10.09.16.
 */
import React, { Component } from 'react';
import Input from '../wrappers/Input';
import { fromJS } from 'immutable';

const styles = {
  container: {
    padding: '5px',
    margin: '5px',
    color: '#FFF',
    border: '1px solid #FFF',
    display: 'inline-block',
    verticalAlign: 'top',
    width: 'calc(100% - 164px)',
  },
  modList: {
    display: 'flex',
    flexWrap: 'wrap',
    WebkitUserSelect: 'none'
  },
  item: {
    margin: '5px',
    borderBottom: '1px solid #FFF',
    width: '120px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  },
};

export default class SetEdit extends Component {

  static propTypes = {
    data: React.PropTypes.object,
    modList: React.PropTypes.object,
    remove: React.PropTypes.func,
    update: React.PropTypes.func,
  };

  update(key, value) {
    this.props.update(this.props.data.get('id'), this.props.data.set(key, value));
  }

  toggle(id) {
    let list = this.props.data.get('modList');
    if (!list.includes(id)) {
      list = list.push(id);
    } else {
      list = list.filter(item => item !== id);
    }

    let command = '';
    if(list.size){
      command += ' -mod="';
      list.forEach(item => command += `${this.props.modList.getIn([item, 'name'])}\\\\;`);
      command += '"'
    }

    this.props.update(this.props.data.get('id'), this.props.data.set('modList', list).set('command', command))
  }

  render() {
    const name = this.props.data ? this.props.data.get('name') : '';
    const command = this.props.data ? this.props.data.get('command') : '';
    const modList = this.props.data ? this.props.data.get('modList') : fromJS([]);
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
        <div style={styles.modList}>
          {this.props.modList.toList().map((item, index) => (
            <div onClick={() => this.toggle(item.get('id'))} key={`item${index}`} style={styles.item}>
              {modList.includes(item.get('id')) ? (<span>✔</span>) : (<span style={{color: "transparent"}}>✔</span>)}
              <span>{item.get('name')}</span>
            </div>
          ))}
        </div>
        <Input label={'Command'} disabled type={Input.type.text} data={command}
               update={(value) => this.update('command', value)}/>

        <button onClick={() => this.props.remove(this.props.data.get('id'))}>delete</button>
      </div>
    );
  }
}
