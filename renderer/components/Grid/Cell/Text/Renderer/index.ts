import { ICellRendererParams } from 'ag-grid-community';

class GridCellTextRenderer {
  private eGui: HTMLSpanElement;

  constructor() {
    this.eGui = document.createElement('span');
    this.eGui.setAttribute('class', 'grid-cell-span');
  }

  public init(params: ICellRendererParams) {
    const { value } = params;
    this.eGui.innerText = (value && value.content) || '';
  }

  public getGui() {
    return this.eGui;
  }

  public refresh(params: ICellRendererParams) {
    const { value } = params;

    this.eGui.innerText = (value && value.content) || '';
  }
}

export default GridCellTextRenderer;
