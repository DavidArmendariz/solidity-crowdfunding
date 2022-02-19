import Layout from 'components/Layout';
import React, { useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import factory from '../../factory';
import { Router } from '../../routes';
import web3 from '../../web3';

const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = useState('0');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(minimumContribution)
        .send({ from: accounts[0] });
      Router.pushRoute('/');
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h3>Create A Campaign</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={(event) => setMinimumContribution(event.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button loading={loading} type="submit" primary>
          Create
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
