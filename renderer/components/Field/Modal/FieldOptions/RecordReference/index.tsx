import React, { useEffect, useState } from 'react';
import { ChildDataProps } from 'react-apollo';
import { Field } from 'react-final-form';
import { connect } from 'react-redux';

import { FieldCSS, IFieldOptions } from '../shared';

import FormInputSelect from '@app/renderer/components/Form/FormInputSelect';
import Spinner from '@app/renderer/components/Loading/Spinner';

import { GetWorkspaceOptionsAndCoresQuery_workspace as IWorkspace } from '@app/renderer/graphql/workspace/types/GetWorkspaceOptionsAndCoresQuery';
// import { getWorkspaceCores } from '@app/renderer/modules/cores/network';
import { getCore } from '@app/renderer/modules/core/network';

import { IRootState } from '@app/renderer/modules/store';

interface IRecordReference extends IFieldOptions {
  activeWorkspaceId: string;
  activeCoreId: string;
}

const RecordReference: React.FC<ChildDataProps<IRecordReference, IWorkspace>> = ({
  activeCoreId,
  activeWorkspaceId,
  className,
  // input: { value },
}) => {
  const [workspace, setWorkspace] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // https://github.com/facebook/react/pull/14069
  useEffect(() => {
    (async () => {
      const response = await getCore(
        { id: activeWorkspaceId },
        { coreId: activeCoreId },
        true,
        false,
      );
      const currentWorkspace = response.workspace;
      setWorkspace(currentWorkspace);
      setIsLoading(false);
    })();
  }, []);
  const cores = workspace ? workspace.cores : [];
  // const coreOptions = cores.map((core) => ({ name: core!.name, value: core!.id }));
  // const selecedCoreId = value && value.referenceCore;

  // const selectedCoreId = activeCoreId;

  // const referenceTables = [];
  // if (selectedCoreId && cores[0]) {
  //   referenceTables = cores[0].tableOptions;
  //   // const selectedCore: any = cores.find((core) => core!.id === selectedCoreId);
  //   // if (selectedCore) {
  //   //   referenceTables = selectedCore.tables || [];
  //   // }
  // }

  const tablesOptions =
    (cores[0] &&
      cores[0].tableOptions.map((table: any) => ({
        name: table.name,
        value: table.id,
      }))) ||
    [];

  return isLoading ? (
    <Spinner size="small" strokeWidth="2px" />
  ) : (
    <div className={className}>
      <Field
        isSmall={true}
        options={tablesOptions}
        titleId="form.field.title.selectTable"
        css={FieldCSS}
        component={FormInputSelect as any}
        name="typeOptions.foreignTableId"
      />
      {/* <Field
        isSmall={true}
        options={coreOptions}
        titleId="form.field.title.selectCore"
        css={FieldCSS}
        component={FormInputSelect as any}
        name="typeOptions.referenceCore"
      />
      {selecedCoreId && (
        <Field
          isSmall={true}
          options={tablesOptions}
          titleId="form.field.title.selectTable"
          css={FieldCSS}
          component={FormInputSelect as any}
          name="typeOptions.referenceTable"
        />
      )} */}
    </div>
  );
};

const mapState = ({ core }: IRootState) => ({
  activeWorkspaceId: core.activeIds.workspaceId,
  activeCoreId: core.activeIds.coreId, // Remove this if we can choose cores in the future;
});

export default connect(mapState)(RecordReference);
