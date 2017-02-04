/**
 * Created by md on 10.09.16.
 */
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import SetList from '../SetList';
import SetEdit from '../SetEdit';

const styles = {
  container: {
    padding: '5px',
    color: '#FFF',
    backgroundColor: 'transparent',
    minHeight: '300px',
  }
};

export default class SetManage extends Component {

  static propTypes = {
    list: React.PropTypes.object,
    modList: React.PropTypes.object,
    activate: React.PropTypes.func,
    active: React.PropTypes.string,
    addSet: React.PropTypes.func,
    removeSet: React.PropTypes.func,
    updateSet: React.PropTypes.func,
    runMod: React.PropTypes.func,
  };

  render() {
    return (
      <Paper style={styles.container} zDepth={2} >
        <SetList
          list={this.props.list}
          activate={(id) => this.props.activate(id)}
          active={this.props.active}
          add={this.props.addSet}
        />
        <SetEdit
          modList={this.props.modList}
          data={this.props.list.get(this.props.active)}
          remove={this.props.removeSet}
          update={this.props.updateSet}
          runMod={this.props.runMod}
        />
      </Paper>
    );
  }
}
