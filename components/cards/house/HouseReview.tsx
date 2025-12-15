import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState } from "react";

export default function ReviewTab() {
  const [type, setType] = useState("방문자");

  return (
    <View className="px-5 py-4 space-y-6">

      {/* 리뷰 타입 선택 */}
      <View className="flex-row bg-gray-100 rounded-full p-1">
        {["방문자", "블로그"].map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setType(t)}
            className={`flex-1 py-2 rounded-full ${
              type === t ? "bg-gray-800" : ""
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                type === t ? "text-white" : "text-gray-500"
              }`}
            >
              {t} 리뷰
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 이런 점이 좋았어요 */}
      <View>
        <Text className="text-lg font-bold mb-3">이런 점이 좋았어요</Text>

        <LikeBar label="☕ 커피가 맛있어요" count={1140} />
        <LikeBar label="🍰 디저트가 맛있어요" count={969} />
        <LikeBar label="🥤 음료가 맛있어요" count={535} />
        <LikeBar label="🪑 인테리어가 멋져요" count={485} />
        <LikeBar label="💖 친절해요" count={441} />
      </View>

      {/* 사진·영상 리뷰 */}
      <View>
        <Text className="text-lg font-bold mb-3">사진·영상 리뷰</Text>

        <View className="flex-row flex-wrap justify-between">
          {[1, 2, 3].map((i) => (
            <Image
              key={i}
              source={{ uri: `https://picsum.photos/200/20${i}` }}
              className="w-[32%] h-28 rounded-lg mb-2"
            />
          ))}
        </View>
      </View>

    </View>
  );
}

function LikeBar({ label, count }: any) {
  return (
    <View className="mb-3">
      <View className="flex-row justify-between mb-1">
        <Text className="text-gray-700">{label}</Text>
        <Text className="text-gray-600">{count}</Text>
      </View>
      <View className="h-8 bg-gray-100 rounded-lg overflow-hidden">
        <View className="h-full bg-teal-300 w-[80%]" />
      </View>
    </View>
  );
}
