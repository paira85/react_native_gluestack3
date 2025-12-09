import { Feather } from "@expo/vector-icons";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface Props {
    visible: boolean,
    onClose: void,
    onUpdated: void,
    onDeleted: void
}

export default function SettlementSubModal({ visible, onDeleted, onUpdated, onClose }: Props) {
    return (
        <Modal animationType="fade" transparent visible={visible}>
            <TouchableOpacity
                className="flex-1 bg-black/50 justify-end"
                activeOpacity={1}
                onPress={() => onClose(false)}
            >
                <View className="bg-white rounded-t-3xl px-5 py-7">
                    <TouchableOpacity
                        className="flex-row items-center py-4"
                        onPress={() => {
                            onUpdated();
                        }}
                    >
                        <Feather name="edit" size={20} color="#2563EB" />
                        <Text className="text-lg font-semibold ml-3">수정하기</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="flex-row items-center py-4"
                        onPress={() => {
                            onDeleted();
                        }}
                    >
                        <Feather name="trash-2" size={20} color="#dc2626" />
                        <Text className="text-lg font-semibold ml-3 text-[#dc2626]">삭제하기</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="py-4 mt-2"
                        onPress={() => onClose(false)}
                    >
                        <Text className="text-center text-lg font-bold text-gray-500">취소</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}