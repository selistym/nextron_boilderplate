import React from 'react';
import { useSelector } from 'react-redux';

import ModalRecord from '@app/components/Record/Modal';
import ViewOptionsModal from '../Core/Controls/ViewOptions/Modal';
import FieldModal from '../Field/Modal';
import ModalAddView from './AddView';
import ModalCore from './Core';
import ModalCoreAddBud from './CoreAddBud';
import ModalDate from './Date';
import ModalExpand from './Expand';
import HeaderMenu from './HeaderMenu';
import ModalHideColumn from './HideColumn';
import ModalPreview from './Preview';
import RecordReference from './RecordReference';
import ModalSelect from './Select';
import ModalShareView from './ShareView';
import ModalTimePicker from './TimePicker';

import { StackModalType, ThrowModalType } from '@app/constants/modals';
import { IRootState } from '@app/modules/store';

const STACK_MODAL_COMPONENT = {
  [StackModalType.AddCore]: (props: any, index: number) => (
    <ModalCore key={index} {...props} modalIndex={index} />
  ),
  [StackModalType.Record]: (props: any, index: number) => (
    <ModalRecord key={index} {...props} modalIndex={index} />
  ),
  [StackModalType.Expand]: (props: any, index: number) => (
    <ModalExpand key={index} {...props} modalIndex={index} />
  ),
  [StackModalType.Preview]: (props: any, index: number) => (
    <ModalPreview key={index} {...props} modalIndex={index} />
  ),
  [StackModalType.ShareView]: (props: any, index: number) => (
    <ModalShareView key={index} {...props} modalIndex={index} />
  ),
  [StackModalType.AddView]: (props: any, index: number) => (
    <ModalAddView key={index} {...props} modalIndex={index} />
  ),
  [StackModalType.AddCoreBud]: (props: any, index: number) => (
    <ModalCoreAddBud key={index} {...props} modalIndex={index} />
  ),
};
const THROW_MODAL_COMPONENT = {
  [ThrowModalType.Field]: (parentSize: any, props: any) => (
    <FieldModal parentSize={parentSize} {...props} />
  ),
  [ThrowModalType.HeaderMenu]: (parentSize: any, props: any) => (
    <HeaderMenu parentSize={parentSize} {...props} />
  ),
  [ThrowModalType.ViewOptions]: (parentSize: any, props: any) => (
    <ViewOptionsModal parentSize={parentSize} {...props} />
  ),
  [ThrowModalType.RecordReference]: (parentSize: any, props: any) => (
    <RecordReference parentSize={parentSize} {...props} />
  ),
  [ThrowModalType.Select]: (parentSize: any, props: any) => (
    <ModalSelect parentSize={parentSize} {...props} />
  ),
  [ThrowModalType.DatePicker]: (parentSize: any, props: any) => (
    <ModalDate parentSize={parentSize} {...props} />
  ),
  [ThrowModalType.TimePicker]: (parentSize: any, props: any) => (
    <ModalTimePicker parentSize={parentSize} {...props} />
  ),
  [ThrowModalType.HideColumn]: (parentSize: any, props: any) => (
    <ModalHideColumn parentSize={parentSize} {...props} />
  ),
};

interface IStackModalProps {
  type: StackModalType;
  parentSize: any;
  props: any;
}
interface IThrowModalProps {
  type: ThrowModalType;
  props: any;
}

const Modal = () => {
  const focusTrap = useSelector((state: IRootState) => state.app.focusTrap);
  const stackModals = useSelector((state: IRootState) => state.app.stackModals);
  const throwModal: IThrowModalProps = useSelector((state: IRootState) => state.app.throwModal);
  const ThrowModalRenderer = throwModal && THROW_MODAL_COMPONENT[throwModal.type];
  return (
    <>
      {stackModals.map(({ type, props }: IStackModalProps, index: number) => {
        const StackModalRenderer = STACK_MODAL_COMPONENT[type];
        if (!StackModalRenderer) return null;
        return StackModalRenderer({ ...props, suppressFocusTrap: !focusTrap }, index);
      })}
      {throwModal &&
        ThrowModalRenderer(throwModal.parentSize, {
          ...throwModal.props,
          suppressFocusTrap: !focusTrap,
        })}
    </>
  );
};

export default Modal;
