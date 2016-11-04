/**
 * Created by md on 10.09.16.
 */
import React, { Component } from 'react';

const styles = {
  container: {
    display: 'block',
    margin: '5px 0',
  },
  textarea: {
    width: 'calc(100% - 13px)',
    minHeight: '50px',
    resize: 'vertical',
    wordWrap: 'break-word',
  }
};

export default class Input extends Component {

  static propTypes = {
    label: React.PropTypes.string,
    type: React.PropTypes.string,
    data: React.PropTypes.string,
    update: React.PropTypes.func,
    disabled: React.PropTypes.bool,
  };

  static type = {
    string: 'string',
    text: 'text',
  };

  getInput(type, data){
    switch (type){
      case Input.type.string:
        return (<input disabled={this.props.disabled} type="text" value={data} onChange={(event) => this.props.update(event.target.value)} />);
      case Input.type.text:
        return (<textarea disabled={this.props.disabled} style={styles.textarea} value={data} onChange={(event) => this.props.update(event.target.value)} />);
      default:
        return (<input disabled={this.props.disabled} type="text" value={data}/>);
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <label>
          {this.props.label}
        </label><br/>
          {this.getInput(this.props.type, this.props.data)}
      </div>
    );
  }
}
