import { ADD_ENTRY } from '../actions';

export const localLog = (state = [], action) => {
  switch (action.type) {
    case ADD_ENTRY:
      const newState = state.slice();
      newState.push(action.entry)
      return newState;
    default:
      return state;
  }
};
