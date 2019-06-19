import React, { useCallback, useRef } from 'react';
import { connect } from 'react-redux';

import IconTitle from '@app/renderer/components/Button/IconTitle';
import { glyphs } from '@app/renderer/components/Icon';

import { ThrowModalType } from '@app/renderer/constants/modals';
import { IDispatch } from '@app/renderer/modules/store';

import { HideColumnButtonMixin } from './styled';

type IConnectProps = ReturnType<typeof mapDispatch>;

const HideColumn: React.FC<IConnectProps> = ({ addThrowModal }) => {
  const positionRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    addThrowModal({
      type: ThrowModalType.HideColumn,
      parentSize: positionRef.current && positionRef.current.getBoundingClientRect(),
    });
  }, []);

  return (
    <div ref={positionRef}>
      <IconTitle
        icon={glyphs.HIDE_COLUMN}
        titleId="view.config.title.hideColumn"
        onClick={handleClick}
        iconSize={{ width: 18, height: 18 }}
        css={HideColumnButtonMixin}
      />
    </div>
  );
};

const mapDispatch = ({ app }: IDispatch) => ({
  addThrowModal: (payload: any) => app.addThrowModal(payload),
});

export default connect(
  undefined,
  mapDispatch,
)(HideColumn);
