import React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { Text } from '../ui/text'
import { Icon } from '../ui/icon'
import FoodCard from './FoodCard'
import { Image } from '../ui/image'

export default function FoodList() {
  return (
    <>
        <Text className="px-4 mt-6 text-xl font-bold text-blue-900">Food 목록</Text>

        <ScrollView className="px-4" showsVerticalScrollIndicator={false}>     
            {/* TOTAL + SORT */}
            <View className="flex-row justify-between items-center mt-5">
                <Text className="text-sm">
                    총 <Text className="font-bold">20</Text> 개
                </Text>

                <TouchableOpacity className="flex-row items-center px-3 py-2 rounded-full bg-gray-100">
                    <Text className="text-sm mr-1">쿠폰</Text>
                    <Image  
                        source={require('/assets/icons/coupon.png')}
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
            </View>
            
            <FoodCard />
        </ScrollView>
           
    </>   
  )
}
