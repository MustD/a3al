/**
 * Created by md on 14.01.17.
 */
import React, { Component } from 'react';
import { fromJS } from 'immutable';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    WebkitUserSelect: 'none'
  },
  item: {
    margin: '5px',
    borderBottom: '1px solid #FFF',
    width: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  },
};

export default class ModToggleList extends Component {

  static propTypes = {
    modList: React.PropTypes.object,
    checkedList: React.PropTypes.object,
    toggle: React.PropTypes.func,
  };

  render() {
    const modList = this.props.modList || fromJS([]);
    const checkedList = this.props.checkedList || fromJS([]);
    return (
        <div style={styles.container}>
          {modList.toList().map((item, index) => (
            <div onClick={() => this.props.toggle(item.get('id'))} key={`item${index}`} style={styles.item}>
              <Checkbox
                checked={checkedList.includes(item.get('id'))}
                label={item.get('name')}
              />
            </div>
          ))}
        </div>
    );
  }
};
