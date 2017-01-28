import { REQUEST_ISSUES, RECEIVE_ISSUES, START_ISSUE, END_ISSUE } from '../actions';

export const issues = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_ISSUES:
      return action.issues;
    default:
      return state;
  }
}

export const active = (state = {}, action) => {
  switch (action.type) {
    case START_ISSUE:
      return {
        id: action.issueId,
        start: action.time
      }
    case END_ISSUE:
      return {};
    default:
      return state;
  }
}
