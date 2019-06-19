import React, { createRef } from 'react';

import { KEY_CODES } from '@app/renderer/constants/app';
import { FormattedMessage } from 'react-intl';

interface IOption {
  name?: string;
  nameId: string;
  value: string;
}

export interface IDropdownProps {
  onClose: () => void;
  onClick: (option: IOption) => void;
  optionRenderer?: (option: any) => any;
  options: IOption[];
  defaultIndex?: number;
}

interface IDropdownState {
  selectedIndex: number;
}

class DropdownSelector extends React.PureComponent<IDropdownProps, IDropdownState> {
  private tabRef: React.RefObject<HTMLInputElement>;

  constructor(props: IDropdownProps) {
    super(props);
    this.tabRef = createRef();
    this.state = {
      selectedIndex: props.defaultIndex || 0,
    };
  }

  public componentDidMount() {
    if (this.tabRef.current) this.tabRef.current.focus();
  }

  public render() {
    const { options, onClick, optionRenderer } = this.props;
    const { selectedIndex } = this.state;

    return (
      <div
        ref={this.tabRef}
        tabIndex={0}
        onKeyDown={this.handleKeyDown}
        id="dropdown-selector-container"
        className="dropdown-selector-container"
      >
        {options.map((option: IOption, index: number) => (
          <div
            className={`dropdown-selector-option-container ${
              index === selectedIndex ? 'dropdown-selector-option-selected' : ''
            }`}
            key={index}
            tabIndex={0}
            id={`dropdown-option-${index}`}
            data-index={index}
            onClick={() => onClick(option)}
            onMouseOver={this.handleMouseOver}
          >
            {optionRenderer ? (
              optionRenderer(option)
            ) : (
              <div className="dropdown-selector-option">
                {!!option.name ? option.name : <FormattedMessage id={option.nameId} />}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  private handleMouseOver = (e: any) => {
    if (e.target.dataset.index) {
      this.setState({ selectedIndex: parseInt(e.target.dataset.index, 0) });
    }
  };

  private handleKeyDown = (e: React.KeyboardEvent) => {
    const { onClick, onClose, options } = this.props;
    const { selectedIndex } = this.state;

    switch (e.keyCode) {
      case KEY_CODES.ENTER: {
        onClick(options[selectedIndex]);
        break;
      }
      case KEY_CODES.ARROW_UP: {
        const newIndex = selectedIndex <= 0 ? options.length - 1 : Math.max(0, selectedIndex - 1);
        this.focusOption(newIndex, e);
        break;
      }
      case KEY_CODES.ARROW_DOWN: {
        const newIndex =
          selectedIndex >= options.length - 1 ? 0 : Math.min(options.length - 1, selectedIndex + 1);
        this.focusOption(newIndex, e);
        break;
      }
      case KEY_CODES.ESC: {
        onClose();
        break;
      }
      default:
        break;
    }
  };

  private focusOption = (newIndex: number, e: React.KeyboardEvent) => {
    e.preventDefault();
    const focusedEl = document.getElementById(`dropdown-option-${newIndex}`);
    this.setState({ selectedIndex: newIndex });

    if (focusedEl && this.tabRef && this.tabRef.current) {
      scrollIntoView(this.tabRef.current, focusedEl);
    }
  };
}

export default DropdownSelector;

const scrollIntoView = (menuEl: HTMLElement, focusedEl: HTMLElement): void => {
  const menuRect = menuEl.getBoundingClientRect();
  const focusedRect = focusedEl.getBoundingClientRect();
  const overScroll = focusedEl.offsetHeight / 6;

  if (focusedRect.bottom + overScroll > menuRect.bottom) {
    menuEl.scrollTop = Math.min(
      focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll,
      menuEl.scrollHeight,
    );
  } else if (focusedRect.top - overScroll < menuRect.top) {
    menuEl.scrollTop = Math.max(focusedEl.offsetTop - overScroll, 0);
  }
};
