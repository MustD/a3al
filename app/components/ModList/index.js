/**
 * Created by md on 10.09.16.
 */
import React, { Component } from 'react';

const styles = {
  container: {
    padding: '5px',
    margin: '5px',
    width: '120px',
    border: '1px solid #FFF',
    display: 'inline-block',
    verticalAlign: 'top',
  },
  item: {
    margin: '5px 0',
    cursor: 'pointer',
    width: '120px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }
};

export default class ModList extends Component {

  static propTypes = {
    list: React.PropTypes.object,
    activate: React.PropTypes.func,
    addMod: React.PropTypes.func,
  };

  generateId() {
    return Math.random().toString(34).slice(2, 8);
  }

  render() {
    return (
      <div style={styles.container} >
        <div>Mod List</div>
        <button style={styles.item} onClick={() => this.props.addMod(this.generateId())}>ADD SET</button>
        {this.props.list.toList().map((item, key) => (
          <button
            key={`set${key}`}
            style={styles.item}
            title={item.get('name')}
            onClick={() => this.props.activate(item.get('id'))}
          >
            {item.get('name') || 'unnamed'}
          </button>
        ))}
      </div>
    );
  }
}
