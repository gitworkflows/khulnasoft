import { Content } from '@khulnasoft.com/app-context'
import { Khulnasoft } from '@khulnasoft.com/sdk'
import LangugeSwitcher from './components/language-switcher'
import { pluginId } from './constants'
import { ExtendedApplicationContext } from './interfaces/application-context'
declare global {
  interface Window {
    languageSettingsTrigger: () => Promise<void>
  }
}

interface Model {
  name: string
  hideFromUI?: boolean
  kind: 'data' | 'page' | 'component' | 'function'
}
interface IAppState {
  models: {
    result: Model[]
  }
}

const appState: ExtendedApplicationContext & IAppState =
  require('@khulnasoft.com/app-context').default

const localization: Model = {
  name: 'localization',
  kind: 'data',
  hideFromUI: true,
}
// Add buttons to the top toolbar when editing content
Khulnasoft.register('editor.toolbarButton', {
  component: LangugeSwitcher,
})

interface OnSaveActions {
  updateSettings(partal: Record<string, any>): Promise<void>
  addModel(model: Model): Promise<void>
}

Khulnasoft.register('plugin', {
  id: pluginId,
  name: 'Localized Preview',
  settings: [
    {
      name: 'locales',
      type: 'list',
      defaultValue: [],
      subFields: [
        {
          name: 'localeCode',
          type: 'string',
        },
        {
          name: 'localeName',
          type: 'string',
        },
      ],
    },
  ],
  ctaText: 'Save',
})

interface AppActions {
  triggerSettingsDialog(pluginId: string): Promise<void>
}

Khulnasoft.register(
  'app.onLoad',
  async ({ triggerSettingsDialog }: AppActions) => {
    const currentOrg = appState.user.organization
    const pluginSettings = currentOrg.value.settings.plugins.get(pluginId)
    const locales = pluginSettings?.get('locales')
    if (typeof locales === 'string' || !locales) {
      pluginSettings?.set('locales', [])
      await triggerSettingsDialog(pluginId)
    }
    window.languageSettingsTrigger = async () =>
      await triggerSettingsDialog(pluginId)
  }
)
