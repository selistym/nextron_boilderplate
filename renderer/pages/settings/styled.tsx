import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  height: calc(100vh - 125px);
`;

export const LeftSection = styled.div`
  min-width: 224px;
  max-width: 300px;
  margin-right: 184px;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 576px;
  width: 576px;
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  padding-bottom: 125px;
  overflow-y: scroll;
`;

export const SpinnerWrapper = styled.div`
  align-items: center;
  display: flex;
  height: calc(100vh - 200px);
  justify-content: center;
`;
