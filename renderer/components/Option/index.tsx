import React from 'react';

import { glyphs } from '@app/renderer/components/Icon';
import { SELECT_COLOR } from '@app/renderer/constants/color';

import { Container, Icon, Name } from './styled';

import { ISelect } from '@app/renderer/modules/shared/type';

export interface IProps {
  className?: string;
  option: ISelect;
  onRemove?: (option: ISelect) => void;
}
const Option: React.FC<IProps> = ({ className, option, onRemove }) => (
  <Container className={className} color={SELECT_COLOR[option.color]}>
    <Name>{option.name}</Name>
    <div id="cell-focus-container">
      {onRemove && (
        <Icon
          iconProps={{ size: { width: 10, height: 10 }, icon: glyphs.REMOVE }}
          onClick={() => onRemove && onRemove(option)}
        />
      )}
    </div>
  </Container>
);

export default Option;
