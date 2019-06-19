import styled from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';
import { MISC } from '@app/renderer/theme/misc';

import { modalContainerMixin } from '@app/renderer/components/Shared';

export const Content = styled.div`
  border-radius: ${MISC.modalRadius};
  background-color: white;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px);
  padding: 0px 40px;
  width: 520px;
  position: relative;

  ${modalContainerMixin}
`;

export const ContentHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 90px;
  width: 100%;
`;

export const ContentBody = styled.div`
  flex: 1;
  overflow: scroll;
`;

export const ContentFooter = styled.div`
  align-items: center;
  border-top: 1px solid ${COLORS.grayBorder};
  display: flex;
  justify-content: flex-end;
  padding: 20px 0 40px;
`;

export const SideBar = styled.div``;

export const SpinnerContainer = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  top: 0;
  right: 0;
  outline: none;
  position: absolute;
`;
