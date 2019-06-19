import { observer, useObservable } from 'mobx-react-lite';
import React, { useRef } from 'react';

import IconTitle from '@app/renderer/components/Button/IconTitle';
import { glyphs } from '@app/renderer/components/Icon';
import FilterModal from './Modal';

import { ViewBtnStyle } from './styled';

const Filter: React.FC = () => {
  const positionRef = useRef(null);

  const state = useObservable({
    shouldShowModal: false,
    setShouldShowModal(shouldShow: boolean) {
      state.shouldShowModal = shouldShow;
    },
  });

  return (
    <div ref={positionRef}>
      <IconTitle
        icon={glyphs.FILTER}
        titleId="view.config.title.filter"
        onClick={() => state.setShouldShowModal(true)}
        iconSize={{ width: 16, height: 10 }}
        css={ViewBtnStyle}
      />
      {state.shouldShowModal && (
        <FilterModal
          left={positionRef.current ? positionRef.current.getBoundingClientRect().left : 0}
          top={positionRef.current ? positionRef.current.getBoundingClientRect().top + 20 : 0}
          onClose={() => state.setShouldShowModal(false)}
        />
      )}
    </div>
  );
};

export default observer(Filter);
