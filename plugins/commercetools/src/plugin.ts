import { registerCommercePlugin, KhulnasoftRequest, CommerceAPIOperations } from '@khulnasoft.com/plugin-tools';
import { Resource } from '@khulnasoft.com/plugin-tools/dist/types/interfaces/resource';
import pkg from '../package.json';
import { createRequestKhulnasoft } from '@commercetools/api-request-khulnasoft';
import appState from '@khulnasoft.com/app-context';

const getToken = async (options: {
  clientId: string;
  secret: string;
  authUrl: string;
  projectKey: string;
  scopes?: string;
}) => {
  try {
    const { authUrl, clientId, secret, projectKey, scopes } = options;
    const response = await fetch(
      `${authUrl}/oauth/token?grant_type=client_credentials&scope=${
        scopes || `view_products:${projectKey}`
      }`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${clientId}:${secret}`)}`,
        },
      }
    ).then(res => res.json());

    return response;
  } catch (error) {
    console.error(error);
    appState.snackBar.show(
      `Error authenticating with CommerceTools, check console for details`,
      15000
    );

    throw error;
  }
};

registerCommercePlugin(
  {
    name: 'Commercetools',
    id: pkg.name,
    settings: [
      {
        name: 'projectKey',
        type: 'string',
        required: true,
      },
      {
        name: 'clientId',
        type: 'string',
        required: true,
      },
      {
        name: 'secret',
        type: 'password',
        required: true,
      },
      {
        name: 'scopes',
        type: 'string',
      },
      {
        name: 'apiUrl',
        type: 'string',
        required: true,
      },
      {
        name: 'authUrl',
        type: 'string',
        required: true,
      },
      {
        name: 'locale',
        type: 'string',
      },
    ],
    ctaText: `Connect your Commercetools API`,
  },
  async (settings: any): Promise<CommerceAPIOperations> => {
    const clientId = settings.get('clientId');
    const secret = settings.get('secret');
    const scopes = settings.get('scopes');
    const projectKey = settings.get('projectKey');
    const authUrl = new URL(settings.get('authUrl')).origin;
    const apiUrl = new URL(settings.get('apiUrl')).origin;
    const locale = settings.get('locale') || 'en-US';
    const token = await getToken({ authUrl, projectKey, clientId, secret, scopes });
    const headers = {
      Authorization: `${token.token_type} ${token.access_token}`,
    };

    const transform = (resource: any) => ({
      ...resource,
      title:
        typeof resource.name === 'string'
          ? resource.name
          : resource.name?.[locale] || resource.masterData?.current.name[locale],
      handle:
        typeof resource.slug === 'string'
          ? resource.slug
          : resource.slug?.[locale] || resource.masterData?.current.slug[locale],
    });

    const service = {
      product: {
        async findById(id: string): Promise<Resource> {
          const requestKhulnasoft = createRequestKhulnasoft({ projectKey });
          let request = requestKhulnasoft.products.byId(id);
          const product = await fetch(`${apiUrl}${request.build()}`, {
            headers,
          }).then(res => res.json());
          return transform(product);
        },

        async findByHandle(handle: string): Promise<Resource> {
          const requestKhulnasoft = createRequestKhulnasoft({ projectKey });
          let request = requestKhulnasoft.products.where(
            `masterData(current(slug(${locale}="${handle}")))`
          );
          const product = await fetch(`${apiUrl}${request.build()}`, {
            headers,
          })
            .then(res => res.json())
            .then(res => res.results[0]);
          return product && transform(product);
        },
        async search(search: string): Promise<Resource[]> {
          const requestKhulnasoft = createRequestKhulnasoft({ projectKey });
          let request = requestKhulnasoft.products;
          if (search) {
            request = request.where(
              `masterData(current(slug(${locale}="${search}") or name(${locale}="${search}")))`
            );
          }

          const results = await fetch(`${apiUrl}${request.build()}`, {
            headers,
          })
            .then(res => res.json())
            .then(res => res.results.map((product: any) => transform(product)));
          return results;
        },
        getRequestObject(id: string): KhulnasoftRequest {
          const requestKhulnasoft = createRequestKhulnasoft({ projectKey });
          return {
            '@type': '@khulnasoft.com/core:Request' as const,
            request: {
              url: `${appState.config.apiRoot()}/api/v1/plugin-proxy?pluginId=${pkg.name}&apiKey=${appState.user.apiKey}&request=${encodeURIComponent(JSON.stringify({
                url: `${apiUrl}${requestKhulnasoft.products.byId(id).build()}`,
                method: 'GET',
              }))}`,
              method: 'GET',
            },
            options: {
              product: id,
              pluginId: pkg.name,
            },
          };
        },
      },
      category: {
        async findById(id: string): Promise<Resource> {
          const requestKhulnasoft = createRequestKhulnasoft({ projectKey });
          let request = requestKhulnasoft.categories.byId(id);
          const product = await fetch(`${apiUrl}${request.build()}`, {
            headers,
          }).then(res => res.json());
          return transform(product);
        },

        async findByHandle(handle: string): Promise<Resource> {
          const requestKhulnasoft = createRequestKhulnasoft({ projectKey });
          const request = requestKhulnasoft.categories.where(`slug(${locale}="${handle}")`);
          const category = await fetch(`${apiUrl}${request.build()}`, {
            headers,
          })
            .then(res => res.json())
            .then(res => res.results[0]);
          return category && transform(category);
        },
        async search(search: string): Promise<Resource[]> {
          const requestKhulnasoft = createRequestKhulnasoft({ projectKey });
          let request = requestKhulnasoft.categories;
          if (search) {
            request = request.where(`slug(${locale}="${search}") or name(${locale}="${search}")`);
          }

          const results = await fetch(`${apiUrl}${request.build()}`, {
            headers,
          })
            .then(res => res.json())
            .then(res => res.results.map((product: any) => transform(product)));
          return results;
        },
        getRequestObject(id: string): KhulnasoftRequest {
          const requestKhulnasoft = createRequestKhulnasoft({ projectKey });
          return {
            '@type': '@khulnasoft.com/core:Request' as const,
            request: {
              url: `${appState.config.apiRoot()}/api/v1/plugin-proxy?pluginId=${pkg.name}&apiKey=${appState.user.apiKey}&request=${encodeURIComponent(JSON.stringify({
                url: `${apiUrl}${requestKhulnasoft.categories.byId(id).build()}`,
                method: 'GET',
              }))}`,
              method: 'GET',
            },
            options: {
              category: id,
              pluginId: pkg.name,
            },
          };
        },
      },
    };
    return service;
  }
);
