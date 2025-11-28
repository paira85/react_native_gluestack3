import React from 'react'
import { Pressable, Text, View , Modal, TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (day: string, ids: number[]) => void;
};
export default function ScheduleModal( {visible , onClose , onSubmit} : Props) {

  return (
   <Modal visible={visible} transparent animationType="fade">
        <View className="flex-1 bg-black/40 justify-center items-center px-4">
        <View className="w-full bg-white rounded-2xl p-5 max-h-[70%]">

            {/* 제목 */}
            <Text className="text-lg font-bold mb-4">날짜선택</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Text>Hello</Text>
            </ScrollView>

            {/* 버튼 */}
            <View className="flex-row mt-5">
                <TouchableOpacity 
                    onPress={onClose}
                    className="flex-1 py-3 bg-gray-200 rounded-xl mr-2"
                >
                    <Text className="text-center font-semibold">닫기</Text>
                </TouchableOpacity>
            
            </View>
        </View>
        </View>
    </Modal>
  )
}
