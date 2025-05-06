import { KhulnasoftComponent } from '@khulnasoft.com/react';

export default function PostBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <KhulnasoftComponent options={{ includeRefs: true }} model="post" content={content} />
    </div>
  );
}
