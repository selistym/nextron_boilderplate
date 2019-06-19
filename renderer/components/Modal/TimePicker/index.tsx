import React from 'react';

import ThrowWrapper, { IParentModal } from '@app/renderer/components/Modal/ThrowWrapper';
import { TIME_FORMAT } from '@app/renderer/constants/fieldTypes';

import { getTimePickerOptions } from '@app/renderer/utils/date';

import { Container, Item } from './styled';

export interface IModalTimePicker extends IParentModal {
  value: string;
  minuteStep?: number;
  searchText?: string;
  hours24: string;
  width?: number;
  onSelect: (date: string) => void;
}

const ModalTimePicker: React.FC<IModalTimePicker> = ({
  onClose,
  minuteStep,
  searchText,
  hours24,
  width,
  onSelect,
  parentSize,
  offset,
  suppressFocusTrap,
  avoidClickoutSide,
}) => {
  let options = getTimePickerOptions(minuteStep, hours24 === TIME_FORMAT.TWOFOUR_HOUR);

  if (searchText) {
    options = options.filter((option) => option.toLowerCase().indexOf(searchText) !== -1);
  }

  return (
    <ThrowWrapper
      parentSize={parentSize}
      offset={offset}
      onClose={onClose}
      suppressFocusTrap={suppressFocusTrap}
      avoidClickoutSide={avoidClickoutSide}
      avoidCollision={true}
      avoidElementVert={true}
    >
      <Container tabIndex={0} width={width}>
        {options.map((option, index) => (
          <Item onClick={() => onSelect(option)} key={index}>
            {option}
          </Item>
        ))}
      </Container>
    </ThrowWrapper>
  );
};

export default ModalTimePicker;
