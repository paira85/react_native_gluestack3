import { View, Text, TouchableOpacity } from "react-native";

export default function HomeTab() {
  return (
    <View className="px-5 py-4 space-y-4">

      {/* 주소 */}
      <InfoRow
        icon="📍"
        title="대전 중구 중앙로 132 1층 카페 커닝"
      />

      {/* 지하철 */}
      <InfoRow
        icon="🚇"
        title="중앙로역 4번 출구에서 84m"
        sub="중앙로역 4,5번출구 100m"
      />

      {/* 영업시간 */}
      <InfoRow
        icon="⏰"
        title="영업 중 · 23:30에 라스트오더"
      />

      {/* 전화 */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-2">
          <Text className="text-lg">📞</Text>
          <Text className="text-gray-800">0507-1367-1593</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-blue-600 font-semibold">복사</Text>
        </TouchableOpacity>
      </View>

      {/* 편의시설 */}
      <Text className="text-gray-600">
        포장, 무선 인터넷, 남/녀 화장실 구분
      </Text>

      {/* 정보 더보기 */}
      <TouchableOpacity className="mt-4 py-3 rounded-lg border border-gray-300">
        <Text className="text-center font-semibold text-gray-700">
          정보 더보기
        </Text>
      </TouchableOpacity>

    </View>
  );
}

function InfoRow({ icon, title, sub }: any) {
  return (
    <View className="flex-row items-start space-x-3">
      <Text className="text-lg">{icon}</Text>
      <View>
        <Text className="text-gray-800">{title}</Text>
        {sub && <Text className="text-gray-500 text-sm mt-1">{sub}</Text>}
      </View>
    </View>
  );
}
