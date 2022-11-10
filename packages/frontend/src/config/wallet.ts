import { CoinbaseIcon } from 'components/Icon/CoinbaseIcon'
import { Coin98Icon } from 'components/Icon/Coin98Icon'
import { TrustIcon } from 'components/Icon/TrustIcon'
import { TokenPocketIcon } from 'components/Icon/TokenPocketIcon'
import { WalletConnectIcon } from 'components/Icon/WalletConnectIcon'
import { BinanceChainIcon } from 'components/Icon/BinanceChainIcon'
import { SafepalIcon } from 'components/Icon/SafepalIcon'
import { MetamaskIcon } from 'components/Icon/MetamaskIcon'
import { ConnectorNames } from '@nimel/sdk/'
import { FC } from 'react'
import { SvgIconProps } from '@mui/material'

export const WALLET_ICON_BY_CONNECTOR: Record<ConnectorNames, FC<SvgIconProps>> = {
  metamask: MetamaskIcon,
  binance: BinanceChainIcon,
  coin98: Coin98Icon,
  coinbase: CoinbaseIcon,
  safePal: SafepalIcon,
  tokenPocket: TokenPocketIcon,
  trustWallet: TrustIcon,
  walletConnect: WalletConnectIcon,
}
