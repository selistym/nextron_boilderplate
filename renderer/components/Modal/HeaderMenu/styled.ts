import styled, { css } from 'styled-components';

import { textEllipsisMixin } from '@app/renderer/components/Shared';
import { Span1Mixin } from '@app/renderer/components/Shared/Typescale';
import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.grayDisabled};
  border-radius: 8px;
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.2);
  width: 215px;
`;

export const AccountContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding-top: 16px;
  width: 100%;
`;

export const AccountNameStyle = css`
  ${textEllipsisMixin};
`;

export const MiddleContainer = styled.div`
  align-items: flex-start;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 100%;
`;

export const WorkspaceContainer = styled.div`
  border-top: 1px solid ${COLORS.grayDisabled};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow: auto;
  padding: 16px 0;
  width: 100%;
`;

export const NavLink = styled.span`
  ${Span1Mixin}
  
  color: ${COLORS.grayText};
  cursor: pointer;
  margin-bottom: 8px;
  outline: none;
`;
