/**
 * Created by md on 10.09.16.
 */
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const styles = {
  container: {
    padding: '5px',
    color: '#FFF',
    backgroundColor: 'transparent',
    minHeight: '300px',
  },
  addMod: {
    padding: '5px',
    margin: '5px',
    border: '1px solid rgba(200, 200, 200, 0.5)',
    backgroundColor: 'transparent',
  },
  modList: {
    padding: '5px',
    margin: '5px',
    verticalAlign: 'top',
    border: '1px solid rgba(200, 200, 200, 0.5)',
    backgroundColor: 'transparent',
    display: 'flex',
    flexWrap: 'wrap',
  },
  item: {
    margin: '5px',
    borderBottom: '1px solid #FFF',
    width: '200px',
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
      <Paper style={styles.container} zDepth={2} >
        <Paper style={styles.addMod} zDepth={4}>
          <RaisedButton primary label={'add'} disabled={!this.state.name} onClick={() => this.addMod()} style={{backgroundColor: 'none'}} />
          <TextField
            style={{margin: '0 10px'}}
            floatingLabelText="Mod name"
            value={this.state.name}
            onChange={(event, value) => this.setState({name: value})}
          />
        </Paper>
        <Paper style={styles.modList} zDepth={4} >
          {this.props.list.toList().map((item, index) =>
            <div key={`mod${index}`} style={styles.item} title={item.get('name')}>
              <span title="delete" style={{WebkitUserSelect: 'none', cursor: 'pointer'}} onClick={() => this.props.removeMod(item.get('id'))}>✖&nbsp;</span>
              <span>{item.get('name')}</span>
            </div>
          )}
        </Paper>
      </Paper>
    );
  }
}
