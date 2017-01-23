import { SET_MESSAGES, REMOVE_MESSAGE } from '../actions';

export const messages = (state = [], action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return action.messages;
    case REMOVE_MESSAGE:
      if (action.index < state.length) {
        const newState = state.splice();
        newState.splice(action.index, 1);
        return newState;
      }
      return state;
    default:
      return state;
  }
}
