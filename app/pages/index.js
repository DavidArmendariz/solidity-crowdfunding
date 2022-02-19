import Layout from 'components/Layout';
import factory from 'factory';
import Head from 'next/head';
import { Router } from 'routes';
import { Button, Card } from 'semantic-ui-react';

const Home = ({ campaigns }) => {
  const renderCampaigns = () => {
    const items = campaigns.map((campaign) => ({
      header: campaign,
      description: <a>View Campaign</a>,
      fluid: true,
    }));

    return <Card.Group items={items} />;
  };

  const createCampaign = () => {
    Router.push('/campaigns/new');
  };

  return (
    <Layout>
      <Head>
        <title>Crowdfunding App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3>Open Campaigns</h3>
      <Button
        onClick={createCampaign}
        floated="right"
        content="Create Campaign"
        icon="add circle"
        primary
      />
      {renderCampaigns()}
    </Layout>
  );
};

Home.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default Home;
