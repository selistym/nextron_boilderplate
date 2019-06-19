import React, { useCallback, useState } from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import { FormattedMessage, InjectedIntl, injectIntl } from 'react-intl';

import Button from '@app/components/Button';
import ButtonGeneric from '@app/components/Button/Generic';

import FormInputSwitch from '@app/components/Form/FormInputSwitch';

import {
  BottomContainer,
  ButtonContainer,
  Container,
  FormInputSwitchMixin,
  Input,
  ListContainer,
  TopContainer,
} from './styled';

interface IModalHideColumn extends FormRenderProps {
  columns: any[];
  intl: InjectedIntl;
}

const ModalHideColumnForm: React.FC<IModalHideColumn> = ({
  handleSubmit,
  columns,
  form: { change },
  intl: { formatMessage },
  values,
}) => {
  const [filteredColumns, setFilteredColumns] = useState(columns);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = e.target.value.toLowerCase();
      setFilteredColumns(
        columns.filter((column) => column.headerName.toLowerCase().indexOf(searchText) !== -1),
      );
    },
    [columns],
  );
  const handleHideAll = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    Object.keys(values).forEach((name: string) => {
      change(name, false);
    });
  }, []);
  const handleShowAll = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    Object.keys(values).forEach((name: string) => {
      change(name, true);
    });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <TopContainer>
          <Input
            placeholder={formatMessage({ id: 'view.config.input.placeholder' })}
            onChange={handleChange}
          />
        </TopContainer>
        <ListContainer>
          {filteredColumns &&
            filteredColumns.map((column: any) => (
              <Field
                key={column.field}
                title={column.headerName}
                name={column.field}
                component={FormInputSwitch}
                css={FormInputSwitchMixin}
              />
            ))}
        </ListContainer>
        <ButtonContainer>
          <ButtonGeneric onClick={handleHideAll}>
            <FormattedMessage id="view.config.hideAll" />
          </ButtonGeneric>
          <ButtonGeneric onClick={handleShowAll}>
            <FormattedMessage id="view.config.showAll" />
          </ButtonGeneric>
        </ButtonContainer>
        <BottomContainer>
          <Button
            width={100}
            isSmall={true}
            onClick={(e: React.SyntheticEvent) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormattedMessage id="global.save" />
          </Button>
        </BottomContainer>
      </Container>
    </form>
  );
};

export default injectIntl(ModalHideColumnForm);
