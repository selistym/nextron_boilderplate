import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import TabSectionTab from './Tab';

import ButtonGeneric from '@app/renderer/components/Button/Generic';
import ButtonIcon from '@app/renderer/components/Button/Icon';
import { glyphs } from '@app/renderer/components/Icon';
import { CORE_COLORS } from '@app/renderer/constants/cores';

import { IDispatch, IRootState } from '@app/renderer/modules/store';

import { isLightTheme } from '@app/renderer/utils/core';
import {
  actionBtnMixin,
  ActionButtons,
  addTableBtnMixin,
  Container,
  FadeTabRight,
  FakeBorder,
  TabsContainer,
} from './styled';

type IConnectProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const CoreTabSection: React.FC<IConnectProps> = ({
  core,
  tableOptionsById,
  activeIds,
  addTable,
  openCoreBud,
}) => {
  const isLight = isLightTheme(core.color);

  return (
    <Container>
      <FakeBorder />
      <TabsContainer>
        {core.tableOptionsAllIds.map((tableId: string, index: number) => (
          <TabSectionTab
            activeIds={activeIds}
            colorCode={CORE_COLORS[core.color]}
            isLastTab={index === core.tableOptionsAllIds.length - 1}
            isFirstTab={index === 0}
            isLight={isLight}
            key={tableId}
            tableOption={tableOptionsById[tableId]}
          />
        ))}
        <ButtonIcon
          onClick={addTable}
          css={addTableBtnMixin}
          isLight={isLight}
          iconProps={{ size: { width: 15, height: 15 }, icon: glyphs.PLUS }}
        />
      </TabsContainer>

      <ActionButtons>
        <FadeTabRight color={CORE_COLORS[core.color]} />
        <ButtonGeneric onClick={openCoreBud} isLight={isLight} css={actionBtnMixin}>
          <FormattedMessage id="global.buds" />
        </ButtonGeneric>
      </ActionButtons>
    </Container>
  );
};

const mapState = (state: IRootState) => ({
  core: state.core.activeCore,
  tableOptionsById: state.core.tableOptions.byId,
  activeIds: state.core.activeIds,
});

const mapDispatch = ({ core, coreBuds }: IDispatch) => ({
  addTable: () => core.addTable(null),
  openCoreBud: () => coreBuds.setIsDrawerOpen(true),
});

export default connect(
  mapState,
  mapDispatch,
)(CoreTabSection);
