import Head from 'next/head';
import useFactory from '../hooks/factory';
import useMetamask from '../hooks/metamask';

export default function Home() {
  const web3 = useMetamask();
  const factory = useFactory(web3);

  console.log(factory);

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
