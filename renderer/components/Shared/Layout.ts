import styled from 'styled-components';

export const Wrapper = styled.div<{ backgroundColor?: string }>`
  background-color: ${(props) => props.backgroundColor};
  min-height: 100%;
  min-width: 960px;
`;

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 70px;
`;
