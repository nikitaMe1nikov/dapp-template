import { DataQueryStore, EMPTY_INITVARIABLES, useQuery } from './useQuery'
import { QueryArg, delay } from '@nimel/sdk/sagas'
import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { Story } from '@storybook/react/types-6-0'

export default {
  title: 'components/query',
}

async function someQuery({ variables: { id = 0 } }: QueryArg<{ id: number }>) {
  await delay(3000)

  return [id]
}

async function someQueryEmptyVariables() {
  await delay(3000)

  return [3000]
}

async function someQueryError({ variables: { id = 0 } }: QueryArg<{ id: number }>) {
  await delay(3000)

  throw new Error(`${id}`)
}

async function someQueryUseAnotherQuery({ variables: { id = 0 }, ctx }: QueryArg<{ id: number }>) {
  await delay(3000)

  return someQuery({ ctx, variables: { id } })
}

const Info: FC<Omit<DataQueryStore, 'getQuery' | 'reQuery' | 'getFullQuery'>> = ({
  data,
  isLoading,
  isSuccess,
  isError,
  error,
}) => (
  <>
    <h4>{`data: ${data}`}</h4>
    <h4>{`isLoading: ${isLoading}`}</h4>
    <h4>{`isSuccess: ${isSuccess}`}</h4>
    <h4>{`isError: ${isError}`}</h4>
    <h4>{`error: ${error}`}</h4>
  </>
)

let count = 0

const Default: Story = observer(() => {
  const { getQuery, ...rest } = useQuery(someQuery)

  return (
    <>
      <Info {...rest} />
      <button onClick={() => getQuery({ id: count++ })}>run query</button>
    </>
  )
})

const QueryEmptyVariables: Story = observer(() => {
  const { getQuery, ...rest } = useQuery(someQueryEmptyVariables)

  return <Info {...rest} />
})

const template = () => <Default />

export const QueryDefault = template.bind({})

const Init: Story = observer(() => {
  const result = useQuery(someQuery, { initVariables: { id: 1 } })

  return <Info {...result} />
})

const templateInit = () => <Init />

export const QueryInit = templateInit.bind({})

const UseAnotherQuery: Story = observer(() => {
  const result = useQuery(someQueryUseAnotherQuery, { initVariables: { id: 1 } })

  return <Info {...result} />
})

const templateUseAnotherQuery = () => <UseAnotherQuery />

export const QueryUseAnotherQuery = templateUseAnotherQuery.bind({})

const WithError: Story = observer(() => {
  const { getQuery, ...rest } = useQuery(someQueryError)

  return (
    <>
      <Info {...rest} />
      <button onClick={() => getQuery({ id: count++ })}>run query</button>
    </>
  )
})

const templateError = () => <WithError />

export const QueryError = templateError.bind({})

const Polling: Story = observer(() => {
  const { getQuery, ...rest } = useQuery(someQuery, {
    initVariables: { id: 0 },
    pollingInterval: 1000,
  })

  return <Info {...rest} />
})

const templatePolling = () => <Polling />

export const QueryPolling = templatePolling.bind({})

const Inner: Story = observer(() => {
  const { getQuery } = useQuery(someQuery)

  return (
    <>
      <Init />
      <button onClick={() => getQuery({ id: 1 })}>run query</button>
    </>
  )
})

const templateInner = () => <Inner />

export const QueryInner = templateInner.bind({})

const InnerEmptyVariables: Story = observer(() => {
  const { getQuery } = useQuery(someQueryEmptyVariables)

  return (
    <>
      <QueryEmptyVariables />
      <button onClick={() => getQuery(EMPTY_INITVARIABLES.initVariables)}>run query</button>
    </>
  )
})

const templateInnerEmptyVariables = () => <InnerEmptyVariables />

export const QueryInnerEmptyVariables = templateInnerEmptyVariables.bind({})

const InnerAnyVariables: Story = observer(() => {
  const { isLoading } = useQuery(someQuery, { ignoreVariables: true })

  return (
    <>
      <h4 style={{ color: 'green' }}>{`outer isLoading: ${isLoading}`}</h4>
      <Default />
    </>
  )
})

const templateInnerAnyVariables = () => <InnerAnyVariables />

export const QueryInnerAnyVariables = templateInnerAnyVariables.bind({})
