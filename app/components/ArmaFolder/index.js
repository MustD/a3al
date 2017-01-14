import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

const styles = {
  container: {
    padding: '5px',
    margin: '5px',
    color: '#FFF',
    border: '1px solid rgba(200, 200, 200, 0.5)',
    display: 'inline-block',
    verticalAlign: 'top',
    width: 'calc(100% - 232px)',
    backgroundColor: 'transparent',
  }
};

export default class ArmaFolder extends Component {

  static propTypes = {
    path: React.PropTypes.string,
  };

  render() {
    const path = this.props.path;
    return (
      <div style={styles.container}>
        <TextField
          floatingLabelText="Arma 3 folder path:"
          value={path}
          onChange={(event, value) => this.update('name', value)}
          fullWidth
        />
      </div>
    );
  }
}
