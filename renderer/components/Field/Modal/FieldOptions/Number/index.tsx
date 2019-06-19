import React, { useCallback } from 'react';
import { Field } from 'react-final-form';

import { FIELD_TYPES } from '@app/renderer/constants/fieldTypes';

import FormInputNumber from '@app/renderer/components/Form/FormInputNumber';
import FormInputSelect from '@app/renderer/components/Form/FormInputSelect';

import TabContainer from '../../Tab';
import { FieldCSS, IFieldOptions } from '../shared';
import { DefaultCSS } from './styled';

const tabIds = ['form.field.option.numberFormat', 'form.field.option.numberTabDefault'];
const { precisionOptions } = FIELD_TYPES.NUMBER;

const FieldOptionNumber: React.FC<IFieldOptions> = ({ className }) => {
  const handleRender = useCallback((selectedIndex: number) => {
    switch (selectedIndex) {
      case 0:
        return (
          <Field
            titleId="form.field.option.numberPrecision"
            css={FieldCSS}
            isSmall={true}
            options={precisionOptions}
            component={FormInputSelect as any}
            name="typeOptions.precision"
          />
        );
      case 1:
        return (
          <Field
            titleId="form.field.default.number"
            placeholderId="form.field.default.numberPlaceholder"
            css={DefaultCSS}
            autoComplete="off"
            isSmall={true}
            component={FormInputNumber}
            name="typeOptions.defaultNumber"
          />
        );
    }
  }, []);

  return (
    <TabContainer tabIds={tabIds} className={className}>
      {(selectedIndex: number) => handleRender(selectedIndex)}
    </TabContainer>
  );
};

export default FieldOptionNumber;
