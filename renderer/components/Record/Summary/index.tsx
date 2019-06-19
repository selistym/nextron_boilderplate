import React, { useCallback } from 'react';

import { IRecordProps } from '../index';

import RecordSummaryAttachment from './Fields/Attachment';
import RecordSummaryLookup from './Fields/Lookup';
import RecordSummaryOption from './Fields/Option';
import RecordSummaryText from './Fields/Text';

import { glyphs } from '@app/renderer/components/Icon';

import { adaptSummaryValue } from '@app/renderer/utils/record';

import { Container, DeleteIcon, ItemContainer, ItemTitle, OthersContainer, Title } from './styled';

export const ITEM_MAP: { [key: string]: any } = {
  TEXT: RecordSummaryText,
  NUMBER: RecordSummaryText,
  DATETIME: RecordSummaryText,
  RECORD_REFERENCE: RecordSummaryOption,
  MULTI_SELECT: RecordSummaryOption,
  SELECT: RecordSummaryOption,
  LOOKUP: RecordSummaryLookup,
  MULTI_ATTACHMENT: RecordSummaryAttachment,
  DEFAULT: RecordSummaryText,
};

export interface IRecordSummary {
  className?: string;
  isSelected?: boolean;
  onClickOption: (option: IRecordProps) => void;
  onDeleteOption?: (option: IRecordProps) => void;
  record: IRecordProps;
}

const RecordSummary: React.FC<IRecordSummary> = ({
  className,
  isSelected,
  onClickOption,
  onDeleteOption,
  record,
}) => {
  const { title, cells } = record;

  const handleClickOption = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClickOption(record);
  }, []);

  const handleDeleteOption = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDeleteOption) onDeleteOption(record);
  }, []);

  return (
    <Container onClick={handleClickOption} isSelected={isSelected} className={className}>
      <Title>{title}</Title>
      <OthersContainer>
        {cells.slice(0, 5).map((cell, index) => {
          const ItemComponent = ITEM_MAP[cell.type] || RecordSummaryText;
          return (
            <ItemContainer key={index}>
              <ItemTitle>{cell.columnName}</ItemTitle>
              <ItemComponent cell={cell} value={adaptSummaryValue(cell)} />
            </ItemContainer>
          );
        })}
      </OthersContainer>
      {onDeleteOption && (
        <DeleteIcon
          iconProps={{ size: { height: 12, width: 12 }, icon: glyphs.REMOVE }}
          onClick={handleDeleteOption}
        />
      )}
    </Container>
  );
};

export default RecordSummary;
