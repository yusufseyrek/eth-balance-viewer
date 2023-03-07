import { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native'
import * as SecureStore from 'expo-secure-store'

import { getPrivateKeyFromMnemonic } from '../utils/web3'
import { SAVED_PRIVATE_KEY } from '../utils/constants'
import { ethers } from 'ethers'
import Button from './Button'

const SeedPhraseInputView = (props: {
  onPrivateKeySaved: (privateKey: string) => void
}) => {
  const [mnemonic, setMnemonic] = useState('')
  const [busy, setBusy] = useState(false)

  const onPressSave = async () => {
    setBusy(true)

    setTimeout(async () => {
      const [mnemonicErr, privateKey] = getPrivateKeyFromMnemonic(mnemonic)
      if (mnemonicErr) {
        Alert.alert(mnemonicErr.message)
      } else {
        await SecureStore.setItemAsync(SAVED_PRIVATE_KEY, privateKey)
        props.onPrivateKeySaved(privateKey)
        setMnemonic('')
        Alert.alert('Success', 'Private key is securely stored!')
      }
      setBusy(false)
    }, 0)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        Please enter your twelve-word recovery seed:
      </Text>
      <TextInput
        style={styles.input}
        editable
        multiline
        numberOfLines={4}
        value={mnemonic}
        onChangeText={setMnemonic}
        textAlignVertical="top"
      />

      <Button text="Verify Seed Phrase" onPress={onPressSave} />

      {busy && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={'white'} />
          <Text style={styles.loadingText}>
            Verifying Seed Phrase. Please wait...
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 5,
  },
  infoText: {
    fontSize: 18,
    letterSpacing: 0.25,
    fontWeight: 'bold',
  },
  input: {
    height: 80,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'gray',
    lineHeight: 20,
    padding: 5,
    marginTop: 10,
    borderRadius: 3,
    textDecorationLine: 'none',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.4,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: 'white',
  },
})

export default SeedPhraseInputView
