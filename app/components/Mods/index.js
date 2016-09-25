/**
 * Created by md on 10.09.16.
 */
import React, { Component } from 'react';
import ModList from '../ModList';
import ModEdit from '../ModEdit';

const styles = {
  container: {
    padding: '5px',
    color: '#FFF',
    border: '1px solid #FFF',
  }
};

export default class Mods extends Component {

  static propTypes = {
    list: React.PropTypes.object,
    activate: React.PropTypes.func,
    active: React.PropTypes.string,
    addMod: React.PropTypes.func,
    removeMod: React.PropTypes.func,
    updateMod: React.PropTypes.func,
  };

  render() {
    return (
      <div style={styles.container} >
        <ModList
          list={this.props.list}
          activate={(id) => this.props.activate(id)}
          addMod={this.props.addMod}
        />
        <ModEdit
          data={this.props.list.get(this.props.active)}
          remove={this.props.removeMod}
          update={this.props.updateMod}
        />
      </div>
    );
  }
}
