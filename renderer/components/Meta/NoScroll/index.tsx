import React from 'react';

const MetaNoScroll: React.FC = () => (
  <style jsx={true} global={true}>{`
    html,
    body {
      overflow: hidden;
    }
  `}</style>
);

export default MetaNoScroll;
