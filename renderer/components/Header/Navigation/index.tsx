import { Link } from '@app/renderer/routes';
import { RouterProps, withRouter } from 'next/router';
import React from 'react';
import { compose } from 'react-apollo';
import { FormattedMessage } from 'react-intl';

import { Container, NavLink } from './styled';

const ROUTES = [
  {
    pathname: '/cores',
    nameId: 'pageTitle.core',
  },
  // {
  //   pathname: '/marketplace',
  //   nameId: 'pageTitle.marketplace',
  // },
  // {
  //   pathname: '/buds',
  //   nameId: 'pageTitle.buds',
  // },
];

interface IProps {
  router: RouterProps;
}

const HeaderNavigation: React.FC<IProps> = ({ router }) => (
  <Container>
    {ROUTES.map(({ pathname, nameId }) => (
      <Link route={pathname} key={pathname}>
        <NavLink isActive={pathname === router.pathname}>
          <FormattedMessage id={nameId} />
        </NavLink>
      </Link>
    ))}
  </Container>
);

export default compose(withRouter)(HeaderNavigation);
