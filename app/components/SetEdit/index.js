/**
 * Created by md on 10.09.16.
 */
import React, { Component } from 'react';
import { fromJS } from 'immutable';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

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
  modList: {
    display: 'flex',
    flexWrap: 'wrap',
    WebkitUserSelect: 'none'
  },
  item: {
    margin: '5px',
    borderBottom: '1px solid #FFF',
    width: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  },
  command: {
    margin: '5px 10px',
    display: 'block',
    width: 'calc(100% - 10px)',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
  }
};

export default class SetEdit extends Component {

  static propTypes = {
    data: React.PropTypes.object,
    modList: React.PropTypes.object,
    remove: React.PropTypes.func,
    update: React.PropTypes.func,
    runMod: React.PropTypes.func,
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
        <Paper style={styles.container} zDepth={4}>
          <span>Add new set or choose existing one</span><br/>
          <hr/>
          <span>Example of command:</span><br/>
          <code>-mod="@CBA_A3\\;@lsd_nvg\\;"</code>
          <hr/>
          <span>Make sure that steam launch properties are empty</span>
        </Paper>
      )
    }
    return (
      <Paper style={styles.container} zDepth={4}>
        <TextField
          style={{margin: '0 5px'}}
          floatingLabelText="Name"
          value={name}
          onChange={(event, value) => this.update('name', value)}
        />
        <div style={styles.modList}>
          <Subheader style={{lineHeight: '30px'}}>Please choose mods for this set</Subheader>
          {this.props.modList.toList().map((item, index) => (
            <div onClick={() => this.toggle(item.get('id'))} key={`item${index}`} style={styles.item}>
              <Checkbox
                checked={modList.includes(item.get('id'))}
                label={item.get('name')}
                style={styles.checkbox}
              />
            </div>
          ))}
        </div>
        <div>
          <Subheader style={{lineHeight: '30px'}}>Launch command preview</Subheader>
          <code style={styles.command}><span>{command}</span></code>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <RaisedButton
            label={'Run modded ARMA3'}
            style={{backgroundColor: 'none', margin: '5px'}}
            labelStyle={{padding: '0 5px'}}
            onMouseUp={this.props.runMod}
            primary={true}
          />
          <RaisedButton
            primary
            label={'delete set'}
            style={{backgroundColor: 'none', margin: '5px'}}
            labelStyle={{padding: '0 5px'}}
            onMouseUp={() => this.props.remove(this.props.data.get('id'))}
          />
        </div>
      </Paper>
    );
  }
}
