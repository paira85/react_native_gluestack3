import HoluseCards from "@/components/cards/house/HoluseCards";
import { Icon } from "@/components/ui/icon";
import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, Dimensions } from "react-native";


export default function HouseList() {
  const data= {
    "성인":"2",
    "시작일자":"",
    "종료일자":"",
    "할인율":"",
    "시작금액":"",
    "종료금액":"",
    "숙박유형":"호텔/리조트,모델,게스트하우스,펜션/풀빌라",
    "이미지":"이미지",
    "타이틀":"양양 티미하우스 펜션",
    "좌표x":"x",
    "좌표y":"y",
    "주소":"강원도 인제군 ",
    "전화번호":"010-111-1111 ",
  }

  return (
    <>
    <Text className="px-4 mt-6 text-xl font-bold text-blue-900">숙박 목록</Text>
    <ScrollView className="px-4 " showsVerticalScrollIndicator={false}>     
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
