import React, { useCallback, useRef } from 'react';
import { Field } from 'react-final-form';
import { FieldArrayRenderProps } from 'react-final-form-arrays';
import { connect } from 'react-redux';

import Accordion from '@app/renderer/components/Accordion';
import CollaboratorItem from './Item';

import { ThrowModalType } from '@app/renderer/constants/modals';
import { IDispatch } from '@app/renderer/modules/store';

import { COLLABORATORS } from '@app/renderer/modules/settings/fakaData';

import { Container, Option } from './styled';

type IConnectProps = ReturnType<typeof mapDispatch> & FieldArrayRenderProps<HTMLElement>;

const ShareViewCollaborator: React.FC<IConnectProps> = ({
  fields,
  addThrowModal,
  removeThrowModal,
}) => {
  const posRef = useRef<HTMLDivElement>(null);

  const selectedItems = fields.value;

  const handleAdd = useCallback(
    () => {
      addThrowModal({
        type: ThrowModalType.Select,
        parentSize: posRef && posRef.current && posRef.current.getBoundingClientRect(),
        props: {
          onClickOption: (option: any) => {
            fields.push({ userId: option.value, auth: 'edit' });
            removeThrowModal();
          },
          options: COLLABORATORS.filter(
            (collaborator) =>
              selectedItems.findIndex((item: any) => item.userId === collaborator.userId) === -1,
          ).map(({ userId, firstName, lastName }) => ({
            name: `${firstName} ${lastName}`,
            value: userId,
          })),
          renderOption: (option: any) => <Option>{option.name}</Option>,
          onClose: removeThrowModal,
        },
      });
    },
    [selectedItems, COLLABORATORS],
  );

  return (
    <Accordion
      ref={posRef}
      onClickAdd={handleAdd}
      addButtonTitleId="share.view.add.collaborator"
      title={`Individual Collaborators (${selectedItems.length})`}
    >
      <Container>
        {fields.map((name: string) => {
          return <Field key={name} name={name} component={CollaboratorItem} />;
        })}
      </Container>
    </Accordion>
  );
};

const mapDispatch = ({ app }: IDispatch) => ({
  addThrowModal: (props: any) => app.addThrowModal(props),
  removeThrowModal: () => app.removeThrowModal(),
});

export default connect(
  () => ({}),
  mapDispatch,
)(ShareViewCollaborator);
