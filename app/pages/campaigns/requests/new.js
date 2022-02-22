import React, { useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Layout from 'app-components/Layout';
import { Link, Router } from 'app-routes';
import getCampaign from 'app-utils/get-campaign';
import web3 from 'app-web3';

const NewRequest = ({ address }) => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('0');
  const [recipient, setRecipient] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setLoading(true);
    const campaign = getCampaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      const wei = web3.utils.toWei(value, 'ether');
      await campaign.methods
        .createRequest(description, wei, recipient)
        .send({ from: accounts[0] });
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
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
        <Message error content={errorMessage} />
        <Button loading={loading} primary>
          Create
        </Button>
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
