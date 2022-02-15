import Layout from 'components/Layout';
import React, { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = useState('');

  return (
    <Layout>
      <h3>Create A Campaign</h3>
      <Form>
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
