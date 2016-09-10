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
    list: React.PropTypes.array,
    addMod: React.PropTypes.func,
  };

  constructor(props){
    super(props);
    this.state = {
      active: false,
    }
  }


  render() {
    return (
      <div style={styles.container} >
        <div>Mod List</div>
        <ModList
          list={this.props.list}
          activate={(id) => this.setState({active: id})}
          addMod={this.props.addMod}
        />
        <ModEdit data={this.props.list.find(item => item.id === this.state.active)}/>
      </div>
    );
  }
}
