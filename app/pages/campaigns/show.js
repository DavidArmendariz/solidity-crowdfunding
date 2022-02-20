import React from 'react';
import Layout from 'app-components/Layout';
import getCampaign from 'app-utils/get-campaign';

const CampaignShow = ({
  minimumContribution,
  balance,
  numRequests,
  contributorsCount,
  manager,
}) => {
  return (
    <Layout>
      <h3>Campaign Details</h3>
    </Layout>
  );
};

CampaignShow.getInitialProps = async (props) => {
  const {
    query: { address },
  } = props;
  const campaign = getCampaign(address);
  const summary = await campaign.methods.getSummary().call();
  return {
    minimumContribution: summary[0],
    balance: summary[1],
    numRequests: summary[2],
    contributorsCount: summary[3],
    manager: summary[4],
  };
};

export default CampaignShow;
