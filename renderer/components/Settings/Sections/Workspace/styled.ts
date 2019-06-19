import styled from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TopContainer = styled.div`
  border-bottom: 1px solid ${COLORS.grayDisabled};
  padding: 10px 0px;
  display: flex;
  align-items: center;
`;

export const WorkspaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 0px;
  max-height: 300px;
  overflow: auto;
`;
