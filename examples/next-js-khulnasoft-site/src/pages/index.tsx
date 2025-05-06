import { GetStaticPaths, GetStaticProps } from 'next';
import { getKhulnasoftStaticPaths } from '../functions/get-khulnasoft-static-paths';
import { getKhulnasoftStaticProps } from '../functions/get-khulnasoft-static-props';
import LandingPage from './[...page]';

export const getStaticProps: GetStaticProps = async (context) => {
  return getKhulnasoftStaticProps('content-page', context);
};

export default LandingPage;
