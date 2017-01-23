import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { filters, selectedFilter } from './filters';
import { issues, active } from './issues';
import { connection, status } from './connection';
import { messages } from './messages';

const reporterApp = combineReducers({
  connection,
  filters,
  selectedFilter,
  issues,
  active,
  messages,
  status,
  routing: routerReducer
});

export default reporterApp;
