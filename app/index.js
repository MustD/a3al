import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.global.css';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as colors from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);
const theme = {
  spacing: '5px',
  fontFamily: 'Arial, Helvetica, Helvetica Neue',
  palette: {
    primary1Color: colors.grey600,
    primary2Color: colors.grey700,
    primary3Color: colors.grey400,
    accent1Color: colors.grey800,
    accent2Color: colors.grey100,
    accent3Color: colors.grey500,
    textColor: colors.darkBlack,
    secondaryTextColor: (0, fade)(colors.darkBlack, 0.54),
    alternateTextColor: colors.white,
    canvasColor: colors.white,
    borderColor: colors.grey300,
    disabledColor: (0, fade)(colors.darkBlack, 0.3),
    pickerHeaderColor: colors.grey500,
    clockCircleColor: (0, fade)(colors.darkBlack, 0.07),
    shadowColor: colors.fullBlack
  }
};
render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      <Router history={history} routes={routes} />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
