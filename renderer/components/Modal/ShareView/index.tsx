import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { connect } from 'react-redux';

import StackWrapper, { IStackModal } from '@app/components/Modal/StackWrapper';
import { IDispatch } from '@app/modules/store';

import CollaboratorSection from './Collaborator';

import Button from '@app/components/Button';
import ButtonIcon from '@app/components/Button/Icon';
import { glyphs } from '@app/components/Icon';
import { BottomContainer, Container, Content, Title, TopContainer } from './styled';

type IConnectProps = ReturnType<typeof mapDispatch> & IStackModal;

interface IShareView extends IConnectProps {
  onSubmit: (values: any) => void;
}

const ShareView: React.FC<IShareView> = ({
  modalIndex,
  suppressFocusTrap,
  removeStackModal,
  onSubmit,
}) => {
  const initialValues = {
    collaborators: [
      { userId: 'userklwkeflwf1', auth: 'edit' },
      { userId: 'userklwkeflwf3', auth: 'edit' },
      { userId: 'userklwkeflwf4', auth: 'admin' },
    ],
  };

  return (
    <StackWrapper
      onClose={removeStackModal}
      modalIndex={modalIndex}
      suppressFocusTrap={suppressFocusTrap}
    >
      <Form
        initialValues={initialValues}
        mutators={{
          ...arrayMutators,
        }}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Container>
              <TopContainer>
                <Title>Share View</Title>
                <ButtonIcon
                  onClick={(e: React.SyntheticEvent) => {
                    e.preventDefault();
                    removeStackModal();
                  }}
                  iconProps={{ size: { width: 15, height: 15 }, icon: glyphs.REMOVE }}
                />
              </TopContainer>
              <Content>
                <FieldArray
                  name="collaborators"
                  render={(props) => <CollaboratorSection {...props} />}
                />
              </Content>
              <BottomContainer>
                <Button
                  onClick={(e: React.SyntheticEvent) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  Save
                </Button>
              </BottomContainer>
            </Container>
          </form>
        )}
      </Form>
    </StackWrapper>
  );
};

const mapDispatch = ({ app }: IDispatch) => ({
  removeStackModal: () => app.removeStackModal(),
});

export default connect(
  undefined,
  mapDispatch,
)(ShareView);
