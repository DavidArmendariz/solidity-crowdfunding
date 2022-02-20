import 'app-styles/globals.scss';
import Head from 'next/head';
import 'semantic-ui-css/semantic.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Crowdfunding App</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
