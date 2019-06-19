import React, { useCallback, useRef } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { connect } from 'react-redux';

import { ThrowModalType } from '@app/constants/modals';

import { COLLABORATORS } from '@app/modules/settings/fakaData';

import UserItem from '@app/components/User/Item';

import {
  Auth,
  AuthIconMixin,
  Container,
  DropdownButton,
  DropdownIconMixin,
  ItemRight,
  Option,
  UserItemMixin,
} from './styled';

import Icon, { glyphs } from '@app/components/Icon';

import { IDispatch } from '@app/modules/store';

type IConnectProps = ReturnType<typeof mapDispatch>;

const options = [{ name: 'Edit', value: 'edit' }, { name: 'Admin', value: 'admin' }];

interface ICollaboratorItem extends IConnectProps, FieldRenderProps<HTMLElement> {
  item: any;
}

const CollaboratorItem: React.FC<ICollaboratorItem> = ({
  input: { value, onChange },
  addThrowModal,
  removeThrowModal,
}) => {
  const posRef = useRef<HTMLButtonElement>(null);

  const item: any = COLLABORATORS.find((collaborator) => collaborator.userId === value.userId);

  const auth = options.find((option) => option.value === value.auth);

  const { email, firstName, lastName, avatar } = item;

  const handleEditAuth = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    addThrowModal({
      type: ThrowModalType.Select,
      parentSize: posRef && posRef.current && posRef.current.getBoundingClientRect(),
      props: {
        options,
        onClickOption: (option: any) => {
          onChange({ ...value, auth: option.value });
          removeThrowModal();
        },
        renderOption: (option: any) => <Option>{option.name}</Option>,
        onClose: removeThrowModal,
      },
    });
  }, []);

  return (
    <Container>
      <UserItem
        css={UserItemMixin}
        email={email}
        firstName={firstName}
        lastName={lastName}
        avatar={avatar}
      />
      <ItemRight>
        <DropdownButton ref={posRef} onClick={handleEditAuth}>
          <Icon css={AuthIconMixin} icon={glyphs.AUTH} size={{ width: 15, height: 15 }} />
          <Auth>{auth.name}</Auth>
          <Icon
            css={DropdownIconMixin}
            icon={glyphs.ARROW_DROPDOWN}
            size={{ width: 11, height: 11 }}
          />
        </DropdownButton>
      </ItemRight>
    </Container>
  );
};

const mapDispatch = ({ app }: IDispatch) => ({
  addThrowModal: (props: any) => app.addThrowModal(props),
  removeThrowModal: () => app.removeThrowModal(),
});

export default connect(
  () => ({}),
  mapDispatch,
)(CollaboratorItem);
