import React, { useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import { Router } from 'app-routes';
import getCampaign from 'app-utils/get-campaign';
import web3 from 'app-web3';

const ContributeForm = ({ address }) => {
  const [value, setValue] = useState('0');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
    const campaign = getCampaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether'),
      });
      Router.replaceRoute(`/campaigns/${address}`);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label htmlFor="contribute-input">Amount to Contribute</label>
        <Input
          id="contribute-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label="ether"
          labelPosition="right"
        />
      </Form.Field>
      <Message error header="Oops!" content={errorMessage} />
      <Button loading={loading} primary>
        Contribute
      </Button>
    </Form>
  );
};

export default ContributeForm;
