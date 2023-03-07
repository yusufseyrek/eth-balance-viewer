import { ethers } from 'ethers'

import { REACT_APP_INFURA_ID } from '@env'

const getAddressFromMnemonic = (mnemonic: string): [Error | null, string] => {
  try {
    const wallet = ethers.Wallet.fromMnemonic(mnemonic)
    return [null, wallet.address]
  } catch (ex) {
    return [ex as Error, '']
  }
}

const getETHBalance = async (
  address: string
): Promise<[Error | null, string]> => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      `https://mainnet.infura.io/v3/${REACT_APP_INFURA_ID}`,
      'mainnet'
    )
    const balance = await provider.getBalance(address)
    const balanceInEth = ethers.utils.formatEther(balance)

    return [null, balanceInEth]
  } catch (ex) {
    return [ex as Error, '']
  }
}

export { getAddressFromMnemonic, getETHBalance }
