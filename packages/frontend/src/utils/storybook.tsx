import type { Meta } from '@storybook/react'
import { PageLayout } from 'components/Layout/PageLayout'

export const pageDecorator: Required<Meta<any>>['decorators'][number] = (Story, context) => (
  <PageLayout>
    <Story {...context} />
  </PageLayout>
)
