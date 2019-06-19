import React, { useEffect, useRef } from 'react';
import { InjectedIntl, injectIntl } from 'react-intl';

import { SELECT_COLOR } from '@app/renderer/constants/color';

import ButtonIcon from '@app/renderer/components/Button/Icon';
import { glyphs } from '@app/renderer/components/Icon';

import { IFieldOptions } from '../../shared';

import { Color, Container, Input } from './styled';

export interface IOptionProps extends IFieldOptions {
  onRemove: (optionId: string) => void;
  index: number;
  intl: InjectedIntl;
  isFocused: boolean;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Option: React.FC<IOptionProps> = ({
  input: { value, onChange },
  intl: { formatMessage },
  index,
  isFocused,
  onFocus,
  onRemove,
}) => {
  const tabRef = useRef<HTMLInputElement>(null);
  useEffect(
    () => {
      if (tabRef.current && isFocused) tabRef.current.focus();
      if (!value.color) {
        const colors = Object.keys(SELECT_COLOR);
        onChange({
          ...value,
          color: colors[index % (colors.length - 1)],
        });
      }
    },
    [isFocused],
  );

  return (
    <Container>
      {/* <DragContainer>
        <Icon size={{ width: 15, height: 15 }} icon={glyphs.DRAG_INDICATOR} />
      </DragContainer> */}
      <Color color={SELECT_COLOR[value.color]} />
      <Input
        ref={tabRef}
        onFocus={onFocus}
        defaultValue={value.name}
        onChange={(e) => onChange({ ...value, name: e.target.value })}
        placeholder={formatMessage({
          id: 'form.field.options.empty',
        })}
      />
      <ButtonIcon
        isTabable={false}
        css={`
          width: 15;
          height: 15;
        `}
        iconProps={{ size: { width: 10, height: 10 }, icon: glyphs.REMOVE }}
        onClick={() => onRemove(value.id)}
      />
    </Container>
  );
};

export default injectIntl(Option);
