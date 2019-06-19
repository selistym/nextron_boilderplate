import cookie from 'cookie';
import React, { Fragment, useState } from 'react';
import styled from 'styled-components';

import Button from '@app/renderer/components/Button';
import ButtonGeneric from '@app/renderer/components/Button/Generic';
import Meta from '@app/renderer/components/Meta';
import {
  H1Mixin,
  H2Mixin,
  H3Mixin,
  H4Mixin,
  Label1Mixin,
  Label2Mixin,
  P1Mixin,
  P2Mixin,
} from '@app/renderer/components/Shared/Typescale';
import { Field, Form } from 'react-final-form';

import FieldModal from '@app/renderer/components/Field/Modal';
import ModalReference from '@app/renderer/components/Modal/RecordReference';

import FormInputCheckbox from '@app/renderer/components/Form/FormInputCheckbox';
import FormInputSelect from '@app/renderer/components/Form/FormInputSelect';
import FormInputSwitch from '@app/renderer/components/Form/FormInputSwitch';
import FormInputText from '@app/renderer/components/Form/FormInputText';
import FormInputTextArea from '@app/renderer/components/Form/FormInputTextArea';
import RecordModal from '@app/renderer/components/Record/Modal';

import { fakeData } from '@app/renderer/components/Record/fakeData';

const selectOptions = {
  choices: {
    cs1: {
      id: 'cs1',
      name:
        'choice1111111111111231f12f12f1f1f12f1f1f12f12f12fchoice1111111111111231f12f12f1f1f12f1f1f12f12f12fchoice1111111111111231f12f12f1f1f12f1f1f12f12f12f',
      color: 'blue',
    },
    cs2: {
      id: 'cs2',
      name: 'choice2',
      color: 'cyan',
    },
    cs3: {
      id: 'cs3',
      name: 'choice3',
      color: 'teal',
    },
    cs4: {
      id: 'cs4',
      name: 'choice4',
      color: 'yellow',
    },
    cs5: {
      id: 'cs5',
      name: 'choice5',
      color: 'green',
    },
  },

  choiceOrder: ['cs1', 'cs2', 'cs3', 'cs4', 'cs5'],
};

const Styleguide = () => {
  const [showModal, setShowModal] = useState(false);
  const onShowModalClick = () => setShowModal(true);
  const onExitModalClick = () => setShowModal(false);

  const [showFiledModal, setShowFieldModal] = useState(false);
  const [referenceModalOpen, setShowReferenceModal] = useState(false);

  return (
    <Fragment>
      <Meta />
      <Section>
        <h3 css={H3Mixin}>Typescale</h3>
        <h1 css={H1Mixin}>
          Lorem ipsum dolor sit amet,
          <br /> consectetur adipiscing elit.
        </h1>
        <h2 css={H2Mixin}>
          Lorem ipsum dolor sit amet,
          <br /> consectetur adipiscing elit.
        </h2>
        <h3 css={H3Mixin}>
          Lorem ipsum dolor sit amet,
          <br /> consectetur adipiscing elit.
        </h3>
        <h4 css={H4Mixin}>
          Lorem ipsum dolor sit amet,
          <br /> consectetur adipiscing elit.
        </h4>
        <p css={P1Mixin}>
          Lorem ipsum dolor sit amet,
          <br /> consectetur adipiscing elit.
        </p>
        <p css={P2Mixin}>
          Lorem ipsum dolor sit amet,
          <br /> consectetur adipiscing elit.
        </p>
        <label css={Label1Mixin}>
          Lorem ipsum dolor sit amet,
          <br /> consectetur adipiscing elit.
        </label>
        <br />
        <label css={Label2Mixin}>
          Lorem ipsum dolor sit amet,
          <br /> consectetur adipiscing elit.
        </label>
      </Section>
      <Section>
        <h3 css={H3Mixin}>Buttons</h3>
        <h4 css={H4Mixin}>Normal Size</h4>
        <Button onClick={() => setShowFieldModal(true)}>Field Modal</Button>
        <br />
        <Button onClick={() => setShowReferenceModal(true)}>Reference Modal</Button>
        <br />
        <Button isDisabled={true} onClick={() => {}}>
          Disabled Btn
        </Button>
        <br />
        <h4 css={H4Mixin}>Small Size</h4>
        <Button
          isSmall={true}
          onClick={() => {
            document.cookie = cookie.serialize('locale', 'zh', {
              maxAge: 7 * 24 * 60 * 60,
              path: '/',
            }); // 7 days
          }}
        >
          Set Locale to ZH
        </Button>
        <br />
        <Button isLoading={true} isSmall={true} onClick={() => {}}>
          Loading Btn
        </Button>
        <br />
        <Button isDisabled={true} isSmall={true} onClick={() => {}}>
          Disabled Btn
        </Button>
        <br />
      </Section>
      <Section>
        <h3 css={H3Mixin}>Secondary Buttons</h3>
        <h4 css={H4Mixin}>Normal Size</h4>
        <Button isSecondary={true} onClick={onShowModalClick}>
          Record Modal
        </Button>
        <br />
        <Button isDisabled={true} isSecondary={true} onClick={() => {}}>
          Secondary Btn
        </Button>
        <br />
        <h4 css={H4Mixin}>Small Size</h4>
        <Button isSecondary={true} isSmall={true} onClick={() => {}}>
          Secondary Btn
        </Button>
        <br />
        <Button isDisabled={true} isSmall={true} isSecondary={true} onClick={() => {}}>
          Secondary Btn
        </Button>
        <br />
      </Section>
      <Section>
        <h3 css={H3Mixin}>Generic Buttons</h3>
        <ButtonGeneric onClick={() => {}}>Generic Btn</ButtonGeneric>
        <br />
      </Section>
      <Section>
        <h3 css={H3Mixin}>Form</h3>
        <Form
          initialValues={{ dropdown: '2' }}
          onSubmit={() => {}}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <h4 css={H4Mixin}>Normal Dropdown</h4>
              <Field
                title="First Dropdown"
                css={`
                  margin-bottom: 30px;
                `}
                name="dropdown"
                component={FormInputSelect as any}
                options={[
                  { name: 'one', value: '1' },
                  { name: 'two', value: '2' },
                  { name: 'three', value: '3' },
                  { name: 'four', value: '4' },
                  { name: 'five', value: '5' },
                  { name: 'six', value: '6' },
                  { name: 'seven', value: '7' },
                  { name: 'eight', value: '8' },
                  { name: 'one', value: '9' },
                  { name: 'two', value: '10' },
                  { name: 'three', value: '32' },
                  { name: 'four', value: '42' },
                  { name: 'five', value: '52' },
                  { name: 'six', value: '62' },
                  { name: 'seven', value: '72' },
                  { name: 'eight', value: '82' },
                ]}
              />
              <h4 css={H4Mixin}>Small Dropdown</h4>
              <Field
                isSmall={true}
                css={`
                  margin-bottom: 30px;
                `}
                name="nan"
                component={FormInputSelect as any}
                options={[
                  { name: 'one', value: '1' },
                  { name: 'two', value: '2' },
                  { name: 'three', value: '3' },
                  { name: 'four', value: '4' },
                  { name: 'five', value: '5' },
                  { name: 'six', value: '6' },
                  { name: 'seven', value: '7' },
                  { name: 'eight', value: '8' },
                ]}
              />
              <h4 css={H4Mixin}>InputText Normal</h4>
              <Field
                css={`
                  margin-bottom: 30px;
                `}
                name="input_text"
                component={FormInputText as any}
              />
              <h4 css={H4Mixin}>InputText Small</h4>
              <Field
                isSmall={true}
                css={`
                  margin-bottom: 30px;
                `}
                name="input_text_small"
                component={FormInputText as any}
              />
              <h4 css={H4Mixin}>Textarea</h4>
              <Field
                isSmall={true}
                css={`
                  margin-bottom: 30px;
                `}
                name="input_textarea"
                component={FormInputTextArea as any}
              />
              <h4 css={H4Mixin}>Switch enabled </h4>
              <Field
                css={`
                  margin-bottom: 30px;
                `}
                name="input_switch"
                component={FormInputSwitch as any}
              />
              <h4 css={H4Mixin}>Switch disabled </h4>
              <Field
                isDisabled={true}
                css={`
                  margin-bottom: 30px;
                `}
                name="input_switch_disabled"
                component={FormInputSwitch as any}
              />
              <h4 css={H4Mixin}>Checkbox disabled </h4>
              <Field
                css={`
                  margin-bottom: 30px;
                `}
                name="input_checkbox"
                component={FormInputCheckbox as any}
              />
              <h4 css={H4Mixin}>Checkbox disabled </h4>
              <Field
                isDisabled={true}
                css={`
                  margin-bottom: 30px;
                `}
                name="input_checkbox_disabled"
                component={FormInputCheckbox as any}
              />
            </form>
          )}
        />
      </Section>
      <br />
      <br />
      <br />
      {showModal && <RecordModal record={fakeData} onClose={onExitModalClick} />}
      {showFiledModal && <FieldModal onClose={() => setShowFieldModal(false)} />}

      {referenceModalOpen && (
        <ModalReference
          onClose={() => setShowReferenceModal(false)}
          onClickRecord={(option) => {
            console.log(option);
          }}
          tableId="tb12f-f12f"
        />
      )}
    </Fragment>
  );
};

const Section = styled.section`
  padding: 50px 100px 0;
`;

export default Styleguide;
