import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

import { textEllipsisMixin } from '@app/renderer/components/Shared';

export interface IFormError {
  error: string;
  isSmall?: boolean;
}

const FormError: React.FC<IFormError> = ({ error, isSmall }) => (
  <Container isSmall={isSmall}>
    <FormattedMessage id={error} />
  </Container>
);

const Container = styled.p<{ isSmall?: boolean }>`
  bottom: 5px;
  color: ${COLORS.red};
  font-size: ${(props) => (props.isSmall ? '12px' : '14px')};
  position: absolute;
  margin: 0;
  width: 100%;

  ${textEllipsisMixin}
`;

export default FormError;
