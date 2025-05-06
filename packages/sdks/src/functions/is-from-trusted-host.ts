const DEFAULT_TRUSTED_HOSTS = [
  '*.beta.khulnasoft.com',
  'beta.khulnasoft.com',
  'khulnasoft.com',
  'localhost',
  'qa.khulnasoft.com',
];

export function isFromTrustedHost(
  trustedHosts: string[] | undefined,
  e: { origin: string }
): boolean {
  if (!e.origin.startsWith('http') && !e.origin.startsWith('https')) {
    return false;
  }
  const url = new URL(e.origin),
    hostname = url.hostname;

  return (
    (trustedHosts || DEFAULT_TRUSTED_HOSTS).findIndex((trustedHost) =>
      trustedHost.startsWith('*.')
        ? hostname.endsWith(trustedHost.slice(1))
        : trustedHost === hostname
    ) > -1
  );
}
