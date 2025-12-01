import { Pressable, Text, View , Modal, TouchableOpacity} from 'react-native'
import { Box } from '../ui/box';

export default function SettlementItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box className="bg-white p-4 rounded-xl mb-3 shadow">
        <Text className="text-lg font-bold">{item.title}</Text>
        <Text className="text-gray-600">{item.date}</Text>
        <Text className="text-blue-700 mt-1 font-semibold">{item.amount.toLocaleString()} 원</Text>
      </Box>
    </TouchableOpacity>
  );
}
