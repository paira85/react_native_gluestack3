import React, { useEffect, useState } from 'react'
import { Pressable, Text, View , Modal, TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import {
    CircleIcon
}
    from 'lucide-react-native';
type Props = {
  visible: boolean;
  data : string[];
  onClose: () => void;
  onSubmit: (day: string, ids: number[]) => void;
};


import { Image } from 'react-native';
import { Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel } from '../ui/radio';

export default function SettlmementModal( {visible , onClose , onSubmit, data } : Props) {
   
    const [selected, setSelected] = useState([]);
    
    const toggle = (id) => {
        setSelected((prev) => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
    };

    const parsedDays = [{id:1,category:"숙박",title:"111"},{id:2,category:"교통",title:"111"}] 

    console.log('list' , data)
    console.log('selected ' , selected)
  return (
   <Modal visible={visible} transparent animationType="fade">
         <View className="flex-1 bg-black/40 justify-center items-center px-4">
           <View className="w-full bg-white rounded-2xl p-5 max-h-[70%]">
   
             {/* 제목 */}
             <Text className="text-lg font-bold mb-4">정산 리스트</Text>
   
             <ScrollView showsVerticalScrollIndicator={false}>
               
                <RadioGroup value={selected} onValueChange={setSelected}>
               {data.map((item, idx) => (
                
                 <TouchableOpacity 
                   key={idx} 
                   onPress={() => setSelected(item.id)}
                   className="py-4 border-b border-gray-200 flex-row justify-between items-center"
                 >
         
                  <View className="flex-row items-center mb-3">
                    <View className={`w-10 h-10 rounded-full justify-center items-center bg-yellow-300`}>
                        <Text className="text-[#0B1C3F] font-bold">
                            {item.category}
                        </Text>
                    </View>

                    <View className="ml-3">
                        <Text className="text-base text-sm"> {item.created_at}</Text>
                        <Text className="text-base font-semibold">{item.title}</Text>                        
                        <Text className="text-base text-sm"> {item.per} / {item.pay}원</Text>
                        
                    </View>
                </View>
                
                   <Radio value={item.id} >
                       <RadioIndicator>
                           <RadioIcon as={CircleIcon} />
                       </RadioIndicator>
                       <RadioLabel>선택</RadioLabel>
                   </Radio>
                   
                 </TouchableOpacity>
                 
               ))}
               
               </RadioGroup>
             </ScrollView>
   
             {/* 버튼 */}
             <View className="flex-row mt-5">
               <TouchableOpacity 
                 onPress={onClose}
                 className="flex-1 py-3 bg-gray-200 rounded-xl mr-2"
               >
                 <Text className="text-center font-semibold">닫기</Text>
               </TouchableOpacity>
   
               <TouchableOpacity 
                 onPress={() => {
                   onSubmit(selected)
                 }}
                 className="flex-1 py-3 bg-blue-600 rounded-xl ml-2"
               >
                 <Text className="text-center text-white font-semibold">정산하기</Text>
               </TouchableOpacity>
             </View>
           </View>
         </View>
       </Modal>
  )
}
