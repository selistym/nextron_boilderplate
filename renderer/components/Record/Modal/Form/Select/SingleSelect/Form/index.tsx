import React, { useCallback, useRef } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { connect } from 'react-redux';

import { glyphs } from '@app/renderer/components/Icon';
import SelectOption, { IOption } from '@app/renderer/components/Option';
import { ITypeComponent } from '@app/renderer/components/Record';
import { ThrowModalType } from '@app/renderer/constants/modals';

import { IDispatch } from '@app/renderer/modules/store';

import { Container, ItemContainer, SelectButton, StyledIcon } from './styled';

type IConnectProps = ReturnType<typeof mapDispatch> &
  FieldRenderProps<HTMLElement> &
  ITypeComponent;

const ColumnTypeMultiSelect: React.FC<IConnectProps> = ({
  addThrowModal,
  removeThrowModal,
  className,
  cell,
  input: { onChange, value },
}) => {
  const { choices } = cell.typeOptions;

  const positionRef = useRef<HTMLDivElement>(null);

  const handleOpenDropdown = useCallback(
    (e) => {
      e.preventDefault();
      addThrowModal({
        type: ThrowModalType.Select,
        parentSize: positionRef.current && positionRef.current.getBoundingClientRect(),
        props: {
          onClickOption(option: IOption) {
            onChange(option as any);
            removeThrowModal();
          },
          onClose: removeThrowModal,
          options: choices,
          renderOption: (option: IOption) => <SelectOption option={option} />,
          defaultIndex: choices.findIndex((choice: IOption) => choice.id === value.id),
          width: 296,
        },
      });
    },
    [choices, value],
  );

  return (
    <Container ref={positionRef} className={className}>
      <SelectButton onClick={handleOpenDropdown}>
        <ItemContainer>{value && <SelectOption option={value} />}</ItemContainer>
        <StyledIcon size={{ height: 10, width: 10 }} icon={glyphs.ARROW_DROPDOWN} />
      </SelectButton>
    </Container>
  );
};

const mapDispatch = ({ app }: IDispatch) => ({
  addThrowModal: (payload: any) => app.addThrowModal(payload),
  removeThrowModal: () => app.removeThrowModal(),
});

export default connect(
  undefined,
  mapDispatch,
)(ColumnTypeMultiSelect);
