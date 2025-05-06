import { createContext } from '@khulnasoft.com/mitosis';
import type { RegisteredComponents } from './types.js';

type ComponentsContext = {
  registeredComponents: RegisteredComponents;
};

export default createContext<ComponentsContext>({
  registeredComponents: {},
});
