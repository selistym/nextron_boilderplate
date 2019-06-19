import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { get } from 'lodash';

import { IDateTimeTypeOptions } from '@app/renderer/modules/shared/type';

import { getFormattedDateValue, getFormattedTimeValue } from '@app/renderer/utils/date';

interface IColDef extends ColDef {
  typeOptions: IDateTimeTypeOptions;
}
interface IParams extends ICellRendererParams {
  colDef: IColDef;
}

class GridCellDateRenderer {
  private eGui: HTMLDivElement;

  constructor() {
    this.eGui = document.createElement('div');
    this.eGui.setAttribute('class', 'grid-cell-shared-container');

    const date = document.createElement('span');
    date.setAttribute('id', 'grid-cell-date');
    date.setAttribute('class', 'grid-cell-datetime');
    this.eGui.appendChild(date);
  }

  public init(params: IParams) {
    const { value, colDef } = params;
    // This will need to be placed in a different area when we work on EDIT.
    if (get(colDef, 'typeOptions.includeTime')) {
      const time = document.createElement('span');
      time.setAttribute('id', 'grid-cell-time');
      time.setAttribute('class', 'grid-cell-datetime grid-cell-time');
      this.eGui.appendChild(time);
    }

    this.setOption(value && value.content, colDef.typeOptions);
  }

  public getGui() {
    return this.eGui;
  }

  public refresh(params: IParams) {
    const { value, colDef } = params;

    this.setOption(value && value.content, colDef.typeOptions);
  }

  private setOption(value: string, typeOptions: any) {
    const dateValue = getFormattedDateValue(value, typeOptions);
    const timeValue = getFormattedTimeValue(value, typeOptions);

    const date = this.eGui.querySelector('#grid-cell-date') as HTMLSpanElement;
    const time = this.eGui.querySelector('#grid-cell-time') as HTMLSpanElement;
    if (date && dateValue) date.innerText = dateValue;
    if (time && timeValue) time.innerText = timeValue;
  }
}

export default GridCellDateRenderer;
