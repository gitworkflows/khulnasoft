import { registerCommercePlugin, CommerceAPIOperations, KhulnasoftRequest } from '@khulnasoft.com/plugin-tools';
import pkg from '../package.json';
import appState from '@khulnasoft.com/app-context';
import { EmporixClient } from './utils/emporix-client';

const pluginId = pkg.name;

registerCommercePlugin(
  {
    id: pluginId,
    name: 'Emporix',
    settings: [
      {
        type: 'text',
        name: 'tenant',
        required: true,
        helperText: 'Your Emporix Digital Commerce Platform tenant name',
      },
      {
        type: 'text',
        name: 'storefrontApiKey',
        required: true,
        helperText:
          'Get your Storefront API Key, from your Emporix Dev Portal space > https://app.emporix.io/api-keys',
      },
    ],
    ctaText: `Connect Emporix Digital Commerce Platform`,
  },
  async (settings: any): Promise<CommerceAPIOperations> => {
    try {
      const tenant = settings.get('tenant')?.trim();
      const storefrontApiKey = settings.get('storefrontApiKey')?.trim();
      if (!tenant || !storefrontApiKey) {
        throw new Error('Tenant and Storefront API Key are required');
      }
      const emporixClient = new EmporixClient(tenant, storefrontApiKey);

      const transformProduct = (resource: any) => ({
        ...resource,
        id: resource?.id,
        title: resource?.name,
        handle: resource?.id,
        image: {
          src:
            resource?.media && resource?.media.length > 0
              ? resource?.media[0].url
              : 'https://dashboard.emporix.io/assets/logo-dark.185dfcb0.png',
        },
      });

      const transformCategory = (category: any) => ({
        ...category,
        id: category?.id,
        title: category?.name,
        handle: category?.code,
        image: {
          src:
            category?.media && category?.media.length > 0
              ? category?.media[0].url
              : 'https://dashboard.emporix.io/assets/logo-dark.185dfcb0.png',
        },
      });

      return {
        product: {
          async findById(id: string) {
            const response = await emporixClient.getProduct(id);
            return transformProduct(response);
          },
          async search(search: string) {
            const response = await emporixClient.searchProducts(search);
            return response.map(transformProduct);
          },
          async findByHandle(handle: string) {
            const productResponse = await emporixClient.getProduct(handle);
            return transformProduct(productResponse);
          },
          getRequestObject(id: string): KhulnasoftRequest {
            const headers = emporixClient.getHeadersFromCache();
            return {
              '@type': '@khulnasoft.com/core:Request',
              request: {
                url: emporixClient.getProductUrl(id),
                headers,
              },
              options: {
                product: id,
              },
            };
          },
        },
        category: {
          async findById(id: string) {
            const response = await emporixClient.getCategoryById(id);
            return transformCategory(response);
          },
          async findByHandle(handle: string) {
            const response = await emporixClient.getCategoryByCode(handle);
            return transformCategory(response);
          },
          async search(search: string) {
            const response = await emporixClient.searchCategories(search);
            return response.map(transformCategory);
          },
          getRequestObject(id: string) {
            const headers = emporixClient.getHeadersFromCache();
            return {
              '@type': '@khulnasoft.com/core:Request',
              request: {
                url: emporixClient.getCategoryUrl(id),
                headers,
              },
              options: {
                category: id,
              },
            };
          },
        },
      };
    } catch (error) {
      console.error(error)
      appState.snackBar.show(
        `Error connecting to Emporix, check console for details`,
        15000
      )
      throw error
    }
  }
);
