import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { ipcRenderer } from 'electron';

import createLogger from 'redux-logger';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import FontAwesome from 'font-awesome/css/font-awesome.css';
import FontAwesomeAnimation from 'font-awesome-animation/dist/font-awesome-animation.css';

import reducer from './reducers';
import App from './components/App.jsx';
import Settings from './components/Settings.jsx';
import Reporter from './components/Reporter.jsx';

import './app.css';

import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';

const middleware = [ thunk, routerMiddleware(hashHistory) ];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());

  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

}

const connection = ipcRenderer.sendSync('get-connection-details');

const store = createStore(
  reducer,
  {connection},
  applyMiddleware(...middleware)
);
const history = syncHistoryWithStore(hashHistory, store);


render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} dispatch={store.dispatch}>
        <IndexRoute component={Reporter}/>
        <Route path="/settings" component={Settings} />
        <Redirect path="*" to="/" />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
