import { ICellRendererParams } from 'ag-grid-community';
import { get } from 'lodash';

import { LookupStatus } from '@app/renderer/constants/grid';

import { GridCellAttachmentRenderer } from '../Attachment';
import { GridCellMultiSelectRenderer } from '../MultiSelect';
import { GridCellReferenceRenderer } from '../Reference';
import { GridCellTextRenderer } from '../Text';

import { getLookupValue } from '@app/renderer/modules/core/adapter/lookup';
import { formatCell } from '@app/renderer/modules/core/helper';

const LOOKUP_RENDER_MAP = {
  TEXT: GridCellTextRenderer,
  NUMBER: GridCellTextRenderer,
  MULTI_SELECT: GridCellMultiSelectRenderer,
  SELECT: GridCellMultiSelectRenderer,
  RECORD_REFERENCE: GridCellReferenceRenderer,
  DATETIME: GridCellTextRenderer,
  MULTI_ATTACHMENT: GridCellAttachmentRenderer,
};

class GridCellLookupRenderer {
  private rootGui: HTMLDivElement;
  private loadingGui: HTMLSpanElement;
  private renderer: any;

  public init(params: ICellRendererParams) {
    this.rootGui = document.createElement('div');
    this.rootGui.setAttribute('class', 'grid-cell-lookup-container');
    this.createLoadingGui();

    const type = get(params, `value.content[0].type`);
    const Renderer = LOOKUP_RENDER_MAP[type] || GridCellTextRenderer;
    this.initiateRenderer(params, Renderer);
  }

  public getGui() {
    const childGui = this.renderer.getGui();
    this.rootGui.appendChild(childGui);
    return this.rootGui;
  }

  public refresh(params: ICellRendererParams) {
    const isCorrectRenderer = this.checkRenderer(params);
    if (!isCorrectRenderer) return;

    if (get(params, 'value.status') === LookupStatus.IsLoading) {
      this.removeChild();
      this.rootGui.appendChild(this.loadingGui);
    } else {
      this.removeChild();
      this.rootGui.appendChild(this.renderer.getGui());
      this.renderer.refresh({
        ...params,
        value: formatCell(getLookupValue(get(params, 'value.content'))),
      });
    }
  }

  private removeChild() {
    if (this.rootGui.firstChild) this.rootGui.removeChild(this.rootGui.firstChild);
  }

  /**
   * Because the type is only found in the values, if the original lookup value had no values there is no way of telling
   * which type it is. We need to constantly check if the renderers are correct because of the types.
   */
  private checkRenderer(params) {
    const type = get(params, `value.content[0].type`);
    const Renderer = LOOKUP_RENDER_MAP[type] || GridCellTextRenderer;

    const isCorrectRenderer = this.renderer instanceof Renderer;
    if (!isCorrectRenderer) {
      this.initiateRenderer(params, Renderer);
      this.removeChild(); // Need to remove the loading Gui.
      this.getGui();
      return false;
    }
    return true;
  }

  private initiateRenderer(params, Renderer) {
    this.renderer = new Renderer();
    this.renderer.init({
      ...params,
      value: formatCell(getLookupValue(get(params, 'value.content'))),
    });
  }

  private createLoadingGui() {
    this.loadingGui = document.createElement('span');
    this.loadingGui.setAttribute('class', 'grid-cell-span');
    this.loadingGui.innerText = 'Loading...';
  }
}

export default GridCellLookupRenderer;
