import React, { useEffect } from 'react'
import { View, Text, Image, BackHandler } from 'react-native'
import Constants from 'expo-constants'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
const windowWidth = Dimensions.get('window').width;

export default function FinishScreen({ route, navigation }) {
  const handleHome = () => {
    navigation.navigate('Home')
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true)
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true)
  }, [])

  return (
    <View style={{ paddingTop: Constants.statusBarHeight + 30, alignItems: 'center', justifyContent: 'center', padding: 30, flex: 1 }}>
      {route.params.status !== 'win' ?
        <View>
          <Image
            style={{ width: windowWidth / 1.3, height: windowWidth / 2.5, alignSelf:'center' }}
            source={{ uri: 'https://pub-static.haozhaopian.net/assets/stickers/jieba05/3165d8a6-e750-4459-bd51-2bd786a6517f_medium_thumb.jpg' }}
          />
          <Text style={{ fontSize: 22, textAlign: 'center', alignItems: 'center', marginTop: 30 }}>
            Better Luck Next Time , {route.params.name || 'Anonymous'}
          </Text>
        </View>
        :
        <View>
          <Image
            style={{ width: windowWidth / 1.2, height: windowWidth / 2.5, alignSelf:'center' }}
            source={{ uri: 'https://images.squarespace-cdn.com/content/v1/55f070e5e4b0ddb9204915e6/1445303710596-1GT532MZXB8Z1TJSROH9/ke17ZwdGBToddI8pDm48kNkl0FADWZTxS3QkfKeBEdcUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYy7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2do3kYxx0KMlg8YFiMU3VJ-akyoqMXEYTfLULFnNYuouICjLISwBs8eEdxAxTptZAUg/beyou.png' }}
          />
          <Text style={{ fontSize: 25, textAlign: 'center', alignItems: 'center' }}>
            Congrats {route.params.name || 'Anonymous'}, You Won!
          </Text>
        </View>
      }

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
        <TouchableOpacity
          style={{ borderWidth: 0.6, margin: 7, borderRadius: 30, borderColor: 'gray', paddingVertical: 10, width: windowWidth / 3 }}
          onPress={() => handleHome()}
        >
          <Text style={{ textAlign: 'center' }}>Back Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
