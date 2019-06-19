export interface ICellProps {
  cellId: string;
  columnId: string;
  columnName: string;
  type: string;
  typeOptions?: any;
  value: any;
}

export interface IRecordProps {
  rowId: string;
  title: string;
  cells: ICellProps[];
}

export interface ITypeComponent {
  className?: string;
  cell: ICellProps;
  isDisabled: boolean;
}
