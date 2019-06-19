import React, { useState } from 'react';
import { connect } from 'react-redux';

import StackWrapper, { IStackModal } from '@app/renderer/components/Modal/StackWrapper';
import { IMAGE_TYPES } from '@app/renderer/constants/fileTypes';

import ButtonIcon from '@app/renderer/components/Button/Icon';
import { glyphs } from '@app/renderer/components/Icon';

import { IDispatch } from '@app/renderer/modules/store';

import {
  CancelIcon,
  Content,
  IFrame,
  LeftArrow,
  RightArrow,
  StackModalMixin,
  Title,
} from './styled';

type IConnectProps = ReturnType<typeof mapDispatch>;

interface IAttachment {
  url: string;
  name: string;
}

interface IProps extends IStackModal, IConnectProps {
  attachments: IAttachment[];
  onExit: () => void;
  defaultIndex: number;
}

const AttachmentPreviewModal = ({
  attachments,
  onExit,
  defaultIndex,
  modalIndex,
  suppressFocusTrap,
  removeStackModal,
}: IProps) => {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const { url, name } = attachments[currentIndex];
  return (
    <StackWrapper
      suppressFocusTrap={suppressFocusTrap}
      css={StackModalMixin}
      onClose={onExit}
      modalIndex={modalIndex}
    >
      <>
        <Title>{name}</Title>
        <ButtonIcon
          iconProps={{ size: { height: 15, width: 15 }, icon: glyphs.REMOVE }}
          css={CancelIcon}
          onClick={removeStackModal}
        />
        <Content onClick={removeStackModal} onKeyDown={removeStackModal} role="button" tabIndex={0}>
          {IMAGE_TYPES.includes(name.split('.').pop()!) ? (
            <img alt={name} src={url} />
          ) : (
            <IFrame
              src={`https://cdn.filestackcontent.com/preview/${'c2ZYYTCnQJmPFt8ZMP1w'}`} // use fileId in the future
              title="attachmentModalIFrame"
            />
          )}
        </Content>
        {currentIndex !== 0 && (
          <ButtonIcon
            css={LeftArrow}
            iconProps={{ size: { height: 64, width: 64 }, icon: glyphs.ARROW_LEFT }}
            onClick={() => setCurrentIndex(currentIndex - 1)}
          />
        )}
        {currentIndex !== attachments.length - 1 && (
          <ButtonIcon
            css={RightArrow}
            iconProps={{ size: { height: 64, width: 64 }, icon: glyphs.ARROW_RIGHT }}
            onClick={() => setCurrentIndex(currentIndex + 1)}
          />
        )}
      </>
    </StackWrapper>
  );
};

const mapDispatch = ({ app }: IDispatch) => ({
  removeStackModal: () => app.removeStackModal(),
});

export default connect(
  undefined,
  mapDispatch,
)(AttachmentPreviewModal);
