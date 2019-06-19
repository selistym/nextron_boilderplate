import { LicenseManager } from 'ag-grid-enterprise';
import React from 'react';

import Grid from '@app/renderer/components/Grid';

// Setting license for agGrid. We have to put it here because agGridEnterprise can only be loaded in Client side
LicenseManager.setLicenseKey(
  'Evaluation_License-_Not_For_Production_Valid_Until_7_July_2019__MTU2MjQ1NDAwMDAwMA==fed960679205b68cd00195b0aaf9b162',
);

const GridWrapper = (props: any) => <Grid {...props} />;

export default GridWrapper;
