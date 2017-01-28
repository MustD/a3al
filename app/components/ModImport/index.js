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

export default class ModImport extends Component {

  static propTypes = {
    list: React.PropTypes.object,
    importMods: React.PropTypes.func,
  };

  render() {
    const list = this.props.list || fromJS({});

    return (
      <div style={styles.container}>
        <div>Press import button to attempt to import mod to pool, be sure that arma folder is valid</div>
        <RaisedButton
          label={'import'}
          style={styles.button}
          onMouseUp={() => this.props.importMods()}
          secondary={true}
        />
        <ToggleList modList={list} toggle={() => {}} checkedList={list.toArray().map((value) => value.get('id'))}/>
      </div>
    );
  }
}
