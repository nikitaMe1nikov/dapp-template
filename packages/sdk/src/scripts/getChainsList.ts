import axios from 'axios'
import path from 'path'
import fs from 'fs'
import { SUPPORT_CHAINS_IDS } from '../config/network'

const CHAIN_LIST_URL = 'https://chainid.network/chains.json'
const CHAIN_LIST_JSON_PATH = path.resolve(process.cwd(), './src/config/chains')

if (!fs.existsSync(CHAIN_LIST_JSON_PATH)) {
  fs.mkdirSync(CHAIN_LIST_JSON_PATH, { recursive: true })
}

void axios.get(CHAIN_LIST_URL).then(({ data: all }) => {
  const list = all.filter(({ chainId }: any) => SUPPORT_CHAINS_IDS.includes(chainId))
  fs.writeFileSync(path.resolve(CHAIN_LIST_JSON_PATH, `chainslist.json`), JSON.stringify(list))
})
