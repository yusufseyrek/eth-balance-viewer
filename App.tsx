import '@ethersproject/shims'

import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { StyleSheet, Text, Platform, SafeAreaView } from 'react-native'
import ETHBalanceView from './components/ETHBalanceView'

import SeedPhraseInputView from './components/SeedPhraseInputView'

const App = () => {
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState('')

  const seedPhraseUpdated = (address: string, balance: string) => {
    setAddress(address)
    setBalance(balance)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.heading}>ETH balance viewer</Text>
      <SeedPhraseInputView onSeedPhraseUpdated={seedPhraseUpdated} />
      <ETHBalanceView address={address} balance={balance} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 20,
  },
})

export default App
