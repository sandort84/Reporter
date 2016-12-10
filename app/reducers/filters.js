import { REQUEST_FILTERS, RECEIVE_FILTERS, SELECT_FILTER } from '../actions';

export const selectedFilter = (state = '', action) => {
  switch (action.type) {
    case SELECT_FILTER:
      return action.filterId;
    default:
      return state;
  }
}

export const filters = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_FILTERS:
      return action.filters;
    default:
      return state;
  }
}
