import { Pressable, Text, StyleSheet } from 'react-native'

const Button = (props: {
  text: string
  onPress: () => void
  additionalStyles?: object
}) => {
  return (
    <Pressable
      style={[styles.container, props.additionalStyles || {}]}
      onPress={props.onPress}
    >
      <Text style={styles.text}>{props.text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 190,
    height: 40,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: 10,
    borderRadius: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
})

export default Button
