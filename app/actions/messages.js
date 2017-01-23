export const SET_MESSAGES = 'SET_MESSAGES';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
export const SEVERITY_ERROR = 'ERROR';
export const SEVERITY_WARNING = 'WARNING';

export const setMessages = messages => {
  return {
    type: SET_MESSAGES,
    messages
  }
}

export const removeMessage = index => {
  return {
    type: REMOVE_MESSAGE,
    index
  }
}
