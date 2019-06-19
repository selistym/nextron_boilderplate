import { AgGridEvent, GridApi } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { EDITOR_MAP, RENDERER_MAP } from '@app/renderer/components/Grid/Cell';

import { IDispatch, IRootState } from '@app/renderer/modules/store';

import { StackModalType } from '@app/renderer/constants/modals';
import 'ag-grid-community/dist/styles/ag-grid.css';
import './styles.css';

type IConnectProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
interface IState {
  rowHeight: number;
  defaultColDef: any;
}

class List extends Component<IConnectProps, IState> {
  private gridApi?: GridApi;

  constructor(props: IConnectProps) {
    super(props);

    this.state = {
      defaultColDef: {
        headerComponent: null,
        suppressNavigable: (params) => params.node.group || params.node.footer,
        cellRendererParams: {},
      },
      rowHeight: 50,
    };
  }

  public onGridReady = (params: AgGridEvent) => {
    this.props.setIsLoading(false);
    this.gridApi = params.api;
    this.props.setGrid({
      updateRowData: (payload: any) => this.gridApi && this.gridApi.updateRowData(payload),
      setColumnDefs: (payload: any) => this.gridApi && this.gridApi.setColumnDefs(payload),
      getRowNode: (payload: any) => this.gridApi && this.gridApi.getRowNode(payload),
    });
  };

  public render() {
    const { initialColumns, initialRows } = this.props;

    return (
      <div
        className="list"
        style={{ width: '100vw', height: 'calc(100vh - 185px)', position: 'absolute' }}
      >
        <div id="myGrid" style={{ height: '100%', boxSizing: 'border-box', width: '100%' }}>
          <AgGridReact
            // initiation
            onGridReady={this.onGridReady}
            columnDefs={initialColumns}
            rowData={initialRows}
            // grouping
            groupDefaultExpanded={-1}
            groupIncludeFooter={true}
            defaultColDef={this.state.defaultColDef}
            deltaRowDataMode={true}
            rowSelection={'single'}
            // actions
            onRowClicked={this.onRowClicked}
            onRowDragEnd={this.onRowDragEnd}
            // Suppressors
            suppressRowClickSelection={true}
            suppressPropertyNamesCheck={true}
            suppressContextMenu={true}
            // Pinned add row button
            isFullWidthCell={(rowNode) => rowNode.data.isFullWidth}
            fullWidthCellRenderer="addRowRenderer"
            pinnedBottomRowData={[{ isFullWidth: true }]}
            // Renderers
            frameworkComponents={EDITOR_MAP}
            components={RENDERER_MAP}
            // settings
            getRowNodeId={(data) => data.id}
            getRowHeight={this.getRowHeight}
            rowHeight={this.state.rowHeight}
          />
        </div>
      </div>
    );
  }

  private onRowClicked = (params) => {
    const { columnsById, coreId, tableId, addStackModal } = this.props;
    const columns = Object.values(columnsById);

    if (params.data.isFullWidth) {
      // Need to fix, not sure if works.
      addStackModal({
        type: StackModalType.Record,
        props: {
          coreId,
          tableId,
          initialRecord: { cells: columns },
        },
      });
    } else {
      addStackModal({
        type: StackModalType.Record,
        props: {
          coreId,
          tableId,
          rowId: params.data.id,
        },
      });
    }
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
}

const mapState = (state: IRootState) => ({
  initialColumns: state.core.initialColumns,
  initialRows: state.core.initialRows,
  coreId: state.core.activeIds.coreId,
  tableId: state.core.activeIds.tableId,
  columnsById: state.core.columnsById,
});

const mapDispatch = ({ app, core }: IDispatch) => ({
  setGrid: (payload: any) => core.setGrid(payload),
  setIsLoading: (payload: any) => core.setIsLoading({ isLoadingGrid: payload }),
  addStackModal: (payload: any) => app.addStackModal(payload),
});

export default connect(
  mapState,
  mapDispatch,
)(List);
