import React from 'react';
import { connect } from 'react-redux';

import { IRootState } from '@app/renderer/modules/store';

import { Color, Container, TitleMixin } from './styled';

type IConnectProps = ReturnType<typeof mapState>;

const TitleSection: React.FC<IConnectProps> = ({ activeWorkspace }) => {
  const { name } = activeWorkspace;
  return (
    <Container>
      <Color color="blue" />
      <h2 css={TitleMixin}>{name}</h2>
      {/* <ButtonIconTitle
        titleId="Edit"
        css={EditIconStyle}
        icon={glyphs.EDIT}
        iconSize={{ width: 20, height: 20 }}
        onClick={state.updateShowModal}
      /> */}
    </Container>
  );
};

const mapState = ({ settings: { activeWorkspace } }: IRootState) => ({
  activeWorkspace,
});

export default connect(mapState)(TitleSection);
