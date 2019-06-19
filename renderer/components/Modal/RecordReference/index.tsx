import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Spinner from '@app/renderer/components/Loading/Spinner';
import ThrowWrapper, { IParentModal } from '@app/renderer/components/Modal/ThrowWrapper';
import { IRecordProps } from '@app/renderer/components/Record';
import RecordSummary from '@app/renderer/components/Record/Summary';

import { KEY_CODES } from '@app/renderer/constants/app';

import { IDispatch, IRootState } from '@app/renderer/modules/store';

import { Container, Empty, SpinnerOrEmptyContaienr } from './styled';

type IConnectProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & IParentModal;

export interface IModalRecordReference extends IConnectProps {
  className?: string;
  tableId: string;
  selectedRowIds?: string[];
  onClickRecord: (record: IRecordProps) => void;
  onClose: () => void;
}

const ModalRecordReference: React.FC<IModalRecordReference> = ({
  coreId,
  workspaceId,
  tableId,
  className,
  parentSize,
  offset,
  onClickRecord,
  onClose,
  selectedRowIds,
  getTableRecords,
  suppressFocusTrap,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const adaptedRecords = await getTableRecords({
        workspaceId,
        coreId,
        tableId,
        selectedRowIds,
        filterSelectedRowIds: true,
      });
      if (adaptedRecords && adaptedRecords.length > 0) setSelectedIndex(0);
      setRecords(adaptedRecords as any);
      setIsLoading(false);
    })();
  }, []);

  const handleClickRecord = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      onClickRecord(records[selectedIndex]);
    },
    [selectedIndex, records],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.keyCode) {
        case KEY_CODES.ENTER: {
          if (selectedIndex < 0) return;
          handleClickRecord(e);
          break;
        }
        case KEY_CODES.ARROW_UP: {
          e.preventDefault();
          const newIndex = Math.max(0, selectedIndex - 1);
          setSelectedIndex(newIndex);
          break;
        }
        case KEY_CODES.ARROW_DOWN: {
          e.preventDefault();
          const newIndex = Math.min(records.length - 1, selectedIndex + 1);
          setSelectedIndex(newIndex);
          break;
        }
        case KEY_CODES.ESC: {
          e.preventDefault();
          onClose();
          break;
        }
        default:
          break;
      }
    },
    [selectedIndex, records],
  );

  return (
    <ThrowWrapper
      offset={offset}
      parentSize={parentSize}
      avoidCollision={true}
      avoidElementVert={true}
      onClose={onClose}
      suppressFocusTrap={suppressFocusTrap}
    >
      <Container tabIndex={0} onKeyDown={handleKeyDown} className={className}>
        {isLoading ? (
          <SpinnerOrEmptyContaienr>
            <Spinner size="small" strokeWidth="2px" />
          </SpinnerOrEmptyContaienr>
        ) : (
          <>
            {records && records.length > 0 ? (
              records.map((record, index) => (
                <RecordSummary
                  key={index}
                  onClickOption={onClickRecord}
                  record={record}
                  isSelected={selectedIndex === index}
                />
              ))
            ) : (
              <SpinnerOrEmptyContaienr>
                <Empty>No Record</Empty>
              </SpinnerOrEmptyContaienr>
            )}
          </>
        )}
      </Container>
    </ThrowWrapper>
  );
};

const mapState = ({ core }: IRootState) => ({
  workspaceId: core.activeIds.workspaceId,
  coreId: core.activeIds.coreId,
});

const mapDispatch = ({ core }: IDispatch) => ({
  getTableRecords: (payload: any) => core.getTableRecords(payload),
});

export default connect(
  mapState,
  mapDispatch,
)(ModalRecordReference);
