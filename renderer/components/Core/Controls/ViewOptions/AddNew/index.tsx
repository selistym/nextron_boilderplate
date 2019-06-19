import React from 'react';
import { FormattedMessage } from 'react-intl';

// import IconTitle from '@app/renderer/components/Button/IconTitle';
// import { glyphs } from '@app/renderer/components/Icon';
// import { VIEW_TYPES } from '@app/renderer/constants/cores';

import ButtonGeneric from '@app/renderer/components/Button/Generic';
import { Container } from './styled';

interface IProps {
  onClickAdd: () => void;
}

const ViewOptionsAddNew = ({ onClickAdd }: IProps) => (
  <Container>
    <ButtonGeneric onClick={() => onClickAdd()}>
      <FormattedMessage id="dropdown.core.title.addNewView" />
    </ButtonGeneric>
    {/* <ButtonContainer>
      <IconTitle
        icon={glyphs.VIEW_GRID}
        titleId="view.option.grid"
        onClick={() => onClick({ name: 'Default Grid', type: VIEW_TYPES.GRID })}
        iconSize={{ width: 18, height: 18 }}
        css={BtnStyle}
      />
      <IconTitle
        icon={glyphs.VIEW_CALENDAR}
        titleId="view.option.timeline"
        onClick={() => onClick({ name: 'Default Timeline', type: VIEW_TYPES.TIMELINE })}
        iconSize={{ width: 18, height: 18 }}
        css={BtnStyle}
      />
    </ButtonContainer> */}
  </Container>
);

export default ViewOptionsAddNew;
