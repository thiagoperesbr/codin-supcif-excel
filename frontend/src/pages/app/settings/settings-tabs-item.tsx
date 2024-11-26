import { TabsTrigger } from '@radix-ui/react-tabs'
import { motion } from 'framer-motion'

export interface SettingsTabsItemProps {
  value: string
  title: string
  isSelected?: boolean
}

export function SettingsTabsItem({
  value,
  title,
  isSelected = false,
}: SettingsTabsItemProps) {
  return (
    <TabsTrigger
      value={value}
      className="relative px-1 pb-4 text-sm font-medium data-[state=active]:text-primary"
    >
      <span>{title}</span>

      {isSelected && (
        <motion.div
          layoutId="activeTab"
          className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary"
        />
      )}
    </TabsTrigger>
  )
}
