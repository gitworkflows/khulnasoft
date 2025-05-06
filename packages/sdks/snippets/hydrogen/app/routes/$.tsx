import type {LoaderFunction} from '@remix-run/node';
import KhulnasoftPage, {khulnasoftLoader} from '~/components/app';

export const loader: LoaderFunction = khulnasoftLoader;

export default KhulnasoftPage;
