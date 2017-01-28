import React from 'react';

const IssueSource = props => {
  const { selectedFilter, filters, handleFilterSelect } = props;
  return (
    <form>
      <div className="form-group">
        <label> Filter </label>
          <select value={selectedFilter} className="form-control" disabled={filters.length == 0} onChange={handleFilterSelect}>
            <option value="" disabled={selectedFilter !== ''}>Please select a filter</option>
            {
              filters.map(filter =>
                <option key={filter.id} value={filter.id}>{filter.name}{(filter.description ? (' - ' + filter.description) : '')}</option>
              )
            }
          </select>
      </div>
    </form>
  );
};

export default IssueSource;
