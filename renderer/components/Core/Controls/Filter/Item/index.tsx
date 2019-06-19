import { observer } from 'mobx-react-lite';
import React from 'react';
import { compose } from 'react-apollo';

import FormInputSelectMini from '@app/renderer/components/Form/FormInputSelect/Mini';
import FormInputTextMini from '@app/renderer/components/Form/FormInputText/Mini';
import { glyphs } from '@app/renderer/components/Icon';

import ButtonIcon from '@app/renderer/components/Button/Icon';

import { Container, DeleteIconStyle, gapRight, gapRightAndStretch, Precursor } from './styled';

interface IProps {
  config: any;
  index: number;
  editFilter: (index: number, field: string, value: string) => void;
  removeFilter: (index: number) => void;
  fieldOptions: (index: number) => Array<{ [key: string]: string }>;
  filterOptionsByIndex: (index: number) => void;
}

const FilterItem: React.FC<IProps> = ({
  config,
  index,
  editFilter,
  removeFilter,
  filterOptionsByIndex,
  fieldOptions,
}) => {
  const options = fieldOptions(index);
  if (options.length === 0) return null;

  return (
    <Container>
      <ButtonIcon
        css={DeleteIconStyle}
        iconProps={{
          size: { height: 11, width: 11 },
          icon: glyphs.REMOVE,
        }}
        onClick={() => removeFilter(index)}
      />
      <Precursor css={gapRight}>{config.precursor}</Precursor>
      <FormInputSelectMini
        value={config.field}
        options={options}
        onClick={(option: any) => editFilter(index, 'field', option.value)}
        css={gapRightAndStretch}
      />
      <FormInputSelectMini
        value={config.operator}
        options={filterOptionsByIndex(index)}
        onClick={(option: any) => editFilter(index, 'operator', option.value)}
        css={gapRight}
      />
      <FormInputTextMini
        value={config.filter}
        onSubmit={(value: string) => editFilter(index, 'filter', value)}
      />
    </Container>
  );
};

export default compose(observer)(FilterItem);
