import HoluseCards from "@/components/cards/house/HoluseCards";
import { Icon } from "@/components/ui/icon";
import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, Dimensions } from "react-native";


export default function HouseList() {
  return (
    <>
    <Text className="px-4 mt-6 text-xl font-bold text-blue-900">숙박 목록</Text>
    <ScrollView className="px-4" showsVerticalScrollIndicator={false}>     
        {/* TOTAL + SORT */}
        <View className="flex-row justify-between items-center mt-5">
          <Text className="text-sm">
            총 <Text className="font-bold">134</Text> 개
          </Text>

          <TouchableOpacity className="flex-row items-center px-3 py-2 rounded-full bg-gray-100">
            <Text className="text-sm mr-1">할인율 높은 순</Text>
            <Icon />
          </TouchableOpacity>
        </View>

        {/* DATE & PEOPLE */}
        <View className="flex-row gap-2 mt-4">
          <TouchableOpacity className="px-4 py-2 rounded-full bg-gray-100">
            <Text className="text-sm">11.25(화)~11.26(수),1박</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-4 py-2 rounded-full bg-gray-100">
            <Text className="text-sm">성인 2</Text>
          </TouchableOpacity>
        </View>

        <HoluseCards />
        
      </ScrollView>
    </>
  )
}
