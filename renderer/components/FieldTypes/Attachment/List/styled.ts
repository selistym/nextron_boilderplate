import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  overflow: hidden;

  .attachment-item {
    margin: 5px 0;
  }
  .attachment-item:not(:last-child) {
    margin-right: 5px;
  }
`;
