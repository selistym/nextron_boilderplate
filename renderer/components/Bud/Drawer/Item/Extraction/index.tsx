import React from 'react';
import { Field, Form } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Button from '@app/renderer/components/Button';
import ButtonIconTitle from '@app/renderer/components/Button/IconTitle';
import FormInputSelect from '@app/renderer/components/Form/FormInputSelect';
import { glyphs } from '@app/renderer/components/Icon';
import AttachmentForm from '@app/renderer/components/Record/Modal/Form/Attachment/Form';
import { StackModalType } from '@app/renderer/constants/modals';

import { adaptExtractionRules } from '@app/renderer/modules/coreBuds/adapter';
import { AVAILABLE_BUDS, BudType } from '@app/renderer/modules/coreBuds/constants';
import { IDispatch } from '@app/renderer/modules/store';

import { RuleBtns, Title } from './styled';

import { required } from '@app/renderer/utils/validation';

type IConnectProps = ReturnType<typeof mapDispatch>;
interface IProps extends IConnectProps {
  budRow: any;
}

const budInstanceMeta = AVAILABLE_BUDS[BudType.EXTRACTION].budInstance;
const BudItemExtraction: React.FC<IProps> = ({ addStackModal, budRow, submitBudInstance }) => {
  const ruleCol = budRow[budInstanceMeta.column.rules];

  return (
    <Form
      onSubmit={(values) =>
        submitBudInstance(values, { budInstance: budRow.id, budType: budRow.type })
      }
      render={({ handleSubmit, invalid }) => (
        <form onSubmit={handleSubmit}>
          <Field
            titleId="coreBuds.item.extraction.selectARule"
            isSmall={true}
            css={{ marginBottom: '10px' }}
            name="extractionRuleSet"
            component={FormInputSelect as any}
            validate={required('global.errorIsRequired')}
            options={(ruleCol && adaptExtractionRules(ruleCol.foreignRow)) || []}
          />
          <RuleBtns>
            <ButtonIconTitle
              titleId="coreBuds.item.extraction.manageRules"
              icon={glyphs.EDIT}
              onClick={() =>
                addStackModal({
                  coreId: budInstanceMeta.coreId,
                  workspaceId: budInstanceMeta.workspaceId,
                  tableId: budInstanceMeta.tableId,
                  rowId: budRow.id,
                })
              }
            />
          </RuleBtns>
          <Title isSmall={true}>
            <FormattedMessage id="coreBuds.item.extraction.uploadFile" />
          </Title>
          <Field
            name="extractionFile"
            isDisabled={false}
            component={AttachmentForm}
            validate={required('global.errorIsRequired')}
          />
          <Button isSecondary={true} isSmall={true} onClick={handleSubmit} isDisabled={invalid}>
            <FormattedMessage id="global.submit" />
          </Button>
        </form>
      )}
    />
  );
};

const mapDispatch = ({ app, coreBuds }: IDispatch) => ({
  addStackModal: (props) => app.addStackModal({ props, type: StackModalType.Record }),
  submitBudInstance: (values, meta) => coreBuds.submitBudInstance({ values, meta }),
});

export default connect(
  () => ({}),
  mapDispatch,
)(BudItemExtraction);
