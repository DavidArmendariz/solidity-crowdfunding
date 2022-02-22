import React, { useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Layout from 'app-components/Layout';
import { Link, Router } from 'app-routes';
import web3 from 'app-web3';
import Campaign from '../../../../ethereum/build/Campaign.json';

const NewRequest = ({ address }) => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('0');
  const [recipient, setRecipient] = useState('');

  return (
    <Layout>
      <h3>Create a Request</h3>
      <Form>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value (ether)</label>
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
          />
        </Form.Field>
        <Button primary>Create</Button>
      </Form>
    </Layout>
  );
};

NewRequest.getInitialProps = (props) => {
  const { address } = props.query;
  return {
    address,
  };
};

export default NewRequest;
