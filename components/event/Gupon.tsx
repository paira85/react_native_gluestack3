import React from 'react'
import { View } from 'react-native'
import { Text } from '../ui/text'

export default function Gupon() {
  return (
    <View className="px-4 mt-6">
        <Text className="text-xl font-bold text-blue-900">GOGO! Mr강강</Text>

        <View className="flex-row justify-between mt-4">
            <View className="border border-blue-800 rounded-xl px-5 py-4 flex-1 mr-3">
            <Text className="text-blue-800 font-semibold">🎫 보유쿠폰 0</Text>
            </View>

            <View className="border border-blue-800 rounded-xl px-5 py-4 flex-1">
            <Text className="text-blue-800 font-semibold">🎁 쿠폰 받기</Text>
            </View>
        </View>
    </View>   
  )
}
