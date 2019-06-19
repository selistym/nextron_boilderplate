import styled from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  border-bottom: 1px solid ${COLORS.grayDisabled};
  display: flex;
  padding-bottom: 20px;
  margin-bottom: 20px;
  justify-content: space-between;
`;
