/**
 * Created by md on 10.09.16.
 */
import React, { Component } from 'react';

const styles = {
  item: {
    display: 'block',
    margin: '5px 0',
    wordWrap: 'break-word',
  }
};

export default class Input extends Component {

  static propTypes = {
    label: React.PropTypes.string,
    type: React.PropTypes.string,
    data: React.PropTypes.string,
    update: React.PropTypes.func,
  };

  static type = {
    string: 'string',
    text: 'text',
  };

  getInput(type, data){
    switch (type){
      case Input.type.string:
        return (<input type="text" value={data} onChange={(event) => this.props.update(event.target.value)} />);
      case Input.type.text:
        return (<textarea value={data} onChange={(event) => this.props.update(event.target.value)} />);
      default:
        return (<input type="text" value={data}/>);
    }
  }

  render() {
    return (
      <div style={styles.item}>
        <label>
          {this.props.label}
          {this.getInput(this.props.type, this.props.data)}
        </label>
      </div>
    );
  }
}
