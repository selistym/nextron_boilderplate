import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { compose } from 'react-apollo';

import { CoreStore } from '@app/renderer/stores/core';

import IconTitle from '@app/renderer/components/Button/IconTitle';
import { glyphs } from '@app/renderer/components/Icon';
import ModalWrapper from '@app/renderer/components/Modal/Wrapper';
import { blueBtn } from '@app/renderer/components/Shared';
import FilterItem from '../Item';

import { BtnContainer, Container } from './styled';

interface IFilterModal {
  onClose: () => void;
  left: number;
  top: number;
  coreRootStore: CoreStore;
}

const FilterModal: React.FC<IFilterModal> = ({ onClose, left, top, coreRootStore }) => {
  const { viewConfig } = coreRootStore;

  return (
    <ModalWrapper isMaskTransparent={true} left={left} top={top} onClose={onClose}>
      <Container>
        {viewConfig.viewFilters.map((config, index) => (
          <FilterItem
            config={config}
            key={index}
            index={index}
            editFilter={viewConfig.editFilter}
            setFilters={viewConfig.setFilters}
            fieldOptions={viewConfig.fieldOptions}
            removeFilter={viewConfig.removeFilter}
            filterOptionsByIndex={viewConfig.filterOptionsByIndex}
          />
        ))}
        <BtnContainer>
          <IconTitle
            onClick={() => viewConfig.addFilter()}
            css={blueBtn}
            titleId="view.config.cta.addFilter"
            icon={glyphs.PLUS}
            iconSize={{ width: 15, height: 15 }}
          />
        </BtnContainer>
      </Container>
    </ModalWrapper>
  );
};

export default compose(
  inject('coreRootStore'),
  observer,
)(FilterModal);
