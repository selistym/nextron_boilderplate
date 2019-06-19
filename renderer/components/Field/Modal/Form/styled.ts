import styled, { css } from 'styled-components';

import Button from '@app/renderer/components/Button';
import ButtonGeneric from '@app/renderer/components/Button/Generic';
import Icon from '@app/renderer/components/Icon';
import { modalContainerMixin } from '@app/renderer/components/Shared';
import { P2Mixin } from '@app/renderer/components/Shared/Typescale';

import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  width: 300px;
  ${modalContainerMixin}
`;

export const StyledForm = styled.form`
  padding-top: 16px;
`;

export const TopContainer = styled.div`
  padding: 0px 16px;
`;

export const MiddleContainer = styled.div`
  height: 100%;
`;

export const BottomContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 16px;
`;

export const ButtonCancel = styled(ButtonGeneric)`
  margin-right: 20px;
`;

export const ButtonSave = styled(Button)`
  width: 82px;
  height: 40px;
`;

export const StyledIcon = styled(Icon)`
  color: ${COLORS.grayText};
  margin-right: 8px;
`;

export const TypeButton = styled.button`
  align-items: center;
  background-color: white;
  border: 1px solid ${COLORS.grayDisabled};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  height: 40px;
  margin: 0px 16px 8px;
  outline: none;
  padding-left: 10px;
  position: relative;
  width: calc(100% - 32px);

  &:focus {
    border-color: ${COLORS.blue};
  }
`;

export const Description = styled.p`
  color: ${COLORS.grayText};
  margin-bottom: 10px;
  padding: 0px 16px;
  ${P2Mixin}
`;

export const TypeName = styled.p`
  color: ${COLORS.grayText};
  margin: 0px;
  ${P2Mixin}
`;

export const ArrowDown = styled(Icon)`
  position: absolute;
  right: 10px;
`;

export const TypeDropdownMixin = css`
  margin: 0px 16px;
`;

export const FieldOptionCSS = css`
  margin-top: 16px;
`;
