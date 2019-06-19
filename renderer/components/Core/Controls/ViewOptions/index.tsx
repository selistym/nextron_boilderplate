import React, { useRef } from 'react';
import { connect } from 'react-redux';

import IconTitle from '@app/renderer/components/Button/IconTitle';
import { glyphs } from '@app/renderer/components/Icon';
import { ThrowModalType } from '@app/renderer/constants/modals';

import { IDispatch, IRootState } from '@app/renderer/modules/store';
import { ViewBtnStyle } from './styled';

type IConnectProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const ViewOptions: React.FC<IConnectProps> = ({ addThrowModal, viewId, viewOptionsById }) => {
  const posRef = useRef(null);

  if (!viewId) return null;

  return (
    <div ref={posRef}>
      <IconTitle
        icon={glyphs.VIEW_GRID}
        title={viewOptionsById[viewId].name}
        onClick={() =>
          addThrowModal({
            type: ThrowModalType.ViewOptions,
            parentSize: posRef && posRef.current && posRef.current.getBoundingClientRect(),
          })
        }
        iconSize={{ width: 18, height: 18 }}
        css={ViewBtnStyle}
      />
    </div>
  );
};

const mapState = (state: IRootState) => ({
  viewId: state.core.activeIds.viewId,
  viewOptionsById: state.core.viewOptions.byId,
});

const mapDispatch = ({ app }: IDispatch) => ({
  addThrowModal: (payload: any) => app.addThrowModal(payload),
});

export default connect(
  mapState,
  mapDispatch,
)(ViewOptions);
