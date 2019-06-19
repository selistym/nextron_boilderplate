import styled from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  align-items: center;
  border-bottom: 1px solid ${COLORS.grayFadedBorder};
  display: flex;
  margin-bottom: 40px;
`;

export const NavLink = styled.a<{ isActive: boolean }>`
  color: ${COLORS.grayText};
  cursor: pointer;
  line-height: 50px;
  margin-right: 40px;
  position: relative;

  &:after {
    content: '';
    border-bottom: ${(props) => (props.isActive ? `2px solid ${COLORS.blue}` : 'none')};
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
  }
  &:hover {
    color: ${COLORS.black};
  }
`;
