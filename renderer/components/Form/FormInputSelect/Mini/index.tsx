import { observer, useObservable } from 'mobx-react-lite';
import React, { useRef } from 'react';

import { glyphs } from '@app/renderer/components/Icon';
import Dropdown from './Dropdown';

import { Container, OptionBtn, StyledIcon, Value } from './styled';

export interface IOption {
  name: string;
  value: string;
}

export interface ISelectProps {
  className?: string;
  options: IOption[];
  onClick: (val: any) => void;
  value: string;
}

// Value & handlers are meant to be handled by state above, not react-final-form
const FormInputSelectMini: React.FC<ISelectProps> = ({ className, options, onClick, value }) => {
  const positionRef = useRef(null);
  const state = useObservable({
    isOpen: false,
    setOpenDropdown(isOpen: boolean) {
      state.isOpen = isOpen;
    },
  });
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Container ref={positionRef} className={className}>
      <OptionBtn onClick={() => state.setOpenDropdown(true)}>
        <Value>{(selectedOption && selectedOption.name) || 'Unknown'}</Value>
        <StyledIcon
          isOpen={state.isOpen}
          icon={glyphs.ARROW_DROPDOWN}
          size={{ width: 10, height: 10 }}
        />
      </OptionBtn>
      {state.isOpen && (
        <Dropdown
          left={positionRef.current ? positionRef.current.getBoundingClientRect().left : 0}
          top={positionRef.current ? positionRef.current.getBoundingClientRect().top + 20 : 0}
          options={options}
          onClose={() => state.setOpenDropdown(false)}
          onClick={onClick}
        />
      )}
    </Container>
  );
};

export default observer(FormInputSelectMini);
