import styled from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  align-items: center;
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid ${COLORS.grayDisabled};
  justify-content: space-between;
`;
