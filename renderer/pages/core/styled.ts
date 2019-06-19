import styled from 'styled-components';

export const Container = styled.div`
  min-width: 900px;
`;

export const HeaderContainer = styled.div<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
`;

export const SpinnerWrapper = styled.div`
  align-items: center;
  display: flex;
  height: calc(100vh);
  justify-content: center;
`;
