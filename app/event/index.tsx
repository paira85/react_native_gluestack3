import HouseList from "@/components/cards/house/HouseList";
import FoodList from "@/components/food/FoodList";
import { Icon as UiIcon } from "@/components/ui/icon";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { JSX, useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions } from "react-native";
import {
    ArrowLeftIcon
}
    from 'lucide-react-native';
import SurfCards from "@/components/cards/surf/SurfCards"
const screenWidth = Dimensions.get('window').width;

export default function CouponReservationScreen() {
  const { id} = useLocalSearchParams();
  const [selected, setSelected] = useState(id)
  const navigation = useNavigation();

  const categoryMap: Record<string, JSX.Element> = {
    "1": <></>,
    "2": <></>,
    "3": <FoodList />,
    "4": <FoodList />,  //<TourList />,
    "5": <SurfCards   fnTabIndex={()=>{}}  
                  index={1} />,   //<SurfCards />,
    "6": <HouseList />,  //<ActivityList />,
  };
  const category = [{id:"1",label:"기념품"},{id:"2",label:"산책로"},{id:"3",label:"카페/펌"},{id:"4",label:"음식점"},{id:"5",label:"서핑"},{id:"6",label:"숙소"}];

  return (
    <SafeAreaView className="flex-1 bg-white mb-5 ">
      {/* HEADER */}
      <View className="h-14 flex-row justify-center items-center border-b border-gray-100">
        <TouchableOpacity className="absolute left-4" onPress={ () => {
          navigation.goBack()
        }}>
          <UiIcon as={ArrowLeftIcon}/>
        </TouchableOpacity>
        <Text className="text-lg font-semibold">쿠폰 사용/예약</Text>
        <TouchableOpacity className="absolute right-4" onPress={ () => {
          router.push({
              pathname: "/main",
              params: { }
          })
        }}>
        <Feather name="home" size={18}  />   
        </TouchableOpacity>
      </View>

      {/* CATEGORY */}
      <View className="flex-row flex-wrap mt-3 gap-3  px-4">
        {category.map((item,idex) => {
          const select = item.id === selected;
          return (
            <TouchableOpacity
              key={item.id}
              className={`px-5 py-2 rounded-xl border w-[100px] ${
                select ? "bg-black border-black" : "border-gray-300"
              }`}
              onPress={ () => {setSelected(item.id)}}
            >
              <Text className={`${select ? "text-white font-semibold" : "text-gray-700"}`}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      
      {
        categoryMap[selected] ?? null        
      }

      {/* FLOATING SEARCH BUTTON */}
      {/* <TouchableOpacity className="absolute bottom-6 right-5 w-14 h-14 rounded-full bg-blue-900 justify-center items-center">
        <Icon />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}
