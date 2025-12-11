import { Text, TouchableOpacity, View } from "react-native";


export default function  ReviewCard({ score, count, onWrite }: any)  {
  return (
    <View className="bg-white rounded-2xl  px-5 py-6 mb-5">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-black">리뷰</Text>
        <TouchableOpacity onPress={onWrite}>
          <Text className="text-base text-blue-600">리뷰 작성하기 ＞</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center mb-3">
        <Text className="text-4xl font-extrabold text-black">{score}</Text>
        <Text className="text-gray-500 text-base ml-2">총 {count}건의 리뷰</Text>
      </View>

      <View className="flex-row mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Text
            key={i}
            className={`text-3xl mr-1 ${
              i < Math.round(score) ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </Text>
        ))}
      </View>
    </View>
  );
};