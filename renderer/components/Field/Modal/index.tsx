import ThrowWrapper, { IModalProps } from '@app/renderer/components/Modal/ThrowWrapper';
import createDecorator from 'final-form-calculate';
import { get, omit } from 'lodash';
import React, { useCallback } from 'react';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';

import { FIELD_TYPES } from '@app/renderer/constants/fieldTypes';
import FieldModalForm from './Form';

import { IDispatch } from '@app/renderer/modules/store';

interface IColumn {
  name: string;
  type: string;
  typeOptions: any;
}

type IConnectProps = ReturnType<typeof mapDispatch>;
interface IFieldModal extends IModalProps, IConnectProps {
  column?: IColumn;
  parentSize: any;
}

const decorator = createDecorator(
  {
    field: 'type',
    updates: {
      typeOptions: (type: string) => FIELD_TYPES[type].typeOptions,
    },
  },
  {
    field: 'typeOptions.includeTime',
    updates: {
      typeOptions: (includeTime: boolean, allValues: any) => {
        // if (!includeTime) {
        //   return omit(allValues.typeOptions, ['timeFormat', 'useGMT']);
        // }
        return allValues.typeOptions;
      },
    },
  },
);

const FieldModal: React.FC<IFieldModal> = ({
  column,
  removeThrowModal,
  gridAddColumn,
  parentSize,
}) => {
  const handleSubmit = useCallback(async (values) => {
    if (values.type === 'FORMULA') {
      // tslint:disable-next-line: no-console
      console.log(values);
      return;
    }
    await gridAddColumn(values);
    removeThrowModal();
  }, []);
  const handleRender = useCallback(
    (props) => <FieldModalForm onClose={removeThrowModal} {...props} />,
    [removeThrowModal],
  );

  return (
    <ThrowWrapper
      parentSize={parentSize}
      onClose={removeThrowModal}
      avoidCollision={true}
      avoidElementVert={true}
    >
      <Form
        decorators={[decorator]}
        initialValues={{
          ...column,
          name: get(column, 'name', 'Field'),
          type: get(column, 'type', 'TEXT'),
        }}
        onSubmit={handleSubmit}
        render={handleRender}
      />
    </ThrowWrapper>
  );
};

const mapDispatch = ({ app, core }: IDispatch) => ({
  gridAddColumn: async (payload: any) => core.gridAddColumn(payload),
  removeThrowModal: () => app.removeThrowModal(),
});

export default connect(
  () => ({}),
  mapDispatch,
)(FieldModal);
