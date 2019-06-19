import { Moment as IMoment } from 'moment';
import Calendar from 'rc-calendar';
import 'rc-calendar/assets/index.css';
import React from 'react';

import ThrowWrapper, { IParentModal } from '@app/components/Modal/ThrowWrapper';

interface IModalCalendar extends IParentModal {
  onChange: (date: IMoment | null) => void;
  onClose: () => void;
  onSelect: (date: IMoment) => void;
  value: IMoment;
}

const ModalCalendar: React.FC<IModalCalendar> = ({
  onChange,
  onClose,
  onSelect,
  offset,
  parentSize,
  suppressFocusTrap,
  avoidClickoutSide,
  value,
}) => (
  <ThrowWrapper
    parentSize={parentSize}
    onClose={onClose}
    offset={offset}
    suppressFocusTrap={suppressFocusTrap}
    avoidClickoutSide={avoidClickoutSide}
    avoidElementVert={true}
    avoidCollision={true}
  >
    <Calendar
      showDateInput={false}
      value={value as any}
      onClear={onClose}
      onChange={onChange}
      onSelect={onSelect}
    />
  </ThrowWrapper>
);

export default ModalCalendar;
