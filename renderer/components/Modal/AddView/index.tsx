import arrayMutators from 'final-form-arrays';
import createDecorator from 'final-form-calculate';
import { get } from 'lodash';
import React from 'react';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';

import StackWrapper, { IStackModal } from '@app/renderer/components/Modal/StackWrapper';

import { IRootState } from '@app/renderer/modules/store';

import AddViewForm from './Form';

type IConnectProps = ReturnType<typeof mapState>;

interface IAddView extends IStackModal, IConnectProps {
  initialValues: any;
}

const AddView: React.FC<IAddView> = ({ columns, initialValues, modalIndex, suppressFocusTrap }) => {
  const columnsInitialValue = columns.map((column: any) => ({
    columnId: column.field,
    isSelected: true,
  }));

  const decorator = createDecorator(
    {
      field: 'type',
      updates: {
        columns: (type: string) => {
          if (type === 'LIST') {
            return columnsInitialValue.map((column: any, index: number) => {
              if (index >= 5) {
                return { ...column, isSelected: false };
              }
              return column;
            });
          }
          return columnsInitialValue;
        },
      },
    },
    {
      field: 'viewOptions.startDate',
      updates: {
        columns: (startDate: string, allValues: any) => {
          const { columns: columnsValue } = allValues;
          return columnsValue.map((col: any) => {
            if (col.columnId === startDate) {
              return { ...col, isSelected: true };
            }
            return col;
          });
        },
      },
    },
    {
      field: 'viewOptions.endDate',
      updates: {
        columns: (endDate?: string, allValues: any) => {
          const { columns: columnsValue } = allValues;
          return columnsValue.map((col: any) => {
            if (col.columnId === endDate) {
              return { ...col, isSelected: true };
            }
            return col;
          });
        },
      },
    },
  );

  return (
    <StackWrapper modalIndex={modalIndex} suppressFocusTrap={suppressFocusTrap}>
      <Form
        decorators={[decorator]}
        initialValues={{
          ...initialValues,
          type: get(initialValues, 'type', 'GRID'),
        }}
        mutators={{
          ...arrayMutators,
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        render={(props) => <AddViewForm columns={columns} {...props} />}
      />
    </StackWrapper>
  );
};

const mapState = ({ core }: IRootState) => ({
  columns: core.initialColumns.slice(1, core.initialColumns.length - 1),
});

export default connect(mapState)(AddView);
