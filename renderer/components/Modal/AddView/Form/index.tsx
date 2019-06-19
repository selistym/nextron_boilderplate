import { get } from 'lodash';
import React from 'react';
import { compose } from 'react-apollo';
import { Field, FormRenderProps } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { FormattedMessage, InjectedIntl, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import Button from '@app/components/Button';
import ButtonIcon from '@app/components/Button/Icon';
import { glyphs } from '@app/components/Icon';

import FormInputSelect from '@app/components/Form/FormInputSelect';
import FormInputSwitch from '@app/components/Form/FormInputSwitch';
import FormInputText from '@app/components/Form/FormInputText';

import { StackModalType } from '@app/constants/modals';
import { IDispatch } from '@app/modules/store';

import { required } from '@app/utils/validation';

import ButtonIconTitle from '@app/components/Button/IconTitle';

import {
  BottomContainer,
  Collaborator,
  CollaboratorTitle,
  Container,
  Content,
  DateContainer,
  DateOptionMixin,
  DateWarning,
  FormInputSwitchMixin,
  GlobalFilter,
  GlobalFilterTitle,
  Title,
  TopContainer,
} from './styled';

type IConnectProps = ReturnType<typeof mapDispatch>;

const viewTypes = [
  {
    nameId: 'view.title.grid',
    value: 'GRID',
  },
  {
    nameId: 'view.option.timeline',
    value: 'TIMELINE',
  },
  {
    nameId: 'view.option.list',
    value: 'LIST',
  },
];

interface IAddViewForm extends IConnectProps, FormRenderProps {
  intl: InjectedIntl;
  columns: any[];
}

const AddViewForm: React.FC<IAddViewForm> = ({
  columns,
  handleSubmit,
  hasValidationErrors,
  form,
  values,
  addStackModal,
  removeStackModal,
  intl: { formatMessage },
}) => {
  const dateColumns = columns.filter((col) => col.typeOptions.type === 'DATETIME');

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <TopContainer>
          <Title>
            <FormattedMessage id="view.add.title" />
          </Title>
          <ButtonIcon
            isTabable={false}
            onClick={(e: React.SyntheticEvent) => {
              e.preventDefault();
              removeStackModal();
            }}
            iconProps={{ size: { width: 15, height: 15 }, icon: glyphs.REMOVE }}
          />
        </TopContainer>
        <Content>
          <Field
            name="name"
            component={FormInputText}
            titleId="view.add.title.name"
            validate={required(formatMessage({ id: 'global.errorIsRequired' }))}
          />
          <Field
            name="type"
            titleId="view.add.title.type"
            component={FormInputSelect as any}
            options={viewTypes}
          />
          {values.type === 'TIMELINE' &&
            (dateColumns.length >= 2 ? (
              <DateContainer>
                <Field
                  css={DateOptionMixin}
                  name="viewOptions.startDate"
                  titleId="view.add.start.date"
                  component={FormInputSelect as any}
                  options={dateColumns.map((col) => ({ name: col.headerName, value: col.field }))}
                />
                <Field
                  css={DateOptionMixin}
                  name="viewOptions.endDate"
                  titleId="view.add.end.date"
                  component={FormInputSelect as any}
                  options={dateColumns.map((col) => ({ name: col.headerName, value: col.field }))}
                />
              </DateContainer>
            ) : (
              <DateWarning>
                <FormattedMessage id="form.field.error.timelineNeedsDates" />
              </DateWarning>
            ))}
          <GlobalFilter>
            <GlobalFilterTitle>Global filters</GlobalFilterTitle>
            <FieldArray name="columns">
              {({ fields }) =>
                fields.map((name, index) => {
                  const { type, columns: columnsValue } = values;
                  const selectedCount = columnsValue.filter((column: any) => column.isSelected)
                    .length;
                  const isDisabledField = !columnsValue[index].isSelected;
                  const isDisabled = type === 'LIST' && selectedCount >= 5 && isDisabledField;
                  const title = get(columns, `[${index}].headerName`, 'Unnamed field');
                  return (
                    <Field
                      key={index}
                      title={title}
                      name={`${name}.isSelected`}
                      component={FormInputSwitch}
                      css={FormInputSwitchMixin}
                      isDisabled={isDisabled}
                    />
                  );
                })
              }
            </FieldArray>
          </GlobalFilter>
          <Collaborator>
            <CollaboratorTitle>Collaborators</CollaboratorTitle>
            <ButtonIconTitle
              onClick={(e: React.SyntheticEvent) => {
                e.preventDefault();
                addStackModal({
                  type: StackModalType.ShareView,
                  props: {
                    onSubmit: (value: any) => {
                      form.change('collaborators', value.collaborators);
                      removeStackModal();
                    },
                  },
                });
              }}
              titleId="share.view.add.collaborator"
            />
          </Collaborator>
        </Content>
        <BottomContainer>
          <Button
            isDisabled={
              hasValidationErrors || (values.type === 'TIMELINE' && dateColumns.length < 2)
            }
            onClick={(e: React.SyntheticEvent) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormattedMessage id="view.add.title" />
          </Button>
        </BottomContainer>
      </Container>
    </form>
  );
};

const mapDispatch = ({ app }: IDispatch) => ({
  addStackModal: (props: any) => app.addStackModal(props),
  removeStackModal: () => app.removeStackModal(),
});

export default compose(
  connect(
    undefined,
    mapDispatch,
  ),
  injectIntl,
)(AddViewForm);
