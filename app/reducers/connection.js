import {
  SET_JIRA_URL, SET_USERNAME, SET_PASSWORD,
  REQUEST_TEST, RECEIVE_TEST, FAIL_TEST, INVALIDATE_CONNECTION,
  STATUS_DISCONNECTED
} from '../actions';

export const connection = (state = {
    username: '',
    password: '',
    jiraUrl: ''
  }, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.username
      };
    case SET_PASSWORD:
      return {
        ...state,
        password: action.password
      };
    case SET_JIRA_URL:
      return {
        ...state,
        jiraUrl: action.jiraUrl
      };
    default:
      return state;
  }
}

export const status = (state = STATUS_DISCONNECTED, action) => {
  switch (action.type) {
    case REQUEST_TEST:
    case RECEIVE_TEST:
    case FAIL_TEST:
    case INVALIDATE_CONNECTION:
      return action.status
    default:
      return state;
  }
}
