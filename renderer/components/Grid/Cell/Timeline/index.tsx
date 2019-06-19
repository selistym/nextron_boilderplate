import React from 'react';

const TimelineCellRenderer = ({ data }) => (
  <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
    <div
      style={{
        width: '100%',
        height: '30px',
        backgroundColor: data.col_timeline_data.span < 0 ? '#F6564D' : '#3F66F3',
        borderRadius: '5px',
      }}
    />
  </div>
);

export default TimelineCellRenderer;
