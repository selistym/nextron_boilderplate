import styled, { css } from 'styled-components';

import { H3Mixin, H4Mixin } from '@app/renderer/components/Shared/Typescale';
import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div``;

export const TopContainer = styled.div`
  border-bottom: 1px solid ${COLORS.grayDisabled};
  width: 100%;
  padding-bottom: 30px;
  display: flex;
  align-items: center;
`;

export const FieldContainer = styled.div`
  max-height: calc(85vh - 200px);
  width: 100%;
  margin: 23px 0px;
  border-bottom: 1px solid ${COLORS.grayDisabled};
  overflow: auto;
`;

export const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h4`
  ${H4Mixin}
  flex: 1;
`;

export const TitleInputStyle = css`
  margin: 24px 0px;
`;

export const PreviewContainer = styled.div<{ color: string }>`
  align-items: center;
  background-color: ${(props) => props.color};
  border-radius: 16px;
  display: flex;
  height: 120px;
  justify-content: center;
  width: 120px;
`;

export const IconTitleStyle = styled.h3`
  ${H3Mixin}
  color: white;
`;

export const IconStyle = css`
  color: white;
`;

export const FieldStyle = css`
  margin: 40px 0px;
`;
