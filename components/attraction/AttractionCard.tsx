import { TouchableOpacity, View, Text } from "react-native";
import { Image } from "@/components/ui/image"; 
export default function AttractionCard({ item, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full w-[320px] relative  mx-auto mb-5 bg-white rounded-2xl shadow-md gap-2 mr-2"
      activeOpacity={0.8}
    >
        <View className="py-2 px-2 h-48 rounded-3xl overflow-hidden ">
            <Image
                // source={{ uri: item.image }}
                source={item.image }
                className="w-full h-full "        
                resizeMode="cover"
                alt="card" 
            />
        </View>

{/* 타이틀 오버레이 */}
        <View className="absolute w-full pb-2 px-3  items-center justify-center inset-0 ">
            <Text
            className="text-center text-white text-1xl font-bold mb-2"
            style={{
                textShadowColor: "rgba(0, 0, 0, 0.7)",
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 4,
            }}>
            {item.title}
            </Text>
        </View>
      
      {/* <View className="px-4 py-3">
        <Text className="text-xl font-bold text-black">{item.title}</Text>
        <Text className="text-gray-500 text-sm mt-1">{item.location}</Text>

        <View className="flex-row items-center mt-2">
          <Text className="text-yellow-400 text-lg mr-1">★</Text>
          <Text className="text-gray-700">{item.like}</Text>
        </View>
      </View> */}
    </TouchableOpacity>
  );
}
