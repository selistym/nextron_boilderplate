import {
  AddCoreInput,
  WorkspaceIdInput,
  WorkspaceSubscriptionInput,
} from '@app/renderer/types/graphql-global-types';

export interface ICoresState {
  isLoading: boolean;
  workspaces: any[];
  cores: any[];
  activeWorkspaceId?: string;
}

export { AddCoreInput, WorkspaceIdInput, WorkspaceSubscriptionInput };
