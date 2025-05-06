export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix + Khulnasoft.com Starter</h1>
      <h4>
        This is the index static route for Remix pages. To see your Khulnasoft.com content, make sure to
        create and publish a page at khulnasoft.com/content.
      </h4>
      <ul>
        <li>
          <a target="_blank" href="https://khulnasoft.com/content" rel="noreferrer">
            Go to Khulnasoft.com
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/tutorials/blog" rel="noreferrer">
            Remix 15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
