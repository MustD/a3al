/**
 * Created by md on 10.09.16.
 */
import React, { Component } from 'react';
import Input from '../wrappers/Input';

const styles = {
  container: {
    padding: '5px',
    color: '#FFF',
    border: '1px solid #FFF',
  },
  addMod: {
    padding: '5px',
    border: '1px solid #FFF',
  },
  modList: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  item: {
    margin: '5px',
    borderBottom: '1px solid #FFF',
    width: '120px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};

export default class ModManage extends Component {

  static propTypes = {
    list: React.PropTypes.object,
    addMod: React.PropTypes.func,
    removeMod: React.PropTypes.func,
  };

  constructor(props){
    super(props);
    this.state = {
      name: '',
    }
  }

  generateId() {
    return Math.random().toString(34).slice(2, 8);
  }

  addMod(){
    this.props.addMod(this.generateId(), this.state.name);
    this.setState({name: ''});
  }

  render() {
    return (
      <div style={styles.container} >
        <div style={styles.addMod}>
          <Input label={'Mod name'} type={Input.type.string} data={this.state.name} update={(value) => this.setState({name: value})}/>
          <button disabled={!this.state.name} onClick={() => this.addMod()}>add</button>
        </div>
        <div style={styles.modList} >
          {this.props.list.toList().map((item, index) =>
            <div key={`mod${index}`} style={styles.item} title={item.get('name')}>
              <span title="delete" style={{WebkitUserSelect: 'none', cursor: 'pointer'}} onClick={() => this.props.removeMod(item.get('id'))}>✖&nbsp;</span>
              <span>{item.get('name')}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}
