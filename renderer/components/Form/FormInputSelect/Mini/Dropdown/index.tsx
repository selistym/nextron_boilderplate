import React from 'react';

import ModalWrapper from '@app/renderer/components/Modal/Wrapper';

import { IOption } from '../index';
import { Container, Option, OptionContainer } from './styled';

export interface IDropdownProps {
  onClose: () => void;
  onClick: (option: IOption) => void;
  options: IOption[];
  left: number;
  top: number;
}

const Dropdown: React.FC<IDropdownProps> = ({ options, onClick, onClose, left, top }) => (
  <ModalWrapper isMaskTransparent={true} left={left} top={top} onClose={onClose}>
    <Container>
      {options.map((option: IOption, index: number) => (
        <OptionContainer
          key={index}
          tabIndex={0}
          onClick={() => {
            onClick(option);
            onClose();
          }}
        >
          <Option>{option.name}</Option>
        </OptionContainer>
      ))}
    </Container>
  </ModalWrapper>
);

export default Dropdown;
