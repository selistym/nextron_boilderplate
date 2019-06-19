import React from 'react';

import Meta from '@app/renderer/components/Meta';
import Modal from '@app/renderer/components/Modal';

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
