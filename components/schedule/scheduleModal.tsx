import React, { useEffect, useState } from 'react'
import { Pressable, Text, View , Modal, TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
type Props = {
  visible: boolean;
  data : Choice;
  onClose: () => void;
  onSubmit: (day: string, ids: number[]) => void;
};

type Choice ={
    day : string;
    datas : string[];
}

import { Image } from 'react-native';

export default function ScheduleModal( {visible , onClose , onSubmit, data : {day , datas} } : Props) {
    const places = [
        { id: 1, title: "수산항 봉수대 전망대", name: "수산항 봉수대 전망대", img: require("/assets/images/background/1739799310256-13.jpg") },
        { id: 2, title: "아이서프", name: "아이서프", img: require("/assets/images/background/1739799352351-15.jpg") },
        { id: 3, title: "서프호랑", name: "서프호랑", img: require("/assets/images/background/1739799352351-26.jpg") },
        { id: 4, title: "힐링서프", name: "힐링서프", img: require("/assets/images/background/1739799232079-25.jpg") },
        { id: 5, title: "고성카페", name: "고성카페", img: require("/assets/images/background/1739799352351-27.jpg") },
        { id: 6, title: "뷰카페", name: "뷰카페", img: require("/assets/images/background/1739799352351-27.jpg") },
    ]
    const [selected, setSelected] = useState([]);
    
    const toggle = (id) => {
        setSelected((prev) => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
    };

    useEffect(() => {
        if(visible){
           const ids = datas.map(item => item.id);
            setSelected(ids);
            console.log('selected ' , selected)
        }
        
    }, [visible]);
    
  return (
   <Modal visible={visible} transparent animationType="fade">
        <View className="flex-1 h-full bg-black/40 justify-center items-center px-4 ">
        <View className="w-full bg-white rounded-2xl p-5 h-[500px]">

            {/* 제목 */}
            <Text className="text-lg font-bold mb-4">여행지 선택</Text>

            
            <ScrollView showsVerticalScrollIndicator={false} className="flex-row mb-4">
                <View className="flex-row flex-wrap ">
                {places.map((p) => {
                    const isSelected = selected.includes(p.id);
                    // console.log('isSelected ' , isSelected)
                    return (
                    <TouchableOpacity
                        key={p.id}
                        onPress={() => toggle(p.id)}
                        activeOpacity={0.9}
                        className="w-[48%] mb-4"
                    >
                        <View
                        className={`rounded-xl overflow-hidden border  h-[150px] ${
                            isSelected ? "border-blue-600" : "border-gray-300"
                        }`}
                        >
                        {/* 체크박스(네모 박스) */}
                        <View
                            className={`absolute top-2 left-2 w-6 h-6 rounded border-2 flex items-center justify-center z-20 ${
                            isSelected ? "bg-blue-600 border-blue-600" : "bg-white border-gray-400"
                            }`}
                        >
                            {isSelected && (
                            <Text className="text-white text-sm font-bold">✓</Text>
                            )}
                        </View>
                        
                        {/* 카드 이미지 */}
                        <Image
                            source={p.img}
                            resizeMode="cover"
                            style={{width: '100%', height: '80%'}}
                        />

                        {/* 타이틀 */}
                        <Text className="px-2 text-base font-semibold items-center text-center">
                            {p.name}
                        </Text>
                        </View>
                    </TouchableOpacity>
                    );
                })}
                </View>
            </ScrollView>
            
            {/* 버튼 */}
            <View className="flex-row mt-5">
                <TouchableOpacity 
                    onPress={() => {

                        const result = places.filter(p => selected.includes(p.id));
                        console.log('result ' , result)
                        onSubmit(day , result)
                    }}
                    className="flex-1 py-3 bg-gray-200 rounded-xl mr-2"
                >
                    <Text className="text-center font-semibold">저장</Text>
                </TouchableOpacity>
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
