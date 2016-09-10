/**
 * Created by md on 10.09.16.
 */
import React, { Component } from 'react';
import child_process from 'child_process';

export default class Input extends Component {

  run(){
    child_process.execSync('steam -applaunch 107410');
  }

  render() {
    return (
      <div>
        <div>
          ARMA3 Launcher
        </div>
        <button onClick={() => this.run()} >Run ARMA</button>
      </div>
    );
  }
}
