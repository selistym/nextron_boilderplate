import React, { useCallback, useRef } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { connect } from 'react-redux';

import ButtonIconTitle from '@app/renderer/components/Button/IconTitle';
import SelectOption, { IOption } from '@app/renderer/components/Option';
import { ITypeComponent } from '@app/renderer/components/Record';
import { ThrowModalType } from '@app/renderer/constants/modals';

import { IDispatch } from '@app/renderer/modules/store';

import { Container, ItemContainer, SelectOptionCSS } from './styled';

type IConnectProps = ReturnType<typeof mapDispatch> &
  FieldRenderProps<HTMLElement> &
  ITypeComponent;

const ColumnTypeMultiSelect: React.FC<IConnectProps> = ({
  addThrowModal,
  removeThrowModal,
  className,
  cell,
  input: { onChange, value },
  isDisabled,
}) => {
  const { choices } = cell.typeOptions;

  let options: IOption[] = [];
  if (!isDisabled) {
    options = value
      ? choices.filter(
          (choice: IOption) => value.findIndex((item: IOption) => item.id === choice.id) === -1,
        )
      : choices;
  }
  const positionRef = useRef<HTMLDivElement>(null);

  const handleOpenDropdown = useCallback(
    (e) => {
      e.preventDefault();
      addThrowModal({
        type: ThrowModalType.Select,
        parentSize: positionRef.current && positionRef.current.getBoundingClientRect(),
        props: {
          options,
          renderOption: (option: IOption) => <SelectOption option={option} />,
          onClickOption(option: IOption) {
            const oldValue = value || [];
            onChange(oldValue.concat([option]) as any);
            removeThrowModal();
          },
          onClose: removeThrowModal,
          width: 296,
          offset: { left: 0, top: -20 },
        },
      });
    },
    [options, value],
  );

  const handleRemoveOption = useCallback(
    (choice: IOption) => {
      const newValue = value.filter((option: IOption) => option.id !== choice.id);
      onChange(newValue);
    },
    [value],
  );

  return (
    <Container className={className}>
      {!isDisabled && (
        <div ref={positionRef}>
          <ButtonIconTitle titleId="global.selectAnOption" onClick={handleOpenDropdown} />
        </div>
      )}
      <ItemContainer>
        {value &&
          value.map((option: IOption, index: number) => (
            <SelectOption
              css={SelectOptionCSS}
              onRemove={isDisabled ? undefined : handleRemoveOption}
              option={option}
              key={index}
            />
          ))}
      </ItemContainer>
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
