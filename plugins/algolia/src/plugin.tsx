import { Khulnasoft } from '@khulnasoft.com/react';
import appState from '@khulnasoft.com/app-context';
import { pluginId } from './constants';
import { syncToAlgolia } from './sync-to-algolia';
import { createWebhook } from './create-web-hook';

Khulnasoft.register('plugin', {
  id: pluginId,
  name: 'Algolia',
  settings: [
    {
      name: 'algoliaKey',
      type: 'text',
      defaultValue: true,
    },
    {
      name: 'algoliaAppId',
      type: 'text',
      defaultValue: true,
    },
  ],

  ctaText: 'Save',

  async onSave(actions: OnSaveActions) {
    // update plugin setting
    await actions.updateSettings({
      hasConnected: true,
    });

    appState.dialogs.alert('Plugin settings saved.');
  },
});

interface OnSaveActions {
  updateSettings(partal: Record<string, any>): Promise<void>;
}

interface AppActions {
  triggerSettingsDialog(pluginId: string): Promise<void>;
}

Khulnasoft.register('app.onLoad', async ({ triggerSettingsDialog }: AppActions) => {
  const pluginSettings = appState.user.organization.value.settings.plugins?.get(pluginId);
  const hasConnected = pluginSettings?.get('hasConnected');
  if (!hasConnected) {
    await triggerSettingsDialog(pluginId);
  }
});

Khulnasoft.register('model.action', {
  name: 'Sync to Algolia',
  showIf() {
    return appState.user.can('admin');
  },
  async onClick(model: any) {
    if (
      !(await appState.dialogs.confirm(
        `This will sync all current and future entries in the "${model.name}" model to Algolia.`,
        'Continue'
      ))
    ) {
      return;
    }
    appState.globalState.showGlobalBlockingLoadingIndicator = true;
    await syncToAlgolia(model.name);
    await createWebhook(model);
    appState.globalState.showGlobalBlockingLoadingIndicator = false;
  },
});
