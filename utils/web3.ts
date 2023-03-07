import { ethers } from 'ethers'

import { REACT_APP_INFURA_ID } from '@env'

const getPrivateKeyFromMnemonic = (
  mnemonic: string
): [Error | null, string] => {
  try {
    const wallet = ethers.Wallet.fromMnemonic(mnemonic)
    return [null, wallet.privateKey]
  } catch (ex) {
    return [ex as Error, '']
  }
}

const getAddressAndBalanceFromPrivateKey = async (
  privateKey: string
): Promise<[Error | null, string, string]> => {
  try {
    const wallet = new ethers.Wallet(privateKey)
    const provider = new ethers.providers.JsonRpcProvider(
      `https://mainnet.infura.io/v3/${REACT_APP_INFURA_ID}`,
      'mainnet'
    )
    const balance = await provider.getBalance(wallet.address)
    const balanceInEth = ethers.utils.formatEther(balance)

    return [null, wallet.address, balanceInEth]
  } catch (ex) {
    return [ex as Error, '', '']
  }
}

export { getPrivateKeyFromMnemonic, getAddressAndBalanceFromPrivateKey }
