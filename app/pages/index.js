import { Button, Card } from 'semantic-ui-react';
import Layout from 'app-components/Layout';
import { Link } from 'app-routes';
import factory from 'campaign-factory';
import Head from 'next/head';

const Home = ({ campaigns }) => {
  const renderCampaigns = () => {
    const items = campaigns.map((campaign) => ({
      header: campaign,
      description: (
        <Link route={`/campaigns/${campaign}`}>
          <a>View Campaign</a>
        </Link>
      ),
      fluid: true,
    }));

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <Head>
        <title>Crowdfunding App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3>Open Campaigns</h3>
      <Link route="/campaigns/new">
        <a>
          <Button
            floated="right"
            content="Create Campaign"
            icon="add circle"
            primary
          />
        </a>
      </Link>
      {renderCampaigns()}
    </Layout>
  );
};

Home.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default Home;
