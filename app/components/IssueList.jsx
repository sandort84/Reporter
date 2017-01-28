import React from 'react';

const IssueList = props => {
  const { issues, active, handleIssueDoubleClick, handleIssueClick } = props;
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Key</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {
            issues.map(issue =>
              <tr key={issue.id} onDoubleClick={evt => handleIssueDoubleClick(evt, issue.id)} className={issue.id === active ? 'success' : ''}>
                <td className="no-wrap">
                  <a href="" onClick={evt => handleIssueClick(evt, issue.key)}>{issue.key}</a>
                </td>
                <td>
                  {issue.summary}
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default IssueList;
