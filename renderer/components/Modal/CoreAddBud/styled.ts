import styled from 'styled-components';

import { COLORS } from '@app/theme/color';

export const Container = styled.div`
  display: flex;
  background-color: ${COLORS.white};
  border-radius: 8px;
  flex-direction: column;
  padding: 40px;
  overflow: auto;

  max-height: 785px;
  height: 500px;
  width: 400px;
`;

export const HeaderContainer = styled.div`
  border-bottom: 1px solid ${COLORS.grayDisabled};
  display: flex;
  padding-bottom: 20px;
  justify-content: space-between;
`;
