import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { getAddressAndBalanceFromPrivateKey } from '../utils/web3'

const ETHBalanceView = (props: { privateKey: string }) => {
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const [err, address, balance] = await getAddressAndBalanceFromPrivateKey(
        props.privateKey
      )
      if (err) {
        Alert.alert('Failure', 'Could not get address and the ETH balance.')
      } else {
        setAddress(address)
        setBalance(balance)
      }
    }
    fetchData()
  }, [props.privateKey])

  if (!address || !balance) {
    return null
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Address:</Text>
      <Text>{address}</Text>
      <Text style={styles.heading}>Balance:</Text>
      <Text>{`${balance} ETH`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
})

export default ETHBalanceView
