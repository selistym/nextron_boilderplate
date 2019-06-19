import styled from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

import { modalContainerMixin } from '@app/renderer/components/Shared';
import { H4Mixin } from '@app/renderer/components/Shared/Typescale';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 200px);
  padding: 40px;
  width: 656px;

  ${modalContainerMixin}
`;

export const TopContainer = styled.div`
  align-items: center;
  border-bottom: 1px solid ${COLORS.grayDisabled};
  display: flex;
  padding-bottom: 30px;
`;

export const Content = styled.div`
  overflow: auto;
`;

export const BottomContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const Title = styled.h4`
  flex: 1;
  margin-right: 10px;

  ${H4Mixin}
`;
