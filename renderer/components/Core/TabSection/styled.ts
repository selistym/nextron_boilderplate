import styled, { css } from 'styled-components';

import { darkBtnMixin, whiteBtnMixin } from '@app/renderer/components/Shared';
import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  align-items: center;
  display: flex;
  padding: 0 35px;
  position: relative;
`;

export const FakeBorder = styled.div`
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 34px;
  border-bottom: 1px solid ${COLORS.grayFadedBorder};
  z-index: 3;
`;

export const TabsContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: scroll;
`;

export const addTableBtnMixin = css<{ isLight: boolean }>`
  padding-right: 15px;

  ${(props) => (props.isLight ? darkBtnMixin : whiteBtnMixin)}
`;

export const FadeTabRight = styled.div<{ color: string }>`
  position: absolute;
  top: 0;
  bottom: 1px;
  left: -15px;
  background-image: ${(props) => `linear-gradient(to right, transparent, ${props.color})`};
  width: 15px;
  z-index: 5;
`;

export const ActionButtons = styled.div`
  display: flex;
  height: 35px;
  position: relative;
`;

export const actionBtnMixin = css<{ isLight: boolean }>`
  margin-left: 15px;

  ${(props) => (props.isLight ? darkBtnMixin : whiteBtnMixin)}
`;
