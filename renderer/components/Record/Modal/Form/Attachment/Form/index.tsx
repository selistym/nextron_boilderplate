import React, { useCallback, useState } from 'react';
import Dropzone from 'react-dropzone';
import { FieldRenderProps } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { glyphs } from '@app/renderer/components/Icon';
import Spinner from '@app/renderer/components/Loading/Spinner';
import { ITypeComponent } from '@app/renderer/components/Record';

import { StackModalType } from '@app/renderer/constants/modals';
import { openPicker, upload } from '@app/renderer/lib/filestack';
import { IAdaptedAttachment, IFile } from '@app/renderer/types';

import { IDispatch, IRootState } from '@app/renderer/modules/store';

import ButtonIconTitle from '@app/renderer/components/Button/IconTitle';
import {
  BottomContainer,
  Container,
  DropContainer,
  Empty,
  EmptyIcon,
  EmptyTitle,
  FileItemContainer,
  ImgBox,
  StyledTitle,
  TopContainer,
} from './styled';

type IConnectProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  FieldRenderProps<HTMLElement> &
  ITypeComponent;

const ColumnTypeAttachment: React.FC<IConnectProps> = ({
  activeIds: { workspaceId, coreId, tableId },
  addStackModal,
  className,
  input: { value, onChange },
  isDisabled,
  setFocusTrap,
}) => {
  const [showSpinner, setSpinnerStatus] = useState(false);

  const hasContent = !!(value && value.length > 0);

  const handleOpenPicker = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      setFocusTrap(false);
      openPicker()
        .then((data) => {
          const oldValue = value || [];
          onChange(oldValue.concat([{ url: data.smallThumbUrl, name: data.fileName }]) as any);
          setSpinnerStatus(false);
        })
        .catch((error) => {
          // tslint:disable-next-line: no-console
          console.log(error.message);
        });
    },
    [value],
  );

  const handleChange = useCallback(
    (files: IFile[]) => {
      const file = files[0];
      if (!file) return;

      upload({
        file,
        option: { location: 's3', path: `${workspaceId}/${coreId}/${tableId}/${file.name}` },
        onSuccess: (data) => {
          const oldValue = value || [];
          onChange(oldValue.concat([{ url: data.smallThumbUrl, name: data.fileName }]) as any);
          setSpinnerStatus(false);
        },
        onError: (error) => {
          // tslint:disable-next-line: no-console
          console.log(error);
          setSpinnerStatus(false);
        },
      });

      setSpinnerStatus(true);
    },
    [value],
  );

  const handleClickOption = useCallback(
    (e: React.SyntheticEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const index = e.currentTarget.dataset.index;
      if (!index) return;
      addStackModal({
        type: StackModalType.Preview,
        props: {
          attachments: value || [],
          defaultIndex: parseInt(index, 10),
        },
      });
    },
    [value],
  );

  return (
    <Dropzone onDrop={handleChange}>
      {({ getRootProps, isDragActive }) => (
        <Container {...getRootProps()} className={className}>
          {isDragActive && (
            <DropContainer>
              <FormattedMessage id="form.record.title.dropFileHere" />
            </DropContainer>
          )}

          {!isDisabled && (
            <TopContainer>
              <ButtonIconTitle titleId="global.attachFile" onClick={handleOpenPicker} />
              {showSpinner && <Spinner size="small" strokeWidth="2px" />}
            </TopContainer>
          )}

          <BottomContainer>
            {hasContent ? (
              value.map((item: IAdaptedAttachment, index: number) => (
                <FileItemContainer key={item.url}>
                  <ImgBox
                    data-index={index}
                    onClick={handleClickOption}
                    css={`
                      background-image: url(${item.url});
                    `}
                  />
                  <StyledTitle>{item.name}</StyledTitle>
                </FileItemContainer>
              ))
            ) : (
              <Empty>
                <EmptyIcon size={{ height: 16, width: 16 }} icon={glyphs.ATTACHMENT_EMPTY} />
                <EmptyTitle>
                  <FormattedMessage id="form.record.title.dropFileHere" />
                </EmptyTitle>
              </Empty>
            )}
          </BottomContainer>
        </Container>
      )}
    </Dropzone>
  );
};

const mapState = ({ core }: IRootState) => ({
  activeIds: core.activeIds,
});

const mapDispatch = ({ app }: IDispatch) => ({
  addStackModal: (payload: any) => app.addStackModal(payload),
  setFocusTrap: (focusTrap: boolean) => app.setFocusTrap(focusTrap),
});

export default connect(
  mapState,
  mapDispatch,
)(ColumnTypeAttachment);
