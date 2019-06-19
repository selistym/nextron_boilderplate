import styled, { css } from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
  padding: 5px;
  position: relative;
`;
export const FocusContainer = styled.div`
  display: flex;
  height: 100%;
`;
export const AddButtonMixin = css`
  background-color: ${COLORS.blueLight};
  width: 24px;
  height: 100%;
  border-radius: 4px;
  color: ${COLORS.white};
  flex: 0 0 24px;
  margin-right: 4px;
  &:focus,
  &:active,
  &:hover {
    color: ${COLORS.white};
  }
`;
export const AttachmentContainer = styled.button`
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${COLORS.grayDisabled};
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex: 0 0 auto;
  height: 100%;
  justify-content: center;
  margin-right: 4px;
  outline: none;
  overflow: hidden;
  width: auto;
  &:hover {
    border-color: ${COLORS.purple};
  }
`;
export const Attachment = styled.img`
  height: 100%;
  min-width: 20px;
`;
