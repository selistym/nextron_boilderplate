import { RouterProps } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import ButtonLinkIcon from '@app/renderer/components/Button/LinkIcon';
import { glyphs } from '@app/renderer/components/Icon';

import { IRootState } from '@app/renderer/modules/store';

import { COLORS } from '@app/renderer/theme/color';

import { isLightTheme } from '@app/renderer/utils/core';

import { Container, H2, LeftSection, MidSection, RightSection } from './styled';

interface IProps {
  name: string;
  color: string;
  router: RouterProps;
}

const CoreHeader: React.FC<IProps> = () => {
  const core = useSelector((state: IRootState) => state.core.activeCore);
  const workspaceId = useSelector((state: IRootState) => state.core.activeIds.workspaceId);

  return (
    <Container>
      <LeftSection>
        <ButtonLinkIcon
          iconProps={{
            size: { height: 40, width: 40 },
            icon: isLightTheme(core.color) ? glyphs.LOGO_WHITEBACK : glyphs.LOGO_REVERSE,
          }}
          href={`/cores/${workspaceId}`}
        />
      </LeftSection>
      <MidSection>
        <H2
          css={`
            color: ${isLightTheme(core.color) ? COLORS.grayText : COLORS.white};
          `}
        >
          {core.name}
        </H2>
      </MidSection>
      <RightSection />
    </Container>
  );
};

export default CoreHeader;
