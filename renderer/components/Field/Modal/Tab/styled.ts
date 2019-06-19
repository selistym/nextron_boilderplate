import styled from 'styled-components';

import { textEllipsisMixin, textSharedMixin } from '@app/renderer/components/Shared/index';
import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TabsHeader = styled.div`
  padding: 0px 15px;
  display: flex;
  align-items: center;
`;

export const Tab = styled.div<{ isSelected: boolean; isSmall: boolean }>`
  background-color: ${(props) => (props.isSelected ? COLORS.grayBackground : COLORS.white)};
  cursor: pointer;
  max-width: 200px;
  margin-right: 10px;
  padding: 5px;

  ${textSharedMixin}
  ${textEllipsisMixin}
`;

export const Content = styled.div`
  background-color: ${COLORS.grayBackground};
`;
