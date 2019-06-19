import React, { useCallback } from 'react';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';

import HideColumnForm from './Form';

import ThrowWrapper, { IParentModal } from '@app/components/Modal/ThrowWrapper';
import { IDispatch, IRootState } from '@app/modules/store';

type IConnectProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & IParentModal;

const ModalHideColumn: React.FC<IConnectProps> = ({ columns, removeThrowModal, parentSize }) => {
  const initialValues = columns.reduce((obj: any, column: any) => {
    obj[column.field] = true;
    return obj;
  }, {});

  const handleRender = useCallback((props) => <HideColumnForm columns={columns} {...props} />, []);

  return (
    <ThrowWrapper
      avoidCollision={true}
      avoidElementVert={true}
      parentSize={parentSize}
      onClose={removeThrowModal}
    >
      <Form
        onSubmit={(values) => {
          // tslint:disable-next-line: no-console
          console.log(values);
        }}
        initialValues={initialValues}
        render={handleRender}
      />
    </ThrowWrapper>
  );
};

const mapState = ({ core }: IRootState) => ({
  columns: core.initialColumns.slice(1, core.initialColumns.length - 1),
});

const mapDispatch = ({ app }: IDispatch) => ({
  removeThrowModal: () => app.removeThrowModal(),
});

export default connect(
  mapState,
  mapDispatch,
)(ModalHideColumn);
