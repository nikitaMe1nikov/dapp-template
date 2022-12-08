import { FC, useState, ChangeEvent, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@nimel/directorr-react'
import {
  AuthStore,
  SUPPORT_CHAINS,
  getChain,
  useQuery,
  // QueryOptions,
  getConnectors,
  getBlockNumber,
  useMutation,
  sendToken,
  EMPTY_INITVARIABLES,
} from '@nimel/sdk'
import { GetStaticProps } from 'next'
import nextI18NextConfig from '../../next-i18next.config.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// const DEFAULT_QUERY_OPTIONS: QueryOptions = { initVariables: {}, pollingInterval: 5000 }

export const Public: FC = observer(() => {
  const { login, logout, user, chainID, changeChain, isLoading, isLogin } = useStore(AuthStore)
  const { data: blockNumber } = useQuery(getBlockNumber, EMPTY_INITVARIABLES)
  const {
    getQuery: sendGas,
    isLoading: isLoadingSend,
    isSuccess: isSuccessSend,
    isError: isErrorSend,
  } = useMutation(sendToken)
  const [curConnector, setCurConnector] = useState(0)
  const [currentChainID, setCurrentChainID] = useState(chainID)
  const [amount, setAmount] = useState('0.001')

  const onChangeChain = (value: ChangeEvent<HTMLSelectElement>) => {
    setCurrentChainID(Number.parseInt(value.currentTarget.value))

    if (isLogin) changeChain(getChain(value.currentTarget.value))
  }
  const onChangeConnector = (value: ChangeEvent<HTMLSelectElement>) => {
    setCurConnector(+value.currentTarget.value)
  }
  const onLogin = () => {
    if (currentChainID !== undefined) {
      const chain = getChain(currentChainID)
      const connector = getConnectors(currentChainID)[curConnector]

      login(chain, connector)
    }
  }

  const send = () => {
    sendGas({ to: '0x2144aB076F20499a6e932Bb0BBB57a4EdEdc82Ea', amount })
  }

  useEffect(() => {
    setCurrentChainID(chainID)
  }, [chainID])

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>
            <span>User</span>: <span>{user?.account || 'no account'}</span>
          </div>
          <div>
            <span>Block №</span>: <span>{blockNumber}</span>
          </div>
        </div>
      )}
      <h3>Chains</h3>
      {chainID ? (
        <select value={currentChainID} onChange={onChangeChain}>
          {SUPPORT_CHAINS.map(chain => (
            <option key={chain.id} value={chain.id}>
              {chain.name}
            </option>
          ))}
        </select>
      ) : (
        <div>Loading chains</div>
      )}

      {!user && (
        <>
          <h3>Connectors</h3>
          {chainID ? (
            <select value={curConnector} onChange={onChangeConnector}>
              {getConnectors(chainID).map((con, idx) => (
                <option key={con.title} value={idx}>
                  {con.title}
                </option>
              ))}
            </select>
          ) : (
            <div>Loading connectors</div>
          )}
        </>
      )}

      <h3>Actions</h3>
      <div>
        {user ? <button onClick={logout}>Logout</button> : <button onClick={onLogin}>Login</button>}
      </div>
      {user && (
        <div>
          <input value={amount} onChange={({ currentTarget }) => setAmount(currentTarget.value)} />
          <button onClick={send}>
            send {isLoadingSend ? '...loading' : ''} {isSuccessSend ? 'success' : ''}{' '}
            {isErrorSend ? 'error' : ''}
          </button>
        </div>
      )}
    </div>
  )
})

export default Public

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'], nextI18NextConfig)),
  },
})
