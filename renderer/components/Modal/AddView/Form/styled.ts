import styled, { css } from 'styled-components';

import { COLORS } from '@app/theme/color';

import { modalContainerMixin } from '@app/components/Shared';
import { H4Mixin, Span2Mixin } from '@app/components/Shared/Typescale';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px);
  padding: 40px;
  width: 656px;

  ${modalContainerMixin}
`;

export const TopContainer = styled.div`
  align-items: center;
  border-bottom: 1px solid ${COLORS.grayDisabled};
  display: flex;
  padding-bottom: 30px;
  margin-bottom: 40px;
`;

export const Content = styled.div`
  flex: 1;
  overflow: auto;
`;

export const Collaborator = styled.div`
  border-top: 1px solid ${COLORS.grayDisabled};
  border-bottom: 1px solid ${COLORS.grayDisabled};
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  padding: 40px 0;
`;

export const CollaboratorTitle = styled.div`
  margin-bottom: 20px;

  ${H4Mixin}
`;

export const BottomContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const Title = styled.h4`
  flex: 1;
  margin-right: 10px;

  ${H4Mixin}
`;

export const FormInputSwitchMixin = css`
  width: 200px;
  margin-bottom: 20px;
`;

export const GlobalFilter = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding-top: 20px;
`;

export const GlobalFilterTitle = styled.span`
  color: ${COLORS.grayText};
  font-size: 16px;
  margin-bottom: 12px;
`;

export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
`;

export const DateOptionMixin = css`
  width: calc(50% - 10px);
`;

export const DateWarning = styled.span`
  ${Span2Mixin};
  display: block;
  margin-top: 15px;
  width: 500px;
`;
