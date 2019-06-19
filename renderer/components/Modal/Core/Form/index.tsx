import React from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import Button from '@app/renderer/components/Button';
import ButtonIcon from '@app/renderer/components/Button/Icon';
import FormInputText from '@app/renderer/components/Form/FormInputText';
import Icon, { glyphs } from '@app/renderer/components/Icon';

import { CORE_COLORS, CORE_ICONS } from '@app/renderer/constants/cores';

import { required } from '@app/renderer/utils/validation';

import CoreFormAddColor from '../Color';
import CoreFormAddIcon from '../Icon';

import {
  BottomContainer,
  Container,
  FieldContainer,
  FieldStyle,
  IconStyle,
  IconTitleStyle,
  PreviewContainer,
  Title,
  TitleInputStyle,
  TopContainer,
} from './styled';

export enum ModalType {
  Core,
  Workspace,
}

interface IModalForm extends FormRenderProps {
  onClose: () => void;
  titleId: string;
  type: ModalType;
}

const ModalForm: React.FC<IModalForm> = ({
  handleSubmit,
  onClose,
  values,
  hasValidationErrors,
  titleId,
  type,
}) => {
  const { color, icon } = values;
  const fieldName = type === ModalType.Core ? 'coreName' : 'name';
  const name = values[fieldName];

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <TopContainer>
          <Title>
            <FormattedMessage id={titleId} />
          </Title>
          <ButtonIcon
            onClick={onClose}
            iconProps={{ size: { height: 20, width: 20 }, icon: glyphs.REMOVE }}
          />
        </TopContainer>
        <FieldContainer>
          <Field
            autoComplete="off"
            css={TitleInputStyle}
            component={FormInputText}
            validate={required('Title is required')}
            name={fieldName}
            titleId="form.core.workspace.modal.input.title"
          />
          <PreviewContainer color={CORE_COLORS[color]}>
            {icon === 'untitle' ? (
              <IconTitleStyle>{name ? name.slice(0, 2).toUpperCase() : 'Un'}</IconTitleStyle>
            ) : (
              <Icon
                css={IconStyle}
                icon={glyphs[CORE_ICONS[icon]]}
                size={{ height: 40, width: 40 }}
              />
            )}
          </PreviewContainer>
          <Field css={FieldStyle} component={CoreFormAddColor} name="color" />
          <Field css={FieldStyle} component={CoreFormAddIcon} name="icon" />
        </FieldContainer>
        <BottomContainer>
          <Button isDisabled={hasValidationErrors} onClick={handleSubmit}>
            <FormattedMessage id="global.save" />
          </Button>
        </BottomContainer>
      </Container>
    </form>
  );
};

export default ModalForm;
