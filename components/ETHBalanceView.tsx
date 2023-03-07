import { View, Text, StyleSheet } from 'react-native'

const ETHBalanceView = (props: { address: string; balance: string }) => {
  if (!props.address && !props.balance) {
    return null
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Following address found for the given seed phrase above:
      </Text>
      <Text>{props.address}</Text>
      <Text style={styles.heading}>Balance:</Text>
      <Text>{`${props.balance} ETH`}</Text>
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
