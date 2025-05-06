import type { ContentProps } from '../components/content/content.types.js';
import { isBrowser } from '../functions/is-browser.js';
import { isFromTrustedHost } from '../functions/is-from-trusted-host.js';
import { setupBrowserForEditing } from '../scripts/init-editing.js';
import type { KhulnasoftAnimation } from '../types/khulnasoft-block.js';
import type { KhulnasoftContent } from '../types/khulnasoft-content.js';
import type { Dictionary } from '../types/typescript.js';
import { logger } from './logger.js';

type ContentListener = Required<
  Pick<ContentProps, 'model' | 'trustedHosts'>
> & {
  callbacks: {
    contentUpdate: (updatedContent: KhulnasoftContent) => void;
    stateUpdate: (newState: Dictionary<string>) => void;
    animation: (updatedContent: KhulnasoftAnimation) => void;
    configureSdk: (updatedContent: any) => void;
  };
};

export const createEditorListener = ({
  model,
  trustedHosts,
  callbacks,
}: ContentListener) => {
  return (event: MessageEvent<any>): void => {
    if (!isFromTrustedHost(trustedHosts, event)) {
      return;
    }

    const { data } = event;

    if (data) {
      switch (data.type) {
        case 'khulnasoft.configureSdk': {
          callbacks.configureSdk(data.data);
          break;
        }
        case 'khulnasoft.triggerAnimation': {
          callbacks.animation(data.data);
          break;
        }
        case 'khulnasoft.resetState': {
          const messageContent = data.data;
          const modelName = messageContent.model;
          const newState = messageContent?.state;
          if (modelName === model && newState) {
            callbacks.stateUpdate(newState);
          }
          break;
        }
        case 'khulnasoft.contentUpdate': {
          const messageContent = data.data;
          const key =
            messageContent.key ||
            messageContent.alias ||
            messageContent.entry ||
            messageContent.modelName;

          const contentData = messageContent.data;

          if (key === model) {
            callbacks.contentUpdate(contentData);
          }
          break;
        }
      }
    }
  };
};

type SubscribeToEditor = ({
  model,
  apiKey,
  callback,
  trustedHosts,
}: {
  /**
   * The Khulnasoft `model` to subscribe to
   */
  model: string;
  /**
   * Khulnasoft API Key to use for the editor.
   */
  apiKey: string;
  /**
   * The callback function to call when the content is updated.
   */
  callback: (updatedContent: KhulnasoftContent) => void;
  /**
   * List of hosts to allow editing content from.
   */
  trustedHosts?: string[] | undefined;
}) => () => void;

/**
 * Subscribes to the Khulnasoft editor and listens to `content` updates of a certain `model`.
 * Sends the updated `content` to the `callback` function.
 */
export const subscribeToEditor: SubscribeToEditor = ({
  model,
  apiKey,
  callback,
  trustedHosts,
}) => {
  if (!isBrowser) {
    logger.warn(
      '`subscribeToEditor` only works in the browser. It currently seems to be running on the server.'
    );
    return () => {};
  }
  setupBrowserForEditing({
    modelName: model,
    apiKey,
  });

  const listener = createEditorListener({
    callbacks: {
      contentUpdate: callback,
      animation: () => {},
      configureSdk: () => {},
      stateUpdate: () => {},
    },
    model,
    trustedHosts,
  });

  window.addEventListener('message', listener);

  return () => {
    window.removeEventListener('message', listener);
  };
};
