import { REQUEST_ISSUES, RECEIVE_ISSUES, TOGGLE_ISSUE } from '../actions';

export const issues = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_ISSUES:
      return action.issues;
    default:
      return state;
  }
}

export const active = (state = '', action) => {
  switch (action.type) {
    case TOGGLE_ISSUE:
      if (state === '') {
        return action.issueId;
      } else if (state === action.issueId) {
        return '';
      }
      return action.issueId;
    default:
      return state;
  }
}
