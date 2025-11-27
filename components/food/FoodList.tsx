import React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { Text } from '../ui/text'
import { Icon } from '../ui/icon'
import FoodCard from './FoodCards'
// import { Image } from '../ui/image'
import { Image } from 'react-native';
import FoodCards from './FoodCards'

export default function FoodList() {
  return (
    <>
        <Text className="px-4 mt-6 text-xl font-bold text-blue-900">카페/펌 목록</Text>

        {/* <ScrollView className="px-4" showsVerticalScrollIndicator={false}>      */}
        <View className="px-4 flex-1 ">
            {/* TOTAL + SORT */}
            <View className="flex-row justify-between items-center mt-5">
                <Text className="text-sm">
                    총 <Text className="font-bold">20</Text> 개
                </Text>
               
                <TouchableOpacity className="flex-row items-center px-3 py-2 rounded-full gap-2">
                    <Text className="text-sm  w-full ">쿠폰</Text>
                    <Image  
                        source={require('/assets/icons/coupon.png')}
                        className="w-full max-w-[30px] h-full max-h-[30px]"
                        alt="coupon"
                    />
                </TouchableOpacity>
            </View>
            
            <FoodCards />
        </View>
        {/* </ScrollView> */}
    </>   
  )
}
