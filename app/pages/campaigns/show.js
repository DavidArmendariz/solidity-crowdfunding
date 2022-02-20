import React from 'react';
import Layout from 'app-components/Layout';
import getCampaign from 'app-utils/get-campaign';

const CampaignShow = ({ campaign }) => {
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
  console.log(summary);
  return {};
};

export default CampaignShow;
