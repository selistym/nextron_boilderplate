import styled from 'styled-components';

export const Mask = styled.div<{ isMaskTransparent?: boolean; maskColor?: string }>`
  background-color: transparent;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 2000;
`;

export const Container = styled.div`
  position: fixed;
  z-index: 2000;
`;
