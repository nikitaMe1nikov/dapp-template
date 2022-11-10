import { FC, Children } from 'react'
import * as React from 'react'
import { Typography } from '@mui/material'
import { TabsProps as MUITabsProps } from '@mui/material/Tabs'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { default as MUITab, TabProps as MUITabProps } from '@mui/material/Tab'
import { TypographyProps } from '@mui/material/Typography'

export type TabsProps = MUITabsProps & {
  size?: 'xs' | 'sm' | 'lg'
  tabs: Array<TabProps>
  onChangeTab: (value: string) => void
  currentTab: string
}

export type TabProps = MUITabProps & {
  icon?: React.ReactElement | string
  variant?: 'tinyTabs' | 'menu' | 'largeTabs'
}

const getVariant = (size: TabsProps['size']) => {
  switch (size) {
    case 'xs': {
      return 'tinyTabs'
    }
    case 'sm': {
      return 'menu'
    }
    case 'lg': {
      return 'largeTabs'
    }
    default: {
      return 'tinyTabs'
    }
  }
}

const Tab: FC<TabProps> = MUITab

export const Tabs: FC<TabsProps> = ({ children, tabs, size = 'xs', onChangeTab, currentTab }) => {
  const tabTypographyVariant: TypographyProps['variant'] = getVariant(size)
  const tabVariant: TabProps['variant'] = getVariant(size)

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    onChangeTab(newValue)
  }

  return (
    <TabContext value={currentTab}>
      <TabList onChange={handleChange} variant='scrollable' scrollButtons='auto'>
        {tabs.map((tab, index) => (
          <Tab
            {...tab}
            variant={tabVariant}
            id={String(index)}
            key={String(index)}
            label={<Typography variant={tabTypographyVariant}>{tab.label}</Typography>}
          />
        ))}
      </TabList>

      {Children.map(children, (child, index) => (
        <TabPanel value={tabs[index]?.value} key={index}>
          {child}
        </TabPanel>
      ))}
    </TabContext>
  )
}
