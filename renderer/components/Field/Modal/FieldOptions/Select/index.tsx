import { omit } from 'lodash';
import React, { useCallback, useState } from 'react';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import uuidv1 from 'uuid/v1';
import { IFieldOptions } from '../shared';

import { KEY_CODES } from '@app/renderer/constants/app';

import ButtonIconTitle from '@app/renderer/components/Button/IconTitle';

import Option from './Option';

import { BottomContainer, Container, Empty, MiddleContainer } from './styled';

// interface IChoice {
//   id: string;
//   name: string;
// }

const InnerFields: React.FC<IFieldOptions> = ({ input: { value, onChange }, className }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleAddOption = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      setSelectedIndex(value.choiceOrder.length);
      const choiceId = uuidv1();
      onChange({
        choiceOrder: [...value.choiceOrder, choiceId],
        choices: { ...value.choices, [choiceId]: { id: choiceId, name: '' } },
      } as any);
    },
    [value],
  );

  const handleRemoveOption = useCallback(
    (optionId: string) => {
      onChange({
        choiceOrder: value.choiceOrder.filter((choiceId: string) => choiceId !== optionId),
        choices: omit(value.choices, [optionId]),
      } as any);
    },
    [value],
  );     

  // const handleAlphabetize = useCallback(
  //   (e: React.SyntheticEvent) => {
  //     e.preventDefault();
  //     const choicesList = Object.values(value.choices);
  //     const sortedList = sortBy(choicesList, (choice: IChoice) => choice.name);
  //     onChange({
  //       ...value,
  //       choiceOrder: sortedList.map((choice: any) => choice.id),
  //     } as any);
  //   },
  //   [value],
  // );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.keyCode) {
        case KEY_CODES.ENTER: {
          e.preventDefault();
          const choice = value.choices[value.choiceOrder[selectedIndex]];
          if (!choice || !choice.name) {
            return;
          }
          const choiceId = uuidv1();
          onChange({
            choiceOrder: [
              ...value.choiceOrder.slice(0, selectedIndex + 1),
              choiceId,
              ...value.choiceOrder.slice(selectedIndex + 1),
            ],
            choices: { ...value.choices, [choiceId]: { id: choiceId, name: '' } },
          } as any);
          setSelectedIndex(selectedIndex + 1);
          break;
        }
        case KEY_CODES.ARROW_UP: {
          e.preventDefault();
          const newIndex = Math.max(0, selectedIndex - 1);
          setSelectedIndex(newIndex);
          break;
        }
        case KEY_CODES.ARROW_DOWN: {
          e.preventDefault();
          const newIndex = Math.min(value.choiceOrder.length - 1, selectedIndex + 1);
          setSelectedIndex(newIndex);
          break;
        }
        default:
          break;
      }
    },
    [value, selectedIndex],
  );
  const hasChoices = value.choiceOrder.length > 0;

  return (
    <Container className={className}>
      {/* <TopContainer>
        <ButtonIconTitle
          titleId="form.field.options.alphabetize"
          onClick={handleAlphabetize}
          icon={glyphs.ALPHA_SORT}
        />
      </TopContainer> */}
      <MiddleContainer onKeyDown={handleKeyDown}>
        {hasChoices ? (
          value.choiceOrder.map((choiceId: string, index: number) => (
            <Field
              component={Option as any}
              index={index}
              isFocused={index === selectedIndex}
              key={choiceId}
              name={`typeOptions.choices.${choiceId}`}
              onRemove={() => handleRemoveOption(choiceId)}
              onFocus={() => setSelectedIndex(index)}
            />
          ))
        ) : (
          <Empty>
            <FormattedMessage id="form.field.options.noOptionsDefined" />
          </Empty>
        )}
      </MiddleContainer>
      <BottomContainer>
        <ButtonIconTitle titleId="form.field.options.addOption" onClick={handleAddOption} />
      </BottomContainer>
    </Container>
  );
};

export default InnerFields;
