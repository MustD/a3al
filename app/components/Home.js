import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import FolderFs from '../api/FolderFs';

export default class Home extends Component {

  getFolder(path){
    const folder = new FolderFs(path)
    return folder.getContent();
  }
  render() {
    return (
      <div>
        <div className={styles.container}>
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
          {this.getFolder('./')}
        </div>
      </div>
    );
  }
}
