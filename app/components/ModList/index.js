/**
 * Created by md on 10.09.16.
 */
import React, { Component } from 'react';

const styles = {
  container: {
    padding: '5px',
    margin: '5px',
    width: '100px',
    border: '1px solid #FFF',
    display: 'inline-block',
    verticalAlign: 'top',
  },
  item: {
    width: '100px',
    display: 'inline-block',
    margin: '5px 0',
    cursor: 'pointer',
    borderBottom: '1px solid #FFF',
    textAlign: 'center',
  }
};

export default class ModList extends Component {

  static propTypes = {
    list: React.PropTypes.array,
    activate: React.PropTypes.func,
    addMod: React.PropTypes.func,
  };

  generateId() {
    return Math.random().toString(34).slice(2, 8);
  }


  render() {
    return (
      <div style={styles.container} >
        {this.props.list.map((item, key) => (
          <div key={key} style={styles.item} onClick={() => this.props.activate(item.id)}>{item.name}</div>
        ))}
        <div style={styles.item} onClick={() => this.props.addMod(this.generateId())}>ADD +</div>
      </div>
    );
  }
}
