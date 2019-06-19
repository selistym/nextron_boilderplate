import { get } from 'lodash';
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import Dropdown from '@app/renderer/components/Dropdown';
import Icon, { glyphs } from '@app/renderer/components/Icon';
import { Span2Mixin } from '@app/renderer/components/Shared/Typescale';
import { VIEW_TYPES } from '@app/renderer/constants/cores';
import { TIME_DROPDOWN_OPTIONS } from '@app/renderer/constants/timeline';

import { IDispatch, IRootState } from '@app/renderer/modules/store';

import { BtnStyle, DropdownStyle } from './styled';

type IConnectProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const ControlsTimeMeasure: React.FC<IConnectProps> = ({
  viewType,
  changeTimeMeasure,
  timeMeasure,
}) => {
  if (viewType !== VIEW_TYPES.TIMELINE) return null;
  const positionRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState();

  return (
    <div ref={positionRef}>
      <BtnStyle onClick={() => setIsDropdownOpen(true)}>
        <span css={Span2Mixin}>{timeMeasure.charAt(0).toUpperCase() + timeMeasure.slice(1)}</span>
        <Icon size={{ width: 10, height: 10 }} icon={glyphs.ARROW_DROPDOWN} />
      </BtnStyle>
      {isDropdownOpen && (
        <Dropdown
          options={TIME_DROPDOWN_OPTIONS}
          onClick={({ id }) => {
            changeTimeMeasure(id);
            setIsDropdownOpen(false);
          }}
          css={DropdownStyle}
          onClose={() => setIsDropdownOpen(false)}
          left={positionRef.current ? positionRef.current.getBoundingClientRect().left - 60 : 0}
          top={positionRef.current ? positionRef.current.getBoundingClientRect().bottom : 0}
        />
      )}
    </div>
  );
};

const mapState = ({ core }: IRootState) => ({
  viewType: get(core, `viewOptions.byId.${get(core, 'activeIds.viewId')}.type`),
  timeMeasure: get(core, `controls.timeMeasure`),
});

const mapDispatch = ({ core }: IDispatch) => ({
  changeTimeMeasure: (measure: string) => core.changeTimeMeasure(measure),
});

export default connect(
  mapState,
  mapDispatch,
)(ControlsTimeMeasure);
