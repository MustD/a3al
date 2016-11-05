/**
 * Created by md on 10.09.16.
 */
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const styles = {
  container: {
    padding: '5px',
    margin: '5px',
    width: '212px',
    display: 'inline-block',
    verticalAlign: 'top',
    border: '1px solid rgba(200, 200, 200, 0.5)',
    backgroundColor: 'transparent',
  },
  item: {
    margin: '5px 0',
    width: '200px',
    backgroundColor: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }
};

export default class SetList extends Component {

  static propTypes = {
    list: React.PropTypes.object,
    activate: React.PropTypes.func,
    add: React.PropTypes.func,
  };

  generateId() {
    return Math.random().toString(34).slice(2, 8);
  }

  render() {
    return (
      <Paper style={styles.container} zDepth={4} >
        <RaisedButton primary label={'ADD SET'} style={styles.item} onMouseUp={() => this.props.add(this.generateId())} />
        {this.props.list.toList().map((item, key) => (
          <RaisedButton
            key={`set${key}`}
            style={styles.item}
            title={item.get('name')}
            onMouseUp={() => this.props.activate(item.get('id'))}
            label={item.get('name') || 'unnamed'}
            secondary
          />
        ))}
      </Paper>
    );
  }
}
