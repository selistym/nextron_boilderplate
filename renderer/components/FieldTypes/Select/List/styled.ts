import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  overflow: hidden;

  .select-item {
    margin: 5px 0;
  }
  .select-item:not(:last-child) {
    margin-right: 5px;
  }
`;
