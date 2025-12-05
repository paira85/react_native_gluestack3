import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

export default function  ServicesCard ({ services }: any) {
  return (
      <View className="bg-white rounded-2xl shadow-md px-5 py-5 mb-5">
      <Text className="text-xl font-bold text-black mb-4">제공서비스</Text>

      <View className="flex-row flex-wrap justify-between">
        {services.map((item: any, index: number) => (
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
