/**
 * Workaround until https://github.com/KhulnasoftIO/qwik/issues/5017 is fixed.
 */
export function deoptSignal<T>(value: T): T {
  return value;
}
