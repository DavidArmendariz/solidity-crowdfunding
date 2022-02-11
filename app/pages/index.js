import Head from 'next/head';
import { Button, Card } from 'semantic-ui-react';
import Layout from '../components/Layout';
import factory from '../factory';

const Home = ({ campaigns }) => {
  const renderCampaigns = () => {
    const items = campaigns.map((campaign) => ({
      header: campaign,
      description: <a>View Campaign</a>,
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
      {renderCampaigns()}
      <Button content="Create Campaign" icon="add circle" primary />
    </Layout>
  );
};

Home.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default Home;
