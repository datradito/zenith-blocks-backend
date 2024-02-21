import axios from 'axios'
import { ethers } from 'ethers'

import getChain from './getChain'
import { message } from 'antd'
const getSafeInfo = async (
  safeAddress,
  connectedChainId,
  options
)=> {
  const chain = getChain(connectedChainId)

  console.log('chain', chain)

  const address = ethers.getAddress(safeAddress)

  console.log('address', address)

  // Mumbai has no transaction service because it is not part of our official UI https://app.safe.global/
  if (!chain?.transactionServiceUrl) {
    message.error(`No transaction service for ${chain?.label} chain`)
    // throw new Error(`No transaction service for ${chain?.label} chain`)
  }

  const url = `${chain?.transactionServiceUrl}/api/v1/safes/${address}/`

  const { data: safeInfo } = await axios.get(url, options)

  return safeInfo
}

export default getSafeInfo
