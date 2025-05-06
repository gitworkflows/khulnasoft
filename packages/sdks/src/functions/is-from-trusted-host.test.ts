import { isFromTrustedHost } from './is-from-trusted-host';

describe('isFromTrustedHost', () => {
  test('trustedHosts', () => {
    expect(isFromTrustedHost(undefined, { origin: 'https://localhost' })).toBe(
      true
    );
    expect(isFromTrustedHost(undefined, { origin: 'https://khulnasoft.com' })).toBe(
      true
    );
    expect(
      isFromTrustedHost(undefined, { origin: 'https://beta.khulnasoft.com' })
    ).toBe(true);
    expect(
      isFromTrustedHost(undefined, { origin: 'https://qa.khulnasoft.com' })
    ).toBe(true);
    expect(
      isFromTrustedHost(undefined, {
        origin: 'https://123-review-build.beta.khulnasoft.com',
      })
    ).toBe(true);
  });

  test('arbitrary khulnasoft.com subdomains', () => {
    expect(
      isFromTrustedHost(undefined, { origin: 'https://cdn.khulnasoft.com' })
    ).toBe(false);
    expect(
      isFromTrustedHost(undefined, { origin: 'https://foo.khulnasoft.com' })
    ).toBe(false);
    expect(
      isFromTrustedHost(undefined, {
        origin: 'https://evildomainbeta.khulnasoft.com',
      })
    ).toBe(false);
  });

  test('add trusted host', () => {
    expect(
      isFromTrustedHost(undefined, { origin: 'https://example.com' })
    ).toBe(false);
    expect(
      isFromTrustedHost(['example.com'], { origin: 'https://example.com' })
    ).toBe(true);
  });

  test('when origin is not a URL', () => {
    expect(isFromTrustedHost(undefined, { origin: 'foo' })).toBe(false);
  });
});
