import React, { useCallback, useEffect, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { connect } from 'react-redux';

import ButtonIconTitle from '@app/renderer/components/Button/IconTitle';
import Spinner from '@app/renderer/components/Loading/Spinner';
import { IRecordProps, ITypeComponent } from '@app/renderer/components/Record';
import RecordSummary from '@app/renderer/components/Record/Summary';

import { StackModalType, ThrowModalType } from '@app/renderer/constants/modals';

import { IDispatch, IRootState } from '@app/renderer/modules/store';

import { ItemContainer, SpinnerContainer, TopContainer } from './styled';

type IConnectProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

// TODO: We need to use coreId in cell typeOptions in the future.
const RecordReferenceForm: React.FC<
  IConnectProps & ITypeComponent & FieldRenderProps<HTMLElement>
> = ({
  className,
  cell,
  getTableRecords,
  addThrowModal,
  addStackModal,
  removeThrowModal,
  workspaceId,
  coreId,
  isDisabled,
  input: { value, onChange },
}) => {
  const [records, setRecords] = useState<IRecordProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    typeOptions: { foreignTableId },
  } = cell;

  useEffect(() => {
    (async () => {
      if (foreignTableId) {
        setIsLoading(true);
        const adaptedRecords = await getTableRecords({
          workspaceId,
          coreId,
          selectedRowIds: value,
          tableId: foreignTableId,
        });
        setRecords(adaptedRecords as any);
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(
    () => {
      onChange(records.map((record) => record.rowId) as any);
    },
    [records],
  );

  const handleAdd = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      addThrowModal({
        type: ThrowModalType.RecordReference,
        props: {
          selectedRowIds: value,
          tableId: foreignTableId,
          onClickRecord: (option: IRecordProps) => {
            setRecords((prevRecords) => prevRecords.concat([option]));
            removeThrowModal();
          },
          offset: { left: -100, top: -50 },
          onClose: removeThrowModal,
        },
      });
    },
    [value, foreignTableId, records],
  );

  // NOTE: If we want to update reference data(records here), we need use updater function
  const handleRemove = useCallback(
    (option: IRecordProps) => {
      setRecords((prevRecords) => prevRecords.filter((record) => record.rowId !== option.rowId));
    },
    [records],
  );

  const handleClickOption = useCallback(
    (option: IRecordProps) => {
      addStackModal({
        type: StackModalType.Record,
        props: {
          coreId,
          tableId: foreignTableId,
          rowId: option.rowId,
          offset: { left: 10, top: 10 },
        },
      });
    },
    [foreignTableId],
  );

  return (
    <div className={className}>
      {!isDisabled && (
        <TopContainer>
          <ButtonIconTitle titleId="form.record.reference.add" onClick={handleAdd} />
        </TopContainer>
      )}
      <ItemContainer>
        {isLoading ? (
          <SpinnerContainer>
            <Spinner size="small" strokeWidth="2px" />
          </SpinnerContainer>
        ) : (
          records.map((record, index) => (
            <RecordSummary
              key={isDisabled ? index : record.rowId}
              onClickOption={handleClickOption}
              // onDeleteOption={handleRemove}
              record={record}
            />
          ))
        )}
      </ItemContainer>
    </div>
  );
};

const mapState = ({ core }: IRootState) => ({
  workspaceId: core.activeIds.workspaceId,
  coreId: core.activeIds.coreId,
});

const mapDispatch = ({ core, app }: IDispatch) => ({
  getTableRecords: (payload: any) => core.getTableRecords(payload),
  addThrowModal: (payload: any) => app.addThrowModal(payload),
  addStackModal: (payload: any) => app.addStackModal(payload),
  removeThrowModal: () => app.removeThrowModal(),
});

export default connect(
  mapState,
  mapDispatch,
)(RecordReferenceForm);
