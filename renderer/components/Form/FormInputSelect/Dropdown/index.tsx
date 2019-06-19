import FocusTrap from 'focus-trap-react';
import React from 'react';
import { InjectedIntl, injectIntl } from 'react-intl';
import OutsideClickHandler from 'react-outside-click-handler';

import DropdownSelector from '@app/renderer/components/Dropdown/Selector';

import { IOption } from '../index';

import { DropdownContainer } from './styled';

export interface IDropdownProps {
  intl: InjectedIntl;
  isIntl?: boolean;
  isSmall?: boolean;
  isError?: boolean;
  onClose: () => void;
  onClick: (option: IOption) => void;
  options: IOption[];
  defaultIndex: number;
}

interface IDropdownState {
  selectedIndex: number;
}

class Dropdown extends React.PureComponent<IDropdownProps, IDropdownState> {
  public render() {
    const { isSmall, isError, options, onClick, onClose } = this.props;

    return (
      <FocusTrap>
        <OutsideClickHandler onOutsideClick={onClose}>
          <DropdownContainer isSmall={isSmall} isError={isError}>
            <DropdownSelector options={options} onClick={onClick} onClose={onClose} />
          </DropdownContainer>
        </OutsideClickHandler>
      </FocusTrap>
    );
  }
}

export default injectIntl(Dropdown);
