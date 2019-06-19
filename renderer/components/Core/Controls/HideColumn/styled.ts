import { css } from 'styled-components';

import { darkBtnMixin } from '@app/renderer/components/Shared';

export const HideColumnButtonMixin = css`
  margin-right: 30px;
  ${darkBtnMixin}

  &:hover {
    cursor: pointer;
  }
`;
