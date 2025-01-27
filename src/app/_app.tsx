import { AppProps } from 'next/app';
import Layout from './layout';

export default function App({ Component, pageProps }: AppProps) {
  console.log("pageProps", pageProps);
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  );
} 