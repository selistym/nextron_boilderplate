import styled from 'styled-components';

export const Mask = styled.div`
  background-color: rgba(57, 57, 85, 0.3);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
`;

export const Container = styled.div<{ modalIndex: number }>`
  left: 50%;
  position: fixed;
  top: 50%;
  transform: ${(props) =>
    `translate(calc(-50% + ${Math.min(5, props.modalIndex || 0) * 10}px), calc(-50% + ${Math.min(
      5,
      props.modalIndex || 0,
    ) * 10}px))`};
`;
