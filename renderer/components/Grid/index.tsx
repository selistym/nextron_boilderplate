import { AgGridEvent, CellValueChangedEvent, ColumnApi, GridApi } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { differenceWith, isEqual } from 'lodash';
import React, { Component } from 'react';
import { compose } from 'react-apollo';
import { renderToString } from 'react-dom/server';
import { InjectedIntl, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { EDITOR_MAP, RENDERER_MAP } from '@app/renderer/components/Grid/Cell';
import Icon, { glyphs } from '@app/renderer/components/Icon';
import { AUTO_GROUP_COL_DEF, ValueSource } from '@app/renderer/constants/grid';

import {
  prepareAddRecordRef,
  prepareSetDateTime,
  prepareSetMultiAttachment,
  prepareSetMultiSelect,
  prepareSetNumber,
  prepareSetSelect,
  prepareSetText,
} from '@app/renderer/modules/core/helper';
import { IDispatch, IRootState } from '@app/renderer/modules/store';

import 'ag-grid-community/dist/styles/ag-grid.css';
import './styles.css';

import { columnDefs } from './fakeData';

type IConnectProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
interface IProps extends IConnectProps {
  intl: InjectedIntl;
}

interface IState {
  defaultColDef: any;
  rowHeight: number;
}

class GridExample extends Component<IProps, IState> {
  private columnApi?: ColumnApi;
  private gridApi?: GridApi;

  constructor(props: IProps) {
    super(props);

    const {
      addThrowModal,
      addStackModal,
      removeStackModal,
      removeThrowModal,
      coreId,
      tableId,
    } = props;

    this.state = {
      defaultColDef: {
        editable: true,
        resizable: true,
        width: 200,
        headerComponent: 'headerCell',
        headerComponentParams: { addThrowModal },
        cellRendererParams: {
          addStackModal,
          removeStackModal,
          addThrowModal,
          removeThrowModal,
          coreId,
          tableId,
        },
        lockPinned: true,
        lockVisible: true,
        suppressNavigable: (params) => params.node.group || params.node.footer,
      },
      rowHeight: 50,
    };
  }

  public onGridReady = (params: AgGridEvent) => {
    this.props.setIsLoading(false);
    // TODO @Derek: This store has not been cleaned up. It is temporary for filters.
    this.columnApi = params.columnApi;
    this.gridApi = params.api;
    this.props.setGrid({
      updateRowData: (payload: any) => this.gridApi && this.gridApi.updateRowData(payload),
      setColumnDefs: (payload: any) => this.gridApi && this.gridApi.setColumnDefs(payload),
      getRowNode: (payload: any) => this.gridApi && this.gridApi.getRowNode(payload),
      getColumn: (payload: any) => this.columnApi && this.columnApi.getColumn(payload),
      getAllGridColumns: () => this.columnApi && this.columnApi.getAllGridColumns(),
      getAllRows: () => {
        const rowData = [];
        if (this.gridApi) this.gridApi.forEachNode((node) => rowData.push(node.data));
        return rowData;
      },
    });
  };

  public render() {
    const { initialColumns, initialRows } = this.props;

    return (
      <div
        className="grid"
        style={{ width: '100vw', height: 'calc(100vh - 185px)', position: 'absolute' }}
      >
        <div style={{ width: '100%', height: '100%' }}>
          <div style={{ height: '100%', boxSizing: 'border-box' }}>
            <div id="myGrid" style={{ height: '100%', width: '100%' }}>
              {/* {this.renderCustomShit()} */}
              <AgGridReact
                // initiation
                columnDefs={initialColumns}
                onGridReady={this.onGridReady}
                rowData={initialRows}
                // grouping
                autoGroupColumnDef={{ ...initialColumns[0], ...AUTO_GROUP_COL_DEF }}
                groupDefaultExpanded={-1}
                groupIncludeFooter={true}
                // actions
                onCellValueChanged={this.onCellValueChanged}
                onRowClicked={this.onRowClicked}
                onRowDragEnd={this.onRowDragEnd}
                getContextMenuItems={this.getContextMenuItems}
                // suppressors
                suppressContextMenu={true}
                suppressPropertyNamesCheck={true}
                suppressRowClickSelection={true}
                // renderers
                frameworkComponents={EDITOR_MAP}
                components={RENDERER_MAP}
                // pinned add row button
                pinnedBottomRowData={[{ isFullWidth: true }]}
                isFullWidthCell={(rowNode) => rowNode.data.isFullWidth}
                fullWidthCellRenderer="addRowRenderer"
                // settings
                animateRows={false}
                deltaRowDataMode={true}
                deltaColumnMode={true}
                enterMovesDownAfterEdit={true}
                enterMovesDown={false}
                defaultColDef={this.state.defaultColDef}
                getRowHeight={this.getRowHeight}
                getRowNodeId={(data) => data.id}
                headerHeight={40}
                reactNext={true}
                rowSelection={'single'}
                rowHeight={this.state.rowHeight}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  private onRowClicked = (params) => {
    const { addRowAtIndex } = this.props;

    if (params.data.isFullWidth) addRowAtIndex({});
  };

  private onCellValueChanged = (event: CellValueChangedEvent) => {
    const { newValue, oldValue, column, data } = event;
    const { updateCell } = this.props;
    const colDef = column.getColDef();
    const type = colDef.typeOptions.type;
    // We need to check if it was coming from subscriptions. We don't want a mutation to occur after sub.
    if (newValue.source === ValueSource.Sub) return;
    if (!isEqual(newValue && newValue.content, oldValue && oldValue.content)) {
      let action;
      if (type === 'RECORD_REFERENCE') {
        const differenceRows = differenceWith(
          newValue && newValue.content,
          oldValue && oldValue.content,
          isEqual,
        );
        if (differenceRows.length === 0) return;
        action = prepareAddRecordRef(differenceRows[0].id);
      } else if (type === 'NUMBER') {
        action = prepareSetNumber(newValue.content);
      } else if (type === 'TEXT') {
        action = prepareSetText(newValue.content);
      } else if (type === 'DATETIME') {
        action = prepareSetDateTime(newValue.content);
      } else if (type === 'MULTI_SELECT') {
        action = prepareSetMultiSelect(newValue.content);
      } else if (type === 'SELECT') {
        action = prepareSetSelect(newValue.content);
      } else if (type === 'LOOKUP') {
        return;
      } else if (type === 'MULTI_ATTACHMENT') {
        action = prepareSetMultiAttachment(newValue.content);
      }

      updateCell({ action, rowId: data.id, columnId: column.getColId() });
    }
  };

  private getContextMenuItems = ({ node }) => {
    const {
      intl: { formatMessage },
      addRowAtIndex,
    } = this.props;
    return [
      {
        name: formatMessage({ id: 'dropdown.record.name.insert.above' }),
        icon: renderToString(<Icon icon={glyphs.EDIT} size={{ width: 16, height: 16 }} />),
        action: () => node && addRowAtIndex(node.rowIndex),
      },
      {
        name: formatMessage({ id: 'dropdown.record.name.insert.below' }),
        icon: renderToString(<Icon icon={glyphs.DELETE} size={{ width: 16, height: 16 }} />),
        action: () => node && addRowAtIndex(node.rowIndex + 1),
      },
    ];
  };

  private onRowDragEnd = (e) => {
    const movingNode = e.node;
    const overNode = e.overNode;
    const rowNeedsToMove = movingNode !== overNode;
    if (movingNode && overNode && rowNeedsToMove && this.gridApi) {
      console.log('content index:', movingNode.rowIndex, 'destination:', overNode.rowIndex);
      this.gridApi.updateRowData({
        remove: [movingNode.data],
      });
      this.gridApi.updateRowData({
        add: [{ ...movingNode.data }],
        addIndex: overNode.rowIndex,
      });
    }
  };

  /**
   * Row height is dependant on
   * 1. Headers for row groups should extend depending on where the gap is
   * 2. Footers for row groups should shrink
   */
  private getRowHeight = (params) => {
    const numOfRowGroups = params.node.columnApi.getRowGroupColumns().length;

    if (
      params.node.group &&
      !params.node.footer &&
      !(params.node.level !== 0 && params.node.firstChild)
    ) {
      return 65;
    }

    if (params.node.footer && params.node.level !== numOfRowGroups - 1) {
      return 15;
    }

    if (params.data.isFullWidth) return 40;

    return this.state.rowHeight;
  };

  /**
   * @TODO Derek This code is temporarily disabled until grouping is active with integrated data.
   */
  private execute1Layer() {
    this.columnApi.setColumnWidth('colIndexGhost', 55);
    this.setState({ columnDefs: this.configColumns(columnDefs) });
  }

  private execute2Layers() {
    const firstCol = columnDefs[0];
    const newColumnDefHideCol = [{ ...firstCol, hide: true }].concat(columnDefs.slice(1));
    const targetGroupCol = columnDefs[2];
    const newColumnDefs = newColumnDefHideCol.concat([
      { ...targetGroupCol, rowGroupIndex: 0, hide: true },
    ]);

    this.columnApi.setColumnWidth('colIndexGhost', 70);
    this.setState({ columnDefs: this.configColumns(newColumnDefs) });
  }

  private execute3Layers() {
    const firstCol = columnDefs[0];
    const newColumnDefHideCol = [{ ...firstCol, hide: true }].concat(columnDefs.slice(1));
    const targetGroupCol = columnDefs[2];
    const targetGroupCol2 = columnDefs[5];
    const newColumnDefs = newColumnDefHideCol.concat([
      { ...targetGroupCol, rowGroupIndex: 0, hide: true },
      { ...targetGroupCol2, rowGroupIndex: 0, hide: true },
    ]);

    this.columnApi.setColumnWidth('colIndexGhost', 85);
    this.setState({ columnDefs: this.configColumns(newColumnDefs) });
  }

  private execute4Layers() {
    const firstCol = columnDefs[0];
    const newColumnDefHideCol = [{ ...firstCol, hide: true }].concat(columnDefs.slice(2));
    const targetGroupCol = columnDefs[2];
    const targetGroupCol2 = columnDefs[5];
    const targetGroupCol3 = columnDefs[1];
    const newColumnDefs = newColumnDefHideCol.concat([
      { ...targetGroupCol, rowGroupIndex: 0, hide: true },
      { ...targetGroupCol2, rowGroupIndex: 0, hide: true },
      { ...targetGroupCol3, rowGroupIndex: 0, hide: true },
    ]);

    this.columnApi.setColumnWidth('colIndexGhost', 100);
    this.setState({ columnDefs: this.configColumns(newColumnDefs) });
  }

  /**
   * TODO @Derek refactor the shit outta this so it belongs in the controls.
   */
  private renderCustomShit() {
    return (
      <div style={{ position: 'fixed', top: 0, right: 0 }}>
        <button
          onClick={() => {
            this.execute1Layer();
          }}
        >
          0 Groups
        </button>
        <button
          onClick={() => {
            this.execute2Layers();
          }}
        >
          1 Group
        </button>
        <button
          onClick={() => {
            this.execute3Layers();
          }}
        >
          2 Groups
        </button>
        <button
          onClick={() => {
            this.execute4Layers();
          }}
        >
          3 Groups
        </button>
      </div>
    );
  }
}

const mapState = (state: IRootState) => ({
  initialColumns: state.core.initialColumns,
  initialRows: state.core.initialRows,
  coreId: state.core.activeIds.coreId,
  tableId: state.core.activeIds.tableId,
});

const mapDispatch = ({ app, core }: IDispatch) => ({
  setGrid: (payload: any) => core.setGrid(payload),
  setIsLoading: (payload: any) => core.setIsLoading({ isLoadingGrid: payload }),
  addRowAtIndex: (payload: any) => core.addRowAtIndex(payload),
  addThrowModal: (payload: any) => app.addThrowModal(payload),
  removeThrowModal: () => app.removeThrowModal(),
  addStackModal: (payload: any) => app.addStackModal(payload),
  removeStackModal: () => app.removeStackModal(),
  updateCell: (payload: any) => core.updateCell(payload),
});

export default compose(
  injectIntl,
  connect(
    mapState,
    mapDispatch,
  ),
)(GridExample);
