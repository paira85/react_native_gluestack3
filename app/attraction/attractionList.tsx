import { View, FlatList, Text, Pressable } from "react-native";
import AttractionCard from "@/components/attraction/AttractionCard";
import { router, useNavigation } from "expo-router";
import { Icon } from "@/components/ui/icon";
import {
  ArrowLeftIcon
}
  from 'lucide-react-native';

const sampleData = [
  {
    id: 1,
    title: "남애항 해변길",
    location: "강원 양양군 현남면",
    image: require("/assets/images/attraction/a.png"),
    like: 13,
    description:
      "맑고 푸른 바다와 해안 산책로가 매력적인 관광명소입니다.",
  },
  {
    id: 2,
    title: "죽도 해변 산책길",
    location: "강원 양양군 죽도리",
    image: require("/assets/images/food/02/4.png"),
    like: 8,
    description:
      "푸르른 숲길과 동해 파도를 동시에 즐길 수 있는 힐링 코스.",
  },
];

export default function AttractionListScreen() {

  const navigation = useNavigation();
  const renderItem = ({ item }: any) => (
    <AttractionCard
      item={item}
      onPress={() =>
        navigation.navigate("attraction/attractionDetail", { item })

        // router.push({
        //     pathname: "./attractionDetail",
        //     params: {
        //         title : item.title,
        //         description : item.description,
        //         like : item.tiliketle,
        //         image : item.image,
        //         location : item.location,
        //         id:item.id
        //       }
        // })
      }
    />
  );

  return (
    <View className="flex-1 bg-gray-100 pt-6 py-2 px-2">
      <View className="flex-row items-center mb-5 gap-3 " >
        <Pressable className="w-8 bg-black h-8  rounded-full justify-center items-center "
          onPress={() => {
            navigation.goBack()
          }}>
          <Icon as={ArrowLeftIcon} className="text-white font-semibold " />
        </Pressable>
        <Text className="text-2xl font-bold text-black">
          추천 관광명소
        </Text>
      </View>
      <FlatList
        data={sampleData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
