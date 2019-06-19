import { IHeaderParams } from 'ag-grid-community';

import { ThrowModalType } from '@app/renderer/constants/modals';

class AddColumn {
  private eGui: HTMLDivElement;
  private handleClick?: (e: MouseEvent) => void;
  constructor() {
    const svg = `
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.419 8.006a.83.83 0 0 0-.831-.831L8.83 7.169V1.406a.83.83 0 1 0-1.662 0V7.17H1.406a.83.83 0 1 0 0 1.662H7.17v5.763a.83.83 0 1 0 1.662 0V8.83h5.763a.835.835 0 0 0 .825-.825z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
    `;
    this.eGui = document.createElement('div');
    this.eGui.setAttribute('class', 'grid-header-addColumn-container');
    this.eGui.innerHTML = svg;
  }

  public init(params: IHeaderParams) {
    const { addThrowModal } = params;
    this.handleClick = () => {
      addThrowModal({
        type: ThrowModalType.Field,
        parentSize: this.eGui.getBoundingClientRect(),
      });
    };

    this.eGui.addEventListener('click', this.handleClick);
  }

  public getGui() {
    return this.eGui;
  }

  public destroy() {
    if (this.handleClick) this.eGui.removeEventListener('click', this.handleClick);
  }
}

export default AddColumn;
