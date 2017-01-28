import React, { Component } from 'react';
import { fromJS } from 'immutable';

import ToggleList from '../../components/ModToggleList';
import RaisedButton from 'material-ui/RaisedButton';

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
  button: {
    margin: '5px 10px 5px 0',
    backgroundColor: 'none',
  },
};

export default class WorkshopMods extends Component {

  static propTypes = {
    mods: React.PropTypes.object,
    rescan: React.PropTypes.func,
  };

  render() {
    const list = this.props.mods || fromJS({});
    const toggledList = fromJS([]);

    return (
      <div style={styles.container}>
        <div>Workshop mod list to import:</div>
        <ToggleList modList={list} checkedList={toggledList}/>
        <RaisedButton
          label={'rescan'}
          style={styles.button}
          onMouseUp={() => this.props.rescan()}
          secondary={true}
        />
      </div>
    );
  }
}
