import React, { useCallback } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Button from '@app/renderer/components/Button';
import StackWrapper, { IStackModal } from '@app/renderer/components/Modal/StackWrapper';

import MultiAttachment from '@app/renderer/components/Record/Modal/Form/Attachment/Form';
import LookupForm from '@app/renderer/components/Record/Modal/Form/Lookup';
import ReferenceForm from '@app/renderer/components/Record/Modal/Form/Reference/Form';
import MultiSelectForm from '@app/renderer/components/Record/Modal/Form/Select/MultiSelect/Form';

import { IDispatch } from '@app/renderer/modules/store';

import { submitRecord } from '@app/renderer/utils/record';

const FIELD_MAP: { [key: string]: any } = {
  RECORD_REFERENCE: ReferenceForm,
  MULTI_SELECT: MultiSelectForm,
  LOOKUP: LookupForm,
  MULTI_ATTACHMENT: MultiAttachment,
};

import { ICellProps } from '@app/renderer/components/Record';

import { ButtonContainer, Container } from './styled';

type IConnectProps = ReturnType<typeof mapDispatch>;

interface IModalExpand extends IConnectProps, IStackModal {
  cell: ICellProps;
  onClose: () => void;
  isLookup: boolean;
  rowId: string;
}

const ModalExpand: React.FC<IModalExpand> = ({
  isLookup,
  cell,
  rowId,
  onClose,
  modalIndex,
  updateCell,
  removeStackModal,
  suppressFocusTrap,
}) => {
  const { value, columnId, type } = cell;

  let cellValue = value;
  if (type === 'RECORD_REFERENCE') {
    cellValue = value.map((item) => item.id);
  }

  const initialValues = { [columnId]: cellValue };

  const handleSubmitForm = useCallback(
    (values: any) => {
      submitRecord({ cell, values, initialValues, updateCell, removeStackModal, rowId });
    },
    [columnId, initialValues, rowId],
  );

  return (
    <StackWrapper suppressFocusTrap={suppressFocusTrap} onClose={onClose} modalIndex={modalIndex}>
      <Form initialValues={initialValues} onSubmit={handleSubmitForm}>
        {({ handleSubmit }: FormRenderProps) => (
          <form onSubmit={handleSubmit}>
            <Container tabIndex={0}>
              <Field
                name={cell.columnId}
                isDisabled={isLookup}
                cell={cell}
                component={FIELD_MAP[cell.type]}
              />
              {!isLookup && (
                <ButtonContainer>
                  <Button
                    onClick={() => {
                      handleSubmit();
                    }}
                    isSmall={true}
                  >
                    <FormattedMessage id="global.save" />
                  </Button>
                </ButtonContainer>
              )}
            </Container>
          </form>
        )}
      </Form>
    </StackWrapper>
  );
};

const mapDispatch = ({ app, core }: IDispatch) => ({
  updateCell: (payload: any) => core.updateCell(payload),
  removeStackModal: () => app.removeStackModal(),
});

export default connect(
  undefined,
  mapDispatch,
)(ModalExpand);
