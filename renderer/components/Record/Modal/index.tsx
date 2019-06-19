import React, { useCallback, useEffect, useState } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Button from '@app/renderer/components/Button';
import ButtonIcon from '@app/renderer/components/Button/Icon';
import { glyphs } from '@app/renderer/components/Icon';
import Spinner from '@app/renderer/components/Loading/Spinner';
import StackWrapper, { IStackModal } from '@app/renderer/components/Modal/StackWrapper';
import { H4Mixin } from '@app/renderer/components/Shared/Typescale';

import { IDispatch, IRootState } from '@app/renderer/modules/store';

import { submitRecord } from '@app/renderer/utils/record';

import { IRecordProps } from '../index';

type IConnectProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

import RecordModalForm from './Form';
import { Content, ContentBody, ContentFooter, ContentHeader, SpinnerContainer } from './styled';

interface IRecordModal extends IConnectProps, IStackModal {
  onClose: () => void;
  coreId: string;
  tableId: string;
  rowId?: string;
  initialRecord?: IRecordProps;
}

const RecordModal: React.FC<IRecordModal> = ({
  onClose,
  getTableRecord,
  workspaceId,
  coreId,
  tableId,
  rowId,
  modalIndex,
  updateCell,
  removeStackModal,
  suppressFocusTrap,
  addRow,
  initialRecord,
}) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [record, setRecord] = useState<IRecordProps | undefined>(
    initialRecord || { title: '', rowId: rowId || '', cells: [] },
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleSideBar = useCallback(() => setShowSideBar(!showSideBar), [showSideBar]);

  useEffect(
    () => {
      (async () => {
        if (rowId) {
          setIsLoading(true);
          const adaptedRecord = await getTableRecord({
            workspaceId,
            coreId,
            tableId,
            rowId,
          });
          if (adaptedRecord) {
            setRecord(adaptedRecord as any);
          }
          setIsLoading(false);
        }
      })();
    },
    [rowId],
  );

  const { title, cells } = record;

  const initialValues: { [key: string]: any } = cells.reduce(
    (obj: { [key: string]: any }, cell) => {
      const { columnId, value, type } = cell;
      let cellValue = value;
      if (type === 'RECORD_REFERENCE') {
        cellValue = cellValue ? cellValue.map((item: any) => item.foreignRowId) : [];
      }
      obj[columnId] = cellValue;
      return obj;
    },
    {},
  );

  const handleSubmitForm = useCallback(
    async (values: any) => {
      let newRowId = rowId;
      if (!rowId) {
        const addRowResponse = await addRow();
        newRowId = addRowResponse.id;
      }
      cells.forEach((cell) => {
        submitRecord({
          cell,
          initialValues,
          values,
          updateCell,
          removeStackModal,
          rowId: newRowId,
        });
      });
    },
    [cells],
  );

  return (
    <StackWrapper suppressFocusTrap={suppressFocusTrap} onClose={onClose} modalIndex={modalIndex}>
      <Content>
        {isLoading ? (
          <SpinnerContainer tabIndex={0}>
            <Spinner size="small" strokeWidth="2px" />
          </SpinnerContainer>
        ) : (
          <>
            <ContentHeader>
              <h4 css={H4Mixin}>{title || 'Unnamed record'}</h4>
              <ButtonIcon
                onClick={handleToggleSideBar}
                iconProps={{ icon: glyphs.EXPAND, size: { height: 18, width: 16 } }}
              />
            </ContentHeader>
            <Form initialValues={initialValues} onSubmit={handleSubmitForm}>
              {({ handleSubmit }: FormRenderProps) => (
                <>
                  <ContentBody>
                    <RecordModalForm cells={cells} onSubmit={handleSubmit} />
                  </ContentBody>
                  <ContentFooter>
                    <Button
                      width={180}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      <FormattedMessage id="global.save" />
                    </Button>
                  </ContentFooter>
                </>
              )}
            </Form>
          </>
        )}
      </Content>
    </StackWrapper>
  );
};

const mapState = ({ core }: IRootState, { workspaceId }) => ({
  workspaceId: workspaceId || core.activeIds.workspaceId,
});

const mapDispatch = ({ app, core }: IDispatch) => ({
  getTableRecord: (payload: any) => core.getTableRecord(payload),
  updateCell: (payload: any) => core.updateCell(payload),
  addRow: () => core.addRowAtIndex({}),
  removeStackModal: () => app.removeStackModal(),
});

export default connect(
  mapState,
  mapDispatch,
)(RecordModal);
