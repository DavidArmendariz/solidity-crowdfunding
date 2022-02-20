import React from 'react';
import { Card } from 'semantic-ui-react';
import Layout from 'app-components/Layout';
import getCampaign from 'app-utils/get-campaign';
import web3 from 'app-web3';

const CampaignShow = ({
  minimumContribution,
  balance,
  numRequests,
  contributorsCount,
  manager,
}) => {
  const renderCards = () => {
    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description:
          'The manager created this campaign and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description:
          'You must contribute at least this much wei to become a contributor',
      },
      {
        header: numRequests,
        meta: 'Number of Requests',
        description:
          'A request tries to withdraw money from the contract. Requests must be approved by contributors.',
      },
      {
        header: contributorsCount,
        meta: 'Number of Contributors',
        description:
          'Number of people who have already donated to this campaign',
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description:
          'The balance is how much money this campaign has left to spend.',
      },
    ];

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <h3>Campaign Details</h3>
      {renderCards()}
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
