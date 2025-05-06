import { SDK_VERSION } from '../constants/sdk-version.js';
import { TARGET } from '../constants/target.js';

export const getSdkHeaders = () => ({
  'X-Khulnasoft-SDK': TARGET,
  'X-Khulnasoft-SDK-GEN': '2',
  'X-Khulnasoft-SDK-Version': SDK_VERSION,
});
