import { ColDef, ICellEditorParams } from 'ag-grid-community';
import { get } from 'lodash';
import Moment, { Moment as IMoment } from 'moment';
import React, { createRef } from 'react';

import { KEY_CODES } from '@app/renderer/constants/app';
import { ThrowModalType } from '@app/renderer/constants/modals';

import { IDateTimeTypeOptions } from '@app/renderer/modules/shared/type';

import { Container, Input } from './styled';

import { formatCell } from '@app/renderer/modules/core/helper';
import {
  formatDate,
  getDateMoment,
  getFormattedDateValue,
  getFormattedTimeValue,
  getMomentFormat,
} from '@app/renderer/utils/date';

interface IColDef extends ColDef {
  typeOptions: IDateTimeTypeOptions;
}
interface IProps extends ICellEditorParams {
  colDef: IColDef;
}

interface IState {
  dateValue: string;
  timeValue: string;
}

class GridCellDateEditor extends React.Component<IProps, IState> {
  private dateRef: React.RefObject<HTMLInputElement>;

  constructor(props: IProps) {
    super(props);
    this.dateRef = createRef();
    this.state = this.getState(props);
  }

  public afterGuiAttached() {
    if (this.dateRef.current) {
      this.dateRef.current.focus();
    }
  }

  public getValue() {
    const { dateValue, timeValue } = this.state;
    const { colDef } = this.props;
    // Default to today, if there is no dateValue.
    const date = dateValue || formatDate(Moment(), colDef.typeOptions.dateFormat);
    const value = Moment(`${date} ${timeValue}`, getMomentFormat(colDef.typeOptions));
    // Default to previous value if the new date is corrupt.
    return formatCell(value.isValid() ? value.format() : this.props.value);
  }

  public componentWillUnmount() {
    this.handleCloseThrowModal();
  }

  public render() {
    const { dateValue, timeValue } = this.state;
    const { colDef } = this.props;
    let dateMoment = getDateMoment(dateValue, colDef.typeOptions);
    if (!dateMoment.isValid()) {
      dateMoment = Moment();
    }

    return (
      <Container>
        <Input
          ref={this.dateRef}
          onFocus={this.handleDateInputFocus}
          value={dateValue || ''}
          onChange={this.handleDateValueChange}
        />
        {colDef.typeOptions.includeTime && (
          <Input
            onFocus={this.handleTimeInputFocus}
            value={timeValue || ''}
            onChange={this.handleTimeValueChange}
          />
        )}
      </Container>
    );
  }

  private getState(props: IProps) {
    const { charPress, keyPress, value } = props;
    const typeOptions = get(props, 'colDef.typeOptions');
    let dateValue: string;
    let timeValue: string;
    if (keyPress === KEY_CODES.BACKSPACE || keyPress === KEY_CODES.DELETE) {
      dateValue = '';
      timeValue = '';
    } else if (charPress) {
      dateValue = charPress;
      timeValue = '';
    } else {
      dateValue = getFormattedDateValue(value && value.content, typeOptions);
      timeValue = getFormattedTimeValue(value && value.content, typeOptions);
    }

    return {
      dateValue,
      timeValue,
    };
  }

  private handleTimePickerSelect = (date: string) => {
    this.setState({ timeValue: date }, () => this.props.stopEditing(true));
  };

  private handleDatePickerClose = () => {
    this.props.stopEditing(true);
  };

  private handleDatePickerChange = (date: IMoment | null) => {
    const { colDef } = this.props;
    if (date) {
      this.setState({ dateValue: formatDate(date, colDef.typeOptions.dateFormat) }, () =>
        this.handleOpenDatePicker(),
      );
    }
  };

  private handleDatePickerSelect = (date: IMoment) => {
    const { colDef } = this.props;
    if (date) {
      this.setState({ dateValue: formatDate(date, colDef.typeOptions.dateFormat) }, () =>
        this.props.stopEditing(true),
      );
    }
  };

  private handleDateValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ dateValue: e.target.value }, () => this.handleOpenDatePicker());
  };

  private handleTimeValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ timeValue: e.target.value });
  };

  private handleTimeInputFocus = () => {
    this.handleOpenTimePicker();
  };

  private handleDateInputFocus = () => {
    this.handleOpenDatePicker();
  };

  private handleOpenDatePicker = () => {
    const { eGridCell, colDef } = this.props;
    const { cellRendererParams, typeOptions } = colDef;
    const { addThrowModal } = cellRendererParams;
    const { dateValue } = this.state;
    let dateMoment = getDateMoment(dateValue, typeOptions);
    if (!dateMoment.isValid()) {
      dateMoment = Moment();
    }

    if (open) {
      addThrowModal({
        type: ThrowModalType.DatePicker,
        parentSize: eGridCell.getBoundingClientRect(),
        props: {
          value: dateMoment,
          onSelect: this.handleDatePickerSelect,
          onChange: this.handleDatePickerChange,
          onClose: this.handleDatePickerClose,
          suppressFocusTrap: true,
          avoidClickoutSide: true,
        },
      });
    }
  };

  private handleOpenTimePicker = () => {
    const { eGridCell, colDef, column } = this.props;
    const { cellRendererParams, typeOptions } = colDef;
    const { addThrowModal } = cellRendererParams;
    const { timeValue } = this.state;
    const { timeFormat, includeTime } = typeOptions;
    if (open && includeTime) {
      addThrowModal({
        type: ThrowModalType.TimePicker,
        parentSize: eGridCell.getBoundingClientRect(),
        props: {
          offset: { left: column.getActualWidth() / 2, top: 0 },
          onSelect: this.handleTimePickerSelect,
          value: timeValue,
          hours24: timeFormat,
          onClose: this.handleDatePickerClose,
          suppressFocusTrap: true,
          avoidClickoutSide: true,
        },
      });
    }
  };

  private handleCloseThrowModal = () => {
    const { colDef } = this.props;
    const { cellRendererParams } = colDef;
    const { removeThrowModal } = cellRendererParams;
    removeThrowModal();
  };
}

export default GridCellDateEditor;
