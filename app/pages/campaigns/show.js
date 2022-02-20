import React from 'react';
import { Button, Card, Grid } from 'semantic-ui-react';
import ContributeForm from 'app-components/ContributeForm';
import Layout from 'app-components/Layout';
import { Link } from 'app-routes';
import getCampaign from 'app-utils/get-campaign';
import web3 from 'app-web3';

const CampaignShow = ({
  minimumContribution,
  balance,
  numRequests,
  contributorsCount,
  manager,
  address,
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
      <Grid>
        <Grid.Column width={10}>
          {renderCards()}
          <Link route={`/campaigns/${address}/requests`}>
            <a>
              <Button primary>View Requests</Button>
            </a>
          </Link>
        </Grid.Column>
        <Grid.Column width={6}>
          <ContributeForm address={address} />
        </Grid.Column>
      </Grid>
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
    address,
  };
};

export default CampaignShow;
