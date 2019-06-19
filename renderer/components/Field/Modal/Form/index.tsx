import React, { Fragment, useCallback, useState } from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import { FormattedMessage, InjectedIntl, injectIntl } from 'react-intl';

import FormInputText from '@app/renderer/components/Form/FormInputText';
import { glyphs } from '@app/renderer/components/Icon';
import { FIELD_TYPES } from '@app/renderer/constants/fieldTypes';
import { required } from '@app/renderer/utils/validation';

import TypeDropdown from '../TypeDropdown';

import FieldOptionCollaborator from '../FieldOptions/Collaborator';
import FieldOptionDate from '../FieldOptions/Date';
import FieldOptionFormula from '../FieldOptions/Formula';
import FieldOptionLookup from '../FieldOptions/Lookup';
import FieldOptionNumber from '../FieldOptions/Number';
import FieldOptionRecordReference from '../FieldOptions/RecordReference';
import FieldOptionSelect from '../FieldOptions/Select';
import FieldOptionTableReference from '../FieldOptions/TableReference';

import {
  ArrowDown,
  BottomContainer,
  ButtonCancel,
  ButtonSave,
  Container,
  Description,
  FieldOptionCSS,
  MiddleContainer,
  StyledForm,
  StyledIcon,
  TopContainer,
  TypeButton,
  TypeDropdownMixin,
  TypeName,
} from './styled';

const fieldTypes = Object.values(FIELD_TYPES).map((item) => ({
  key: item.name,
  value: item.type,
  icon: item.icon,
}));

const TYPE_MAP: { [key: string]: any } = {
  NUMBER: FieldOptionNumber,
  // COLLABORATOR: FieldOptionCollaborator,
  DATETIME: FieldOptionDate,
  SELECT: FieldOptionSelect,
  MULTI_SELECT: FieldOptionSelect,
  RECORD_REFERENCE: FieldOptionRecordReference,
  LOOKUP: FieldOptionLookup,
  // TABLE_REFERENCE: FieldOptionTableReference,
  // FORMULA: FieldOptionFormula,
};
export interface IFieldModalForm extends FormRenderProps {
  onClose: () => void;
  intl: InjectedIntl;
}

const FieldModalForm: React.FC<IFieldModalForm> = ({
  handleSubmit,
  intl: { formatMessage },
  onClose,
  values: { type },
}) => {
  const [selectorOpen, handleSelectorOpen] = useState(false);
  const handleClose = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
  }, []);

  const FieldOptionComponent = TYPE_MAP[type];
  const { name, description } = FIELD_TYPES[type];
  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <TopContainer>
          <Field
            autoComplete="off"
            isSmall={true}
            component={FormInputText}
            name="name"
            validate={required(formatMessage({ id: 'global.errorIsRequired' }))}
          />
        </TopContainer>
        <MiddleContainer>
          {selectorOpen ? (
            <Field
              component={TypeDropdown as any}
              css={TypeDropdownMixin}
              options={fieldTypes}
              name="type"
              onClose={() => handleSelectorOpen(false)}
              placeholderId="form.field.title.findAType"
            />
          ) : (
            <Fragment>
              <TypeButton onClick={() => handleSelectorOpen(true)}>
                <StyledIcon
                  size={{ width: 16, height: 16 }}
                  icon={glyphs[FIELD_TYPES[type].icon]}
                />
                <TypeName>{name && <FormattedMessage id={name} />}</TypeName>
                <ArrowDown size={{ width: 10, height: 10 }} icon={glyphs.ARROW_DROPDOWN} />
              </TypeButton>
              <Description>{description && <FormattedMessage id={description} />}</Description>
              {FieldOptionComponent && (
                <Field name="typeOptions" component={FieldOptionComponent} css={FieldOptionCSS} />
              )}
            </Fragment>
          )}
        </MiddleContainer>
        <BottomContainer>
          <ButtonCancel onClick={handleClose}>
            <FormattedMessage id="global.cancel" />
          </ButtonCancel>
          <ButtonSave
            isSmall={true}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormattedMessage id="global.save" />
          </ButtonSave>
        </BottomContainer>
      </StyledForm>
    </Container>
  );
};

export default injectIntl(FieldModalForm);
