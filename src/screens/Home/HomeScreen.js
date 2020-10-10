import React, { useState } from 'react'
import { View, Picker, Button, Text, TextInput, Image } from 'react-native'
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  const [difficulty, setdifficulty] = useState("Easy");
  const [name, setName] = useState("")

  const handlePlay = () => {
    navigation.push('Play', { difficulty, name })
    setTimeout(() => {
      setName('')
    }, 1000)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        style={{ width: windowWidth / 1.5, height: windowWidth / 1.5 }}
        source={{uri: 'https://images.assetsdelivery.com/compings_v2/urfandadashov/urfandadashov1808/urfandadashov180815816.jpg'}}
      />

      <View>
        <Text>Difficulty</Text>
        <Picker
          selectedValue={difficulty}
          style={{ height: 50, width: 150 }}
          onValueChange={itemValue => setdifficulty(itemValue)}
        >
          <Picker.Item label="Easy" value="Easy" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="Hard" value="Hard" />
        </Picker>
      </View>

      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <TextInput
          style={{ borderWidth: 0.4, borderRadius: 10, width: windowWidth / 1.5, padding: 6 }}          
          placeholder="Name"
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>

      <TouchableOpacity
        style={{borderWidth: 0.6, margin: 7, borderRadius: 30, borderColor: 'gray', paddingVertical: 10, width: windowWidth / 1.5}}
        onPress={() => {
          handlePlay()
        }}
      >
        <Text style={{ textAlign: 'center', fontSize: 17 }}>
          New Game
        </Text>
      </TouchableOpacity>
    </View>
  )
}
