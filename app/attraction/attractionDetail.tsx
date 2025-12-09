import { useRoute } from "@react-navigation/native";
import { View, Text, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { Image } from "@/components/ui/image"; 
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import {
    ArrowLeftIcon
}
from 'lucide-react-native';

export default function AttractionDetailScreen({ }: any) {
  const navigation = useNavigation();
    const { item } = useRoute().params;
    // const route = useRoute();

    // const item = route.params?.item;
    console.log('item ' , item)


  return (
    <SafeAreaView className="bg-white w-full h-full" >
    <ScrollView className="bg-white w-full h-full" contentContainerStyle={{ flexGrow: 1 }}>
      <Pressable className="absolute top-5 left-5 w-8 h-8 rounded-full bg-white justify-center items-center z-20"
        onPress={ () => {                       
            navigation.goBack()
        }}>
        <Icon as={ArrowLeftIcon}  />
      </Pressable>
      <Box className="w-full   relative ">
      {/* 넣고 안넣고 차이 */}
      {/* <Box className="w-full  h-full  relative ">  */}
       
        <View className="relative w-full h-full">
          <Image
            source={ item.image }
            className="w-full h-full "                     
            resizeMode="cover"
          />
        </View>

        <View className="px-6 py-5">
          <Text className="text-3xl font-bold text-black">{item.title}</Text>
          <Text className="text-gray-600 text-base mt-1">{item.location}</Text>

          <View className="flex-row items-center mt-3">
            <Text className="text-yellow-400 text-2xl mr-1">★</Text>
            <Text className="text-gray-700 text-lg">{item.like}</Text>
          </View>

          <Text className="text-gray-700 text-base mt-4 leading-6">
            {item.description}
          </Text>

          {/* 액션버튼 */}
          <TouchableOpacity
            onPress={() => 
              navigation.navigate("attraction/attractionList",{})

            }
            className="mt-7 py-3 bg-green-600 rounded-xl"
          >
            <Text className="text-center text-white font-semibold text-lg">
              뒤로가기
            </Text>
          </TouchableOpacity>
        </View>
       </Box>
    </ScrollView>
    </SafeAreaView>
  );
}
