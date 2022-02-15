import Layout from 'components/Layout';
import React, { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import factory from '../../factory';
import web3 from '../../web3';

const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await factory.methods
      .createCampaign(minimumContribution)
      .send({ from: accounts[0] });
  };

  return (
    <Layout>
      <h3>Create A Campaign</h3>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={(event) => setMinimumContribution(event.target.value)}
          />
        </Form.Field>
        <Button type="submit" primary>
          Create
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
