import { get } from 'lodash';
import React, { useCallback } from 'react';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';

import StackWrapper, { IStackModal } from '../StackWrapper';
import ModalForm, { ModalType } from './Form';

import { AddCoreInput } from '@app/modules/cores/type';
import { IDispatch, IRootState } from '@app/modules/store';

import { Container } from './styled';

type IConnectProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
interface IProps extends IConnectProps, IStackModal {
  initialValues?: object;
}

const ModalCore: React.FC<IProps> = ({
  initialValues,
  activeWorkspaceId,
  addNewCoreToWorkspace,
  removeStackModal,
  modalIndex,
  suppressFocusTrap,
}) => {
  const handleSubmit = useCallback(async (values) => {
    await addNewCoreToWorkspace({ workspaceId: activeWorkspaceId, ...values });
    removeStackModal();
  }, []);

  return (
    <StackWrapper
      suppressFocusTrap={suppressFocusTrap}
      onClose={removeStackModal}
      modalIndex={modalIndex}
    >
      <Container>
        <Form
          onSubmit={handleSubmit}
          initialValues={{
            ...initialValues,
            color: get(initialValues, 'color', 'blue'),
            icon: get(initialValues, 'icon', 'untitle'),
          }}
          render={(props: any) => (
            <ModalForm
              titleId={'form.core.workspace.modal.title'}
              type={ModalType.Core}
              onClose={removeStackModal}
              {...props}
            />
          )}
        />
      </Container>
    </StackWrapper>
  );
};

const mapState = (state: IRootState) => ({
  activeWorkspaceId: state.cores.activeWorkspaceId,
});

const mapDispatch = ({ app, cores }: IDispatch) => ({
  addNewCoreToWorkspace: (payload: AddCoreInput) => cores.addNewCoreToWorkspace(payload),
  removeStackModal: () => app.removeStackModal(),
});

export default connect(
  mapState,
  mapDispatch,
)(ModalCore);
