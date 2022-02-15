import Layout from 'components/Layout';
import React from 'react';
import { Button, Form } from 'semantic-ui-react';

const CampaignNew = () => {
  return (
    <Layout>
      <h3>Create A Campaign</h3>
      <Form>
        <Form.Field>
          <label>Minimum Contribution</label>
          <input type="text" />
        </Form.Field>
        <Button type="submit" primary>
          Create
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
