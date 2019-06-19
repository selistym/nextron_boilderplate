import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage, InjectedIntl, injectIntl } from 'react-intl';

import { KEY_CODES } from '@app/constants/app';

import ThrowWrapper, { IParentModal } from '@app/components/Modal/ThrowWrapper';

import { Container, Empty, Input, OptionContainer } from './styled';

interface ISelectDropdown extends IParentModal {
  className?: string;
  defaultIndex?: number;
  intl: InjectedIntl;
  onClickOption: (option: any) => void;
  renderOption: (option: any) => React.ReactNode;
  onClose: () => void;
  options: any[];
  width?: number;
}

const SelectDropdown: React.FC<ISelectDropdown> = ({
  className,
  intl: { formatMessage },
  options,
  onClickOption,
  onClose,
  offset,
  defaultIndex,
  parentSize,
  renderOption,
  width,
  suppressFocusTrap,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef && inputRef.current) inputRef.current.focus();
  }, []);

  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedIndex, setSelectedIndex] = useState(
    options && options.length > 0 ? defaultIndex || 0 : -1,
  );

  const handleInputChange = useCallback(
    (e) => {
      const searchText = e.target.value.toLowerCase();
      const filteredResult = options.filter(
        (option) => option.name.toLowerCase().indexOf(searchText) !== -1,
      );
      if (filteredResult && filteredResult.length > 0) {
        setSelectedIndex(0);
      } else {
        setSelectedIndex(-1);
      }
      setFilteredOptions(filteredResult);
    },
    [options],
  );

  const handleMouseOver = useCallback(
    (e: any) => {
      if (e.target.dataset.index) {
        setSelectedIndex(parseInt(e.target.dataset.index, 0));
      }
    },
    [selectedIndex],
  );

  const handleSetNewIndexAndScroll = useCallback(
    (newIndex: number, e: React.KeyboardEvent) => {
      e.preventDefault();
      const optionEl = document.getElementById(`select-dropdown-option-${newIndex}`);
      setSelectedIndex(newIndex);
      if (optionEl) optionEl.focus();
    },
    [selectedIndex],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.keyCode) {
        case KEY_CODES.ENTER: {
          e.preventDefault();
          if (selectedIndex < 0) return;
          onClickOption(filteredOptions[selectedIndex]);
          break;
        }
        case KEY_CODES.ARROW_UP: {
          e.preventDefault();
          const newIndex = Math.max(0, selectedIndex - 1);
          handleSetNewIndexAndScroll(newIndex, e);
          break;
        }
        case KEY_CODES.ARROW_DOWN: {
          e.preventDefault();
          const newIndex = Math.min(filteredOptions.length - 1, selectedIndex + 1);
          handleSetNewIndexAndScroll(newIndex, e);
          break;
        }
        case KEY_CODES.ESC: {
          e.preventDefault();
          onClose();
          break;
        }
        default:
          break;
      }
    },
    [selectedIndex, filteredOptions],
  );

  return (
    <ThrowWrapper
      parentSize={parentSize}
      onClose={onClose}
      avoidCollision={true}
      avoidElementVert={true}
      offset={offset}
      suppressFocusTrap={suppressFocusTrap}
    >
      <Container
        tabIndex={0}
        onMouseOver={handleMouseOver}
        onKeyDown={handleKeyDown}
        className={className}
        width={width}
      >
        <Input
          ref={inputRef}
          placeholder={formatMessage({ id: 'form.record.option.findOption' })}
          onChange={handleInputChange}
        />
        {filteredOptions && filteredOptions.length > 0 ? (
          filteredOptions.map((option, index) => {
            return (
              <OptionContainer
                id={`select-dropdown-option-${index}`}
                isSelected={index === selectedIndex}
                data-index={index}
                key={index}
                onClick={() => onClickOption(option)}
              >
                {renderOption(option)}
              </OptionContainer>
            );
          })
        ) : (
          <OptionContainer onClick={onClose}>
            <Empty>
              <FormattedMessage id="form.record.option.empty" />
            </Empty>
          </OptionContainer>
        )}
      </Container>
    </ThrowWrapper>
  );
};

export default injectIntl(SelectDropdown);
