import { Icon } from '@/components/ui/icon';
import React, { useRef, useState } from 'react'
import { Dimensions, Image, ImageSourcePropType, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import {
    ChevronRightIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
    Type
} from 'lucide-react-native';

const screenWidth = Dimensions.get('window').width;


type Props ={
    urls : ImageSourcePropType[];
}

export default function HouseImage( {urls} : Props) {
    const offsetRef = useRef({ x: 0 });
    const scrollRef = useRef<ScrollView>(null);

    const move = (direction: "left" | "right") => {
        scrollRef.current?.scrollTo({
            x: direction === "right" ?
                offsetRef.current.x + screenWidth - 20 * 0.5
                : offsetRef.current.x - screenWidth - 20 * 0.5,
            animated: true,
        });
    };

    return (
        <View>            
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                // onScroll={onScroll}
                showsHorizontalScrollIndicator={false}
                className="flex-row gap-2"
                onScroll={(e) => {
                    offsetRef.current.x = e.nativeEvent.contentOffset.x;
                }}
                scrollEventThrottle={16}
            >
                {urls?.map((img, index) => {
                    console.log('img', img)
                    return (
                        <Image
                            key={index}
                            source={img}
                            className="rounded-xl w-full h-full"
                            style={{ height: 200, width: screenWidth - 20 }}
                            resizeMode="cover"
                        />
                    )
                })}
            </ScrollView>


            <TouchableOpacity
                onPress={() => move("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 justify-center items-center"
            >
                <Icon as={ ArrowLeftIcon} />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => move("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 justify-center items-center"
            >
                <Icon as={ ArrowRightIcon} />
            </TouchableOpacity>            
        </View>
    )
}
