import { LicenseManager } from 'ag-grid-enterprise';
import React from 'react';

import List from '@app/renderer/components/List';

// Setting license for agGrid. We have to put it here because agGridEnterprise can only be loaded in Client side
LicenseManager.setLicenseKey(
  'Evaluation_License-_Not_For_Production_Valid_Until_7_July_2019__MTU2MjQ1NDAwMDAwMA==fed960679205b68cd00195b0aaf9b162',
);

const ListWrapper = (props: any) => <List {...props} />;

export default ListWrapper;
