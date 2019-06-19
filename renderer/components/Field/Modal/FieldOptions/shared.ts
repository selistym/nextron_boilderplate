import { FieldRenderProps } from 'react-final-form';
import { css } from 'styled-components';

export interface IFieldOptions extends FieldRenderProps<HTMLElement> {
  className?: string;
}

export const FieldCSS = css`
  width: 264px;
  margin: 15px 0 15px 15px;
`;
