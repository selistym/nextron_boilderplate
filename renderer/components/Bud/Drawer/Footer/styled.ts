import styled from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  border-top: 1px solid ${COLORS.grayDisabled};
  display: flex;
  padding-top: 20px;
  justify-content: space-between;
`;
