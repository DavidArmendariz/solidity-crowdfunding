import Head from 'next/head';
import factory from '../factory';

const Home = ({ campaigns }) => {
  return (
    <div>
      <Head>
        <title>Crowdfunding App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {campaigns.map((campaign) => (
        <div key={campaign}>{campaign}</div>
      ))}
    </div>
  );
};

Home.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default Home;
