import { IHeaderParams } from 'ag-grid-community';

class HeaderCell {
  private eGui: HTMLDivElement;

  constructor() {
    this.eGui = document.createElement('div');
    this.eGui.setAttribute('class', 'grid-header-container');
  }

  public init(params: IHeaderParams) {
    const { displayName } = params;

    const headerName = document.createElement('label');
    headerName.setAttribute('class', 'grid-header-name');
    headerName.innerText = displayName;

    const svg = `
    <svg width="9" height="5" xmlns="http://www.w3.org/2000/svg">
      <path d="M.25.75L4.625 4.5 9 .75z" fill="currentColor" fillRule="evenodd" />
    </svg>
    `;

    const dropdown = document.createElement('button');
    dropdown.setAttribute('class', 'grid-header-dropdown');
    dropdown.innerHTML = svg;
    dropdown.addEventListener('click', this.handleClickDropdown);

    this.eGui.appendChild(headerName);
    // this.eGui.appendChild(dropdown);
  }

  public getGui() {
    return this.eGui;
  }

  private handleClickDropdown() {
    // tslint:disable-next-line: no-console
    console.log('Show FieldModal');
  }
}

export default HeaderCell;
