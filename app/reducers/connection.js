import { SET_JIRA_URL, SET_USERNAME, SET_PASSWORD } from '../actions';

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
