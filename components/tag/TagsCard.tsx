import { Text, View } from "react-native";

export default function  TagsCard({ tags }: any)  {
  return (
    <View className="bg-white rounded-2xl shadow-md px-5 py-6 mb-5">
      <View className="flex-row flex-wrap">
        {tags.map((tag: string, index: number) => (
          <View
            key={index}
            className="px-4 py-2 bg-gray-100 rounded-full mr-2 mb-2"
          >
            <Text className="text-gray-700 text-sm"># {tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};