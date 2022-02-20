import React from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';

const ContributeForm = () => {
  return (
    <Form>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input label="ether" labelPosition="right" />
      </Form.Field>
      <Button primary>Contribute</Button>
    </Form>
  );
};

export default ContributeForm;
