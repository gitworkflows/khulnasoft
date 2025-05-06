declare module '*.json';

declare module 'preact/debug' {}

declare module '@khulnasoft.com/react/dist/preact' {
  const react = require('@khulnasoft.com/react');
  export = react;
}
declare module '@khulnasoft.com/widgets/dist/preact' {
  const react = require('@khulnasoft.com/widgets');
  export = react;
}
