import '@ethersproject/shims'

import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import * as SecureStore from 'expo-secure-store'
import {
  StyleSheet,
  Text,
  Platform,
  SafeAreaView,
  Pressable,
} from 'react-native'

import ETHBalanceView from './components/ETHBalanceView'
import SeedPhraseInputView from './components/SeedPhraseInputView'
import { SAVED_PRIVATE_KEY } from './utils/constants'
import Button from './components/Button'

const App = () => {
  const [privateKey, setPrivateKey] = useState<string | null>(null)

  useEffect(() => {
    const loadPrivateKey = async () => {
      const privateKey = await SecureStore.getItemAsync(SAVED_PRIVATE_KEY)
      setPrivateKey(privateKey)
    }

    loadPrivateKey()
  }, [])

  const clearPrivateKey = async () => {
    await SecureStore.deleteItemAsync(SAVED_PRIVATE_KEY)
    setPrivateKey(null)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.heading}>ETH balance viewer</Text>
      {!privateKey && <SeedPhraseInputView onPrivateKeySaved={setPrivateKey} />}
      {privateKey && (
        <>
          <ETHBalanceView privateKey={privateKey} />
          <Button
            additionalStyles={styles.clearButton}
            text="Clear Private Key"
            onPress={clearPrivateKey}
          />
        </>
      )}
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
  clearButton: {
    marginRight: 15,
  },
})

export default App
