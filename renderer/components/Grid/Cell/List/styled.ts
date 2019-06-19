import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const LeftSide = styled.div`
  display: flex;
  justify-content: flex-start;
  min-width: 100px;
  padding-right: 10px;
`;

export const RightSide = styled.div`
  display: flex;
  justify-content: flex-end;
  min-width: 100px;
  padding: 0 20px 0 10px;
  overflow: hidden;
`;

export const LeftContent = styled.div`
  align-items: center;
  display: flex;
  margin-right: 5px;
  overflow: hidden;
`;

export const RightContent = styled.div`
  align-items: center;
  display: flex;
  margin-left: 5px;
  overflow: hidden;
`;
