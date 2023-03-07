import { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native'

import { getAddressFromMnemonic, getETHBalance } from '../utils/web3'

const SeedPhraseInputView = (props: {
  onSeedPhraseUpdated: (address: string, balance: string) => void
}) => {
  const [mnemonic, setMnemonic] = useState('')
  const [busy, setBusy] = useState(false)

  const onPressSave = async () => {
    setBusy(true)

    setTimeout(async () => {
      const [mnemonicErr, address] = getAddressFromMnemonic(mnemonic)
      if (mnemonicErr) {
        Alert.alert(mnemonicErr.message)
      } else {
        const [balanceErr, balance] = await getETHBalance(address)
        if (balanceErr) {
          Alert.alert(balanceErr.message)
        } else {
          props.onSeedPhraseUpdated(address, balance)
        }
        setBusy(false)
      }
    }, 0)
  }

  const onSeedTextChange = (text: string) => {
    setMnemonic(text)
    props.onSeedPhraseUpdated('', '')
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
        onChangeText={(text) => onSeedTextChange(text)}
        textAlignVertical="top"
      />
      <Pressable style={styles.saveButton} onPress={onPressSave}>
        <Text style={styles.saveButtonText}>Show ETH Balance</Text>
      </Pressable>

      {busy ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={'white'} />
        </View>
      ) : null}
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
  saveButton: {
    width: 190,
    height: 40,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: 10,
    borderRadius: 3,
  },
  saveButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
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
})

export default SeedPhraseInputView
