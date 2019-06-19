import styled, { css } from 'styled-components';

import { darkBtnMixin } from '@app/renderer/components/Shared';

export const Container = styled.div`
  background-color: white;
  display: flex;
  height: 50px;
  padding: 0 20px;
  justify-content: space-between;
`;

export const Section = styled.div`
  align-items: center;
  display: flex;
`;

export const ViewBtnStyle = css`
  margin-right: 30px;
  ${darkBtnMixin}
`;
