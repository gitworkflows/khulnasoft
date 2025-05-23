import { registerCommercePlugin } from '@khulnasoft.com/plugin-tools';
import pkg from '../package.json';
import appState from '@khulnasoft.com/app-context';
import { Api, getRecommenders } from './api';
/**
 * 
parameters: {
    clientId: '1d763261-6522-4913-9d52-5d947d3b94c4',
    organizationId: 'f_ecom_zzte_053',
    shortCode: 'kv7kzm78',
    siteId: 'RefArch',
    einsteinId: '1ea06c6e-c936-4324-bcf0-fada93f83bb1',
    einsteinSiteId: 'aaij-MobileFirst'
}
 */

registerCommercePlugin(
  {
    name: 'SFCommerce',
    id: pkg.name,
    noPreviewTypes: true,
    settings: [
      {
        name: 'clientId',
        type: 'string',
        required: true,
        friendlyName:'Public Client ID',
      },
      {
        name: 'organizationId',
        type: 'string',
        required: true,
      },
      {
        name: 'proxy',
        type: 'string',
        required: false,
      },
      {
        name: 'redirectURI',
        type: 'string',
        required: false,
        helperText: 'redirectURI must be configured by SLAS admin',
      },
      {
        name: 'shortCode',
        type: 'string',
        required: true,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
      },
      {
        name: 'einsteinId',
        friendlyName: 'Einstein API Client ID',
        type: 'string',
      },
      {
        name: 'einsteinSiteId',
        friendlyName: 'Einstein API Site ID',
        type: 'string',
      },
      {
        name: 'navDepth',
        type: 'number',
        helperText: 'This will be used in category search. If you enter nav depth greater than 3 there could be performance implications',
      },
      {
        name: 'rootCategory',
        type: 'string', 
      },
    ],
    ctaText: `Connect your Salesforce Commerce API`,
    onSave: async () => {
      appState.snackBar.display({
        message: 'Validating Config Details...'
      });
      const api = new Api(appState.user.apiKey, pkg.name);
      await api.validateConfig();
    }
  },
  async settings => {
    const api = new Api(appState.user.apiKey, pkg.name);
    const einsteinId = settings.get('einsteinId');
    const einsteinSiteId = settings.get('einsteinSiteId');
    let recommendersType = {};
    if (einsteinId && einsteinSiteId) {
      const recommenders = await getRecommenders(einsteinSiteId, einsteinId);

      recommendersType = {
        recommender: {
          search(search = '') {
            return Promise.resolve(
              recommenders.filter(rec => JSON.stringify(rec).includes(search))
            );
          },
          findById(id: string) {
            return Promise.resolve(recommenders.find(rec => rec.id === id));
          },
          getRequestObject(id: string) {
            // todo update type
            return id as any;
          },
        },
      };
    }

    return {
      product: {
        async findById(id: string) {
          return await api.getProduct(id);
        },
        async search(search: string) {
          return await api.search(search || '');
        },
        getRequestObject(id: string) {
          return {
            '@type': '@khulnasoft.com/core:Request' as const,
            request: {
              url: api.getBaseUrl(`products/${id}`),
            },
            options: {
              product: id,
            },
          };
        },
      },

      category: {
        async findById(id: string) {
          return await api.getCategory(id);
        },
        async search(search: string) {
          return await api.searchCategories(search || '');
        },
        getRequestObject(id: string) {
          return {
            '@type': '@khulnasoft.com/core:Request' as const,
            request: {
              url: api.getBaseUrl(`categories/${id}`),
            },
            options: {
              category: id,
            },
          };
        },
      },
      ...recommendersType,
    };
  }
);
