type Dictionary<T> = Record<string, T>;
type KhulnasoftContent = any;
type KhulnasoftBlock = any;
type RegisteredComponent = any;
type RegisteredComponents = any;
declare const khulnasoft: { env: 'dev'; apiKey: string };
// TODO(misko): HACKS to be removed
declare const get: (obj: any, key: string) => any;
declare const set: (obj: any, key: string, value: any) => void;
interface CSSProperties {
  flexDirection: any;
}
declare const KhulnasoftBlocks: (props: any) => any;
