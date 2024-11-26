import { Tabs, TabsList } from '@radix-ui/react-tabs'
import { useState } from 'react'

import { SettingsTabsItem } from './settings-tabs-item'

export function SettingsTabs() {
  const [currentTab, setCurrentTab] = useState('tab1')

  return (
    <Tabs value={currentTab} onValueChange={setCurrentTab}>
      <TabsList className="flex w-full items-center gap-6 border-b">
        <SettingsTabsItem
          value="tab1"
          title="Meus Detalhes"
          isSelected={currentTab === 'tab1'}
        />
        <SettingsTabsItem
          value="tab2"
          title="Perfil"
          isSelected={currentTab === 'tab2'}
        />
        <SettingsTabsItem
          value="tab3"
          title="Senhas"
          isSelected={currentTab === 'tab3'}
        />
        <SettingsTabsItem
          value="tab4"
          title="Planos"
          isSelected={currentTab === 'tab4'}
        />
        <SettingsTabsItem
          value="tab5"
          title="Pagamentos"
          isSelected={currentTab === 'tab5'}
        />
        <SettingsTabsItem
          value="tab6"
          title="Notificações"
          isSelected={currentTab === 'tab6'}
        />
        <SettingsTabsItem
          value="tab7"
          title="Integrações"
          isSelected={currentTab === 'tab7'}
        />
        <SettingsTabsItem
          value="tab8"
          title="API"
          isSelected={currentTab === 'tab8'}
        />
      </TabsList>
    </Tabs>
  )
}
