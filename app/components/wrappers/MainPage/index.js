import React, { Component } from 'react';
import child_process from 'child_process';

export default class MainPage extends Component {

  static propTypes = {
    counter: React.PropTypes.number,
    add: React.PropTypes.func,
    remove: React.PropTypes.func,
  };

  run(){
    child_process.execSync('steam -applaunch 107410');
  }

  render() {
    return (
      <div>
        <div>
          ARMA3 Launcher
        </div>
        <div>
          <button onClick={() => this.run()} >Run ARMA</button>
        </div>
        <div>
          <span>{this.props.counter}</span>
          <button onClick={this.props.add}>+</button>
          <button onClick={this.props.remove}>-</button>
        </div>
      </div>
    );
  }
}
