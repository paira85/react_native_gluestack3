import { View, Text } from "react-native";

export default function InfoTab() {
  return (
    <View className="bg-[#faf7f0]">

      {/* 소개 */}
      <View className="px-5 py-6">
        <Text className="text-lg font-bold mb-4">소개</Text>

        <View className="items-center">
          {/* 프로필 */}
          <View className="w-14 h-14 rounded-full bg-gray-200 items-center justify-center mb-3">
            <Text className="text-2xl">👩🏻‍🍳</Text>
          </View>

          {/* 말풍선 */}
          <View className="bg-white rounded-2xl px-5 py-4 shadow-sm max-w-[90%]">
            <Text className="text-gray-800 leading-relaxed">
              대전 카페의 자부심 커닝입니다.
            </Text>
            <Text className="text-gray-600 mt-2">
              갈마동 본점 : ‘중덕’
            </Text>
          </View>
        </View>
      </View>

      {/* 편의시설 */}
      <Section title="편의시설 및 서비스 3">
        <IconRow label="포장" icon="🛍️" />
        <IconRow label="무선 인터넷" icon="📶" />
        <IconRow label="남/녀 화장실 구분" icon="🚻" />
      </Section>

      {/* 주차 */}
      <Section title="주차">
        <Row label="주차 불가" icon="🚫" />
      </Section>

      {/* 결제수단 */}
      <Section title="결제수단 1">
        <Row label="제로페이" icon="💳" />
      </Section>

    </View>
  );
}

/* 공통 컴포넌트 */
function Section({ title, children }: any) {
  return (
    <View className="bg-white px-5 py-4 mb-2">
      <Text className="text-base font-bold mb-3">{title}</Text>
      <View className="space-y-3">{children}</View>
    </View>
  );
}

function IconRow({ icon, label }: any) {
  return (
    <View className="flex-row items-center space-x-4">
      <Text className="text-2xl">{icon}</Text>
      <Text className="text-gray-700">{label}</Text>
    </View>
  );
}

function Row({ icon, label }: any) {
  return (
    <View className="flex-row items-center space-x-4">
      <Text className="text-xl">{icon}</Text>
      <Text className="text-gray-700">{label}</Text>
    </View>
  );
}
