import React from 'react';
import { Link } from 'react-router';

import { STATUS_DISCONNECTED, STATUS_CONNECTING, STATUS_CONNECTED, STATUS_FAILED } from '../actions';

const Footer = props => {
  let url = null;
  let asUser = null;

  if (props.status != STATUS_DISCONNECTED) {
    url = props.connection.jiraUrl && (<span><span> to </span><span>{props.connection.jiraUrl}</span></span>);
    asUser = props.connection.username && (<span><span> as </span><span>{props.connection.username}</span></span>);
  }

  let checkSettings = null;
  if (props.status == STATUS_FAILED) {
    checkSettings = (
      <span>
        <span> you might want to check the </span>
        <Link to="/settings" ><i className="fa fa-wrench faa-wrench animated"></i> settings</Link>
      </span>
    )
  }

  let iconClass = null;
  switch (props.status) {
    case STATUS_DISCONNECTED:
      iconClass = 'fa-chain-broken';
      break;
    case STATUS_CONNECTING:
      iconClass = 'fa-spinner faa-spin animated';
      break;
    case STATUS_CONNECTED:
      iconClass = 'fa-check';
      break;
      case STATUS_FAILED:
        iconClass = 'fa-ban';
        break;
  }
  return (
    <nav className="navbar navbar-default navbar-fixed-bottom">
      <div className="container">
        <p className="navbar-text">
          <i className={`fa ${iconClass}`}></i><span> {props.status} </span>{url}{asUser}{checkSettings}
        </p>
      </div>
    </nav>
  );
}

export default Footer;
