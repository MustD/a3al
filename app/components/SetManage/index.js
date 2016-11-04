/**
 * Created by md on 10.09.16.
 */
import React, { Component } from 'react';
import SetList from '../SetList';
import SetEdit from '../SetEdit';

const styles = {
  container: {
    padding: '5px',
    color: '#FFF',
    border: '1px solid #FFF',
  }
};

export default class SetManage extends Component {

  static propTypes = {
    list: React.PropTypes.object,
    activate: React.PropTypes.func,
    active: React.PropTypes.string,
    addSet: React.PropTypes.func,
    removeSet: React.PropTypes.func,
    updateSet: React.PropTypes.func,
  };

  render() {
    return (
      <div style={styles.container} >
        <SetList
          list={this.props.list}
          activate={(id) => this.props.activate(id)}
          add={this.props.addSet}
        />
        <SetEdit
          data={this.props.list.get(this.props.active)}
          remove={this.props.removeSet}
          update={this.props.updateSet}
        />
      </div>
    );
  }
}
