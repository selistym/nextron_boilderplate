import FocusTrap from 'focus-trap-react';
import noScroll from 'no-scroll';
import React, { Fragment, PureComponent } from 'react';
import ReactDom from 'react-dom';

import { KEY_CODES } from '@app/renderer/constants/app';

import { Container, Mask } from './styled';

export interface IProps {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
  onClose: () => void;
}

class Drawer extends PureComponent<IProps> {
  private containerEl: HTMLElement;
  private rootEl: HTMLElement | null;

  constructor(props: IProps) {
    super(props);
    this.rootEl = document.getElementById('root');
    this.containerEl = document.createElement('div');
  }

  public componentDidMount() {
    if (this.rootEl) this.rootEl.appendChild(this.containerEl);
    noScroll.on();
  }

  public componentWillUnmount() {
    if (this.rootEl) this.rootEl.removeChild(this.containerEl);
    noScroll.off();
  }

  public render() {
    const { children, className, onClose } = this.props;

    return ReactDom.createPortal(
      <Fragment>
        <Mask onMouseDown={onClose} />
        <FocusTrap active={false}>
          <Container onKeyDown={this.handleKeyDown} className={className}>
            {children}
          </Container>
        </FocusTrap>
      </Fragment>,
      this.containerEl,
    );
  }

  public handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.keyCode) {
      case KEY_CODES.ESC:
        this.props.onClose();
        break;
      default:
        break;
    }
  };
}

export default Drawer;
