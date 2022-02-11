import Head from 'next/head';
import { useEffect } from 'react';
import factory from '../factory';

export default function Home() {
  useEffect(() => {
    (async () => {
      const campaigns = await factory.methods.getDeployedCampaigns().call();
    })();
  }, []);

  return (
    <div>
      <Head>
        <title>Crowdfunding App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Hello
    </div>
  );
}
