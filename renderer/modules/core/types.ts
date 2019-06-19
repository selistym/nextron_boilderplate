import { ValueSource } from '@app/constants/grid';

export interface ICellContent {
  columnId: string;
  content: any;
  source: ValueSource;
  type: string;
}
