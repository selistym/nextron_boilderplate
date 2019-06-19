import { ICellRendererParams } from 'ag-grid-community';

class GridCellNumberRenderer {
  private eGui: HTMLSpanElement;

  constructor() {
    this.eGui = document.createElement('span');
    this.eGui.setAttribute('class', 'grid-cell-span');
  }

  public init(params: ICellRendererParams) {
    this.adaptedValue(params);
  }

  public getGui() {
    return this.eGui;
  }

  public refresh(params: ICellRendererParams) {
    this.adaptedValue(params);
  }

  private adaptedValue(params: ICellRendererParams) {
    const { value, colDef } = params;
    const precision = colDef.typeOptions ? colDef.typeOptions.precision : 1;
    const numberValue =
      value && (value.content || value.content === 0) ? value.content.toFixed(precision) : '';

    this.eGui.innerText = numberValue;
  }
}

export default GridCellNumberRenderer;
