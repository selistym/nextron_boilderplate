import Routes from '@app/renderer/routes';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import IconTitle from '@app/renderer/components/Button/IconTitle';
import DropdownSelector from '@app/renderer/components/Dropdown/Selector';
import { glyphs } from '@app/renderer/components/Icon';
import ThrowWrapper from '@app/renderer/components/Modal/ThrowWrapper';
import { VIEW_ICONS } from '@app/renderer/constants/cores';
import AddNew from '../AddNew';

import { StackModalType } from '@app/renderer/constants/modals';
import { IDispatch, IRootState } from '@app/renderer/modules/store';

import { Container, SelectorOption, ViewBtn } from './styled';

type IConnectProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
interface IProps extends IConnectProps {
  parentSize: any;
}

const ViewOptionsModal: React.FC<IProps> = ({
  parentSize,
  activeTableOption,
  activeIds: { workspaceId, coreId, tableId, viewId },
  viewOptionsById,
  removeThrowModal,
  addStackModal,
}) => {
  const options = activeTableOption.viewOptionsAllIds.map((vId: string) => ({
    ...viewOptionsById[vId],
    value: viewOptionsById[vId].id,
  }));

  return (
    <ThrowWrapper
      parentSize={parentSize}
      onClose={removeThrowModal}
      avoidElementVert={true}
      size={{ width: 300 }}
    >
      <Container>
        <DropdownSelector
          options={options}
          onClick={(option) => {
            if (viewId !== option.value) {
              const newRoute = `/core/${workspaceId}/${coreId}/${tableId}/${option.value}`;
              Routes.Router.pushRoute(newRoute);
            }
            removeThrowModal();
          }}
          onClose={removeThrowModal}
          optionRenderer={(option: any) => <ViewOption option={option} />}
        />
        <AddNew
          onClickAdd={() => {
            removeThrowModal();
            addStackModal({ type: StackModalType.AddView });
          }}
        />
      </Container>
    </ThrowWrapper>
  );
};

const ViewOption = React.memo(({ option }: any) => (
  <SelectorOption>
    <IconTitle
      icon={glyphs[VIEW_ICONS[option.type]]}
      title={option.name}
      onClick={() => {}}
      iconSize={{ width: 18, height: 18 }}
      css={ViewBtn}
    />
  </SelectorOption>
));

const mapState = ({ core }: IRootState) => ({
  activeTableOption: get(core, `tableOptions.byId[${core.activeIds.tableId}]`, {}),
  activeIds: core.activeIds,
  viewOptionsById: core.viewOptions.byId,
});

const mapDispatch = ({ app, core }: IDispatch) => ({
  removeThrowModal: () => app.removeThrowModal(),
  addStackModal: (payload) => app.addStackModal(payload),
});

export default connect(
  mapState,
  mapDispatch,
)(ViewOptionsModal);
