import React from 'react';

import Meta from '../components/Meta';
import Modal from '../components/Modal';

const Pages = ({ children }: any) => {
  return (
    <>
      <Meta />
      <Modal />
      {children}
    </>
  );
};

export default Pages;
