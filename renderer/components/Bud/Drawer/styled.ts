import styled, { css } from 'styled-components';

export const drawerMixin = css`
  display: flex;
  flex-direction: column;
  padding: 40px 40px 20px 40px;
`;

export const ContentContainer = styled.div`
  flex: 1;
  overflow: scroll;
`;

export const SpinnerWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;
