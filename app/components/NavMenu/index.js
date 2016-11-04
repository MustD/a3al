/**
 * Created by md on 4.11.16.
 */
import React, { Component } from 'react';

const styles = {
  container: {
    display: 'flex',
    verticalAlign: 'top',
    margin: '5px 0',
  },
  item: {
    display: 'inline-block',
    padding: '5px',
    margin: '0 5px 0 0',
    border: '1px solid #FFF',
    cursor: 'pointer',
    width: '120px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  active: {
    display: 'inline-block',
    padding: '5px',
    margin: '0 5px 0 0',
    border: '1px solid #FFF',
    cursor: 'pointer',
    width: '120px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    textDecoration: 'underline',
    fontWeight: '600',
  }
};

export default class NavMenu extends Component {

  static propTypes = {
    active: React.PropTypes.string,
    navigate: React.PropTypes.func,
  };

  generateId() {
    return Math.random().toString(34).slice(2, 8);
  }

  render() {
    return (
      <div style={styles.container} >
        <div
          style={this.props.active === 'sets' ? styles.active : styles.item}
          onClick={() => this.props.navigate('sets')}
        >
          Mod Sets
        </div>
        <div
          style={this.props.active === 'mods' ? styles.active : styles.item}
          onClick={() => this.props.navigate('mods')}
        >
          Mod List
        </div>
      </div>
    );
  }
}
