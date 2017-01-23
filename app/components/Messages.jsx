import React from 'react';

import { SEVERITY_ERROR, SEVERITY_WARNING } from '../actions';

const Messages = props => {
  return (
    <div id="messages">
      {
        props.messages.map((m, idx) => {
          let messageClass = 'alert-info';
          switch (m.severity) {
            case SEVERITY_ERROR:
              messageClass = 'alert-danger';
              break;
            case SEVERITY_WARNING:
              messageClass = 'alert-warning';
              break;
          }
          return (
            <div key={idx} className={`alert ${messageClass}`} onClick={e => props.removeMessage(idx)}>
              {m.text}
            </div>
          )
        })
      }
    </div>
  );
}

export default Messages;
