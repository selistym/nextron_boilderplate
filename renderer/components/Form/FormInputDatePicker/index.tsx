import Moment, { Moment as IMoment } from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { compose } from 'react-apollo';
import { FieldRenderProps } from 'react-final-form';
import { InjectedIntl, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { ThrowModalType } from '@app/renderer/constants/modals';
import { IDateTimeTypeOptions } from '@app/renderer/modules/shared/type';

import { IDispatch } from '@app/renderer/modules/store';

type IConnectProps = ReturnType<typeof mapDispatch> & FieldRenderProps<HTMLElement>;

import {
  formatDate,
  getDateMoment,
  getFormattedDateValue,
  getFormattedTimeValue,
  getMomentFormat,
} from '@app/renderer/utils/date';

import { Container, Input, InputTitle } from './styled';

export interface IFormInputDatePicker extends IConnectProps {
  className?: string;
  isDisabled?: boolean;
  isSmall?: boolean;
  placeholderId?: string;
  titleId?: string;
  intl: InjectedIntl;
  typeOptions: IDateTimeTypeOptions;
}

const FormInputDatePicker: React.FC<IFormInputDatePicker> = ({
  addThrowModal,
  removeThrowModal,
  input: { value, onChange },
  typeOptions,
  intl: { formatMessage },
  titleId,
  isSmall,
}) => {
  const { dateFormat, includeTime, timeFormat } = typeOptions;

  const dateRef = useRef<HTMLInputElement>(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dateValue, setDateValue] = useState<string>(getFormattedDateValue(value, typeOptions));
  const [timeValue, setTimeValue] = useState<string>(getFormattedTimeValue(value, typeOptions));

  useEffect(
    () => {
      if (showDatePicker) {
        let dateMoment = getDateMoment(dateValue, typeOptions);
        if (!dateMoment.isValid()) {
          dateMoment = Moment();
        }
        addThrowModal({
          type: ThrowModalType.DatePicker,
          parentSize: dateRef.current && dateRef.current.getBoundingClientRect(),
          props: {
            value: dateMoment,
            onSelect: handleDatePickerSelect,
            onChange: handleDatePickerChange,
            onClose: handleDatePickerClose,
          },
        });
      } else {
        removeThrowModal();
      }
    },
    [dateValue, showDatePicker],
  );

  useEffect(
    () => {
      if (includeTime && showTimePicker) {
        addThrowModal({
          type: ThrowModalType.TimePicker,
          parentSize: dateRef.current && dateRef.current.getBoundingClientRect(),
          props: {
            offset: { left: 135, top: 0 },
            onSelect: handleTimePickerSelect,
            value: timeValue,
            hours24: timeFormat,
            onClose: handleTimePickerClose,
          },
        });
      } else {
        removeThrowModal();
      }
    },
    [includeTime, timeValue, showTimePicker],
  );

  useEffect(
    () => {
      const date = dateValue || formatDate(Moment(), dateFormat);
      const newMoment = Moment(`${date} ${timeValue}`, getMomentFormat(typeOptions));
      if (newMoment.isValid()) {
        onChange(newMoment.format() as any);
      }
    },
    [timeValue, dateValue],
  );

  const handleDatePickerChange = useCallback((date: IMoment) => {
    if (date) setDateValue(formatDate(date, dateFormat));
  }, []);

  const handleDatePickerSelect = useCallback((date: IMoment) => {
    setShowDatePicker(false);
    if (date) setDateValue(formatDate(date, dateFormat));
  }, []);

  const handleDateValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(e.target.value);
  }, []);

  const handleDateInputFocus = useCallback(() => {
    setShowDatePicker(true);
  }, []);

  const handleDatePickerClose = useCallback(() => {
    setShowDatePicker(false);
  }, []);

  const handleTimePickerSelect = useCallback((date: string) => {
    setShowTimePicker(false);
    setTimeValue(date);
  }, []);

  const handleTimeValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeValue(e.target.value);
  }, []);

  const handleTimeInputFocus = useCallback(() => {
    setShowTimePicker(true);
  }, []);

  const handleTimePickerClose = useCallback(() => {
    setShowTimePicker(false);
  }, []);

  return (
    <Container ref={dateRef}>
      {titleId && <InputTitle isSmall={isSmall}>{formatMessage({ id: titleId })}</InputTitle>}
      <Input
        onFocus={handleDateInputFocus}
        value={dateValue || ''}
        onChange={handleDateValueChange}
      />
      {includeTime && (
        <Input
          onFocus={handleTimeInputFocus}
          value={timeValue || ''}
          onChange={handleTimeValueChange}
        />
      )}
    </Container>
  );
};

const mapDispatch = ({ app }: IDispatch) => ({
  addThrowModal: (payload: any) => app.addThrowModal(payload),
  removeThrowModal: () => app.removeThrowModal(),
});

export default compose(
  injectIntl,
  connect(
    undefined,
    mapDispatch,
  ),
)(FormInputDatePicker);
