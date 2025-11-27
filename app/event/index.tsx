import HouseList from "@/components/cards/house/HouseList";
import FoodList from "@/components/food/FoodList";
import { Icon } from "@/components/ui/icon";
import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions } from "react-native";


const screenWidth = Dimensions.get('window').width;

export default function CouponReservationScreen() {
  
  return (
    <SafeAreaView className="flex-1 bg-white mb-5 ">
      {/* HEADER */}
      <View className="h-14 flex-row justify-center items-center border-b border-gray-100">
        <TouchableOpacity className="absolute left-4">
          <Icon />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">쿠폰 사용/예약</Text>
      </View>

      {/* CATEGORY */}
      <View className="flex-row flex-wrap mt-3 gap-3  px-4">
        {["음식점", "카페/펍", "서핑숍", "체험", "워케이션", "숙박"].map((label) => {
          const selected = label === "숙박";
          return (
            <TouchableOpacity
              key={label}
              className={`px-5 py-2 rounded-xl border w-[100px] ${
                selected ? "bg-black border-black" : "border-gray-300"
              }`}
            >
              <Text className={`${selected ? "text-white font-semibold" : "text-gray-700"}`}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      
      {/* 음식 */}
      <FoodList />
        {/* 숙박 */}
      {/* <HouseList /> */}

      {/* FLOATING SEARCH BUTTON */}
      <TouchableOpacity className="absolute bottom-6 right-5 w-14 h-14 rounded-full bg-blue-900 justify-center items-center">
        <Icon />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
