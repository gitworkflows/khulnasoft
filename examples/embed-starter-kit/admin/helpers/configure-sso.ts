import { createAdminApiClient } from '@khulnasoft.com/admin-sdk'

export default async function configureSSO(
  spacePrivateKey: string,
  config: { clientId: string; issuer: string }
) {
  const spaceAdminSDK = createAdminApiClient(spacePrivateKey)

  const response = await spaceAdminSDK.chain.mutation
    .addOIDCProvider({
      settings: {
        displayName: 'Auth0 connection',
        issuer: config.issuer,
        clientId: config.clientId,
      },
    })
    .execute()

  return response
}
