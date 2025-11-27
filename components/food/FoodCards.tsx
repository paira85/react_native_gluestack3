import { Icon } from '@/components/ui/icon';
import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { Image } from '../ui/image';
import { Image } from 'react-native';
import FoodCard from './FoodCard';
import { Food } from '@/types/Food';
const screenWidth = Dimensions.get('window').width;


export default function FoodCards() {
    const [foodData,setFoodData] = useState<Food[]>([]);

    const setDatas = () => {
        const datas = [    
            {
                title: "휴백담 베이커리 카페 강원도 인제 본점",
                category: "카페,디저트",
                status: "영업중",
                star: "4.59",
                desc:"넓은 매장에서 여유롭게 즐기는 시간",
                review: "555",
                answer: "카페가 너무 이뻐요",
                coupon:'15',
                img: require("/assets/images/food/01/2.png"),
                sumImg : [
                    require("/assets/images/food/01/1.png"),
                    require("/assets/images/food/01/2.png"),
                    require("/assets/images/food/01/3.png")
                ]
            },
            {
                title: "백담문스카페카페",
                category: "카페,디저트",
                status: "영업종료",
                star: "4.51",
                review: "885",
                answer: "음식이 너무 맛있습니다.",
                coupon:'',
                img: require("/assets/images/food/02/4.png"),
                sumImg : [
                    require("/assets/images/food/02/4.png"),
                    require("/assets/images/food/02/5.png"),
                    require("/assets/images/food/02/6.png")
                ]
            } 
        ]
        
        setFoodData(datas)
    }

    useEffect(()=>{
        
        console.log('foodData' , foodData)
        setDatas()
    },[])

    return (
        <View className="mb-3 flex-1">
            {/* 숙박유형 */}
            <View className="mt-3 mb-3 flex ">
                <Text className="text-sm font-semibold mb-2">음식점유형</Text>
                <View className="flex-row gap-2">
                    {["커피","베이커리","펌"].map((label, idx) => {
                        const selected = idx === 0;
                        return (
                            <TouchableOpacity
                                key={label}
                                className={`px-4 py-1.5 rounded-full border ${selected ? "bg-black border-black" : "border-gray-300"
                                    }`}
                            >
                                <Text className={`${selected ? "text-white" : "text-gray-700"}`}>{label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
                
      
            <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>           
                {
                foodData.map( (item,idx) => (
                    <FoodCard food={item} />
                ))}

            </ScrollView>
        </View>
    )
}
