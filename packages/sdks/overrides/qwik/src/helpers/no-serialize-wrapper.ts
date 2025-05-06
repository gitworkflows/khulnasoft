import { noSerialize } from '@khulnasoft.com/qwik';

export function noSerializeWrapper(fn: () => void) {
  return noSerialize(fn);
}
