import { css } from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export const H1Mixin = css`
  color: ${COLORS.purple};
  font-family: 'Galano Grotesque Light';
  font-weight: bold;
  font-size: 40px;
  line-height: 48px;
`;

export const H2Mixin = css`
  color: ${COLORS.purple};
  font-family: 'Galano Grotesque Light';
  font-weight: bold;
  font-size: 32px;
  line-height: 40px;
`;

export const H3Mixin = css`
  color: ${COLORS.purple};
  font-size: 24px;
  font-weight: normal;
  line-height: 32px;
`;

export const H4Mixin = css`
  color: ${COLORS.purple};
  font-size: 20px;
  line-height: 28px;
  font-weight: normal;
`;

export const P1Mixin = css`
  color: ${COLORS.purple};
  font-size: 16px;
  line-height: 24px;
`;

export const P2Mixin = css`
  color: ${COLORS.purple};
  font-size: 14px;
  line-height: 20px;
`;

export const Span1Mixin = css`
  color: ${COLORS.purple};
  font-size: 16px;
  line-height: 24px;
`;

export const Span1MediumMixin = css`
  color: ${COLORS.purple};
  font-family: 'Galano Grotesque Medium';
  font-size: 16px;
  line-height: 24px;
`;

export const Span2Mixin = css`
  color: ${COLORS.purple};
  font-size: 14px;
  line-height: 20px;
`;

export const Span2MediumMixin = css`
  color: ${COLORS.purple};
  font-size: 14px;
  font-family: 'Galano Grotesque Medium';
  line-height: 20px;
`;

export const Label1Mixin = css`
  color: ${COLORS.purple};
  font-size: 12px;
  font-family: 'Galano Grotesque Medium';
  line-height: 16px;
`;

export const Label2Mixin = css`
  color: ${COLORS.purple};
  font-family: 'Galano Grotesque Medium';
  font-size: 10px;
  font-weight: 400;
  line-height: 16px;
  text-transform: uppercase;
`;
