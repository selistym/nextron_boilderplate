import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Field } from 'react-final-form';
import { connect } from 'react-redux';

import FormInputSelect, { IOption } from '@app/renderer/components/Form/FormInputSelect';
import Spinner from '@app/renderer/components/Loading/Spinner';

import { IDispatch, IRootState } from '@app/renderer/modules/store';

import { FieldCSS, IFieldOptions } from '../shared';

type IConnectProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & IFieldOptions;

const FieldOptionLookup: React.FC<IConnectProps> = ({
  className,
  getAllGridColumns,
  getForeignTableColumns,
  input: { value },
}) => {
  const selectedReferenceColumnId = value && value.recordReferenceColumnId;

  const [tableReferenceColumns, setTableReferenceColumns] = useState<IOption[]>([]);
  const [foreignTableColumns, setForeignTableColumns] = useState<IOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const columns = getAllGridColumns();
    setTableReferenceColumns(
      columns
        .map((col) => col.colDef)
        .filter((column) => get(column, 'typeOptions.type') === 'RECORD_REFERENCE')
        .map((column) => ({
          name: column.headerName,
          nameId: column.headerName,
          value: column.field,
          foreignTableId: column.typeOptions.foreignTableId,
        })),
    );
  }, []);

  useEffect(
    () => {
      (async () => {
        setIsLoading(true);
        const selectedColumn = tableReferenceColumns.find(
          (column) => column.value === selectedReferenceColumnId,
        );
        if (selectedColumn) {
          const adaptedForeignTableColumns = await getForeignTableColumns({
            foreignTableId: selectedColumn.foreignTableId,
          });
          setForeignTableColumns(adaptedForeignTableColumns);
        }
        setIsLoading(false);
      })();
    },
    [selectedReferenceColumnId],
  );

  return (
    <div className={className}>
      <Field
        isSmall={true}
        options={tableReferenceColumns}
        titleId="form.field.option.referenceColumn"
        css={FieldCSS}
        component={FormInputSelect as any}
        name="typeOptions.recordReferenceColumnId"
      />
      {selectedReferenceColumnId &&
        (isLoading ? (
          <Spinner size="small" strokeWidth="2px" />
        ) : (
          <Field
            isSmall={true}
            options={foreignTableColumns}
            titleId="form.field.option.foreignColumn"
            css={FieldCSS}
            component={FormInputSelect as any}
            name="typeOptions.foreignLookupColumnId"
          />
        ))}
    </div>
  );
};

const mapState = ({ core }: IRootState) => ({
  getAllGridColumns: core.gridApi.getAllGridColumns,
});

const mapDispatch = ({ core }: IDispatch) => ({
  getForeignTableColumns: core.getForeignTableColumns,
});

export default connect(
  mapState,
  mapDispatch,
)(FieldOptionLookup);
