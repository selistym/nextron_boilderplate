import { ValueSource } from '@app/renderer/constants/grid';

export interface ICellContent {
  columnId: string;
  content: any;
  source: ValueSource;
  type: string;
}
