import apollo from '@app/utils/api';

import { LOGIN_MUTATION } from '@app/graphql/auth/login.mutation';

import { LoginMutation_login, LoginMutationVariables } from '@app/graphql/auth/types/LoginMutation';

export const login = async ({
  email,
  password,
}: LoginMutationVariables): Promise<LoginMutation_login> => {
  return apollo
    .mutate({
      mutation: LOGIN_MUTATION,
      variables: { email, password },
    })
    .then((result) => result.data);
};
