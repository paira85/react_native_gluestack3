import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function ServicesCard({ services }: any) {
  const [serviceList,setServiceList] = useState([]);
  useEffect(() => {
    console.log('services' , services)
    if (!services) {
      let aa = [
        { icon: "dog-side", label: "반려동물" },
        { icon: "sofa", label: "휴식석" },
        { icon: "parking", label: "주차" },
        { icon: "food-takeout-box", label: "테이크아웃" },
        { icon: "human-male-female", label: "화장실" },
        { icon: "wifi", label: "와이파이" },
        { icon: "baby-carriage", label: "키즈존" },
        { icon: "smoking-off", label: "금연" },
      ]
      setServiceList(aa)
    }else{
      setServiceList(services)
    }
  }, [services])
  return (
    <View className="bg-white rounded-2xl px-5 py-5 mb-5">
      <Text className="text-xl font-bold text-black mb-4">제공서비스</Text>

      <View className="flex-row flex-wrap justify-between">
        {serviceList?.map((item: any, index: number) => (
          <View key={index} className="items-center w-1/4 my-3">
            <MaterialCommunityIcons
              name={item.icon}
              size={32}
              color="#3C3C3C"
            />
            <Text className="text-sm text-gray-600 mt-2">{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
