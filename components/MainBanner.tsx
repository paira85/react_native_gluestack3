import React, { useEffect, useRef, useState } from 'react'
import { Box } from './ui/box'
import { Image } from './ui/image'
import { Text } from './ui/text'
import { Dimensions, ScrollView } from 'react-native';
import { SwiperFlatList } from "react-native-swiper-flatlist";

const { width } = Dimensions.get("window");
type BannerItem = {
  image: any;
  title: string;
  subtitle: string;
};

type Props = {
  data: BannerItem[];
};
export default function MainBanner( { data }: Props) {  
    const [index, setIndex] = useState(0);
    
  return (
    <Box className="w-full" >
        <SwiperFlatList
        // autoplay
        // autoplayDelay={10}
        // autoplayLoop
        showPagination={true}
        onChangeIndex={({ index }) => setIndex(index)}
        data={data}
        renderItem={({ item }) => (
             <Box className="relative" style={{width:width}}>       
               <Image
                    // source={require("/assets/images/background/1739799352351-27.jpg")}
                    source={item.image}
                    className="w-full min-h-[400px] max-h-[600px] h-[600px]"
                    resizeMode="cover"
                    alt="#IMAGE"
                >
                </Image>
                <Box className="absolute inset-0 items-center justify-center  ">
                    <Text className="text-center text-white text-3xl font-bold mb-2"
                        style={{
                        textShadowColor: "rgba(0, 0, 0, 0.7)",
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 4,
                        }}>
                        {item.title}
                    </Text>
                </Box>
                <Box className="absolute inset-0 items-center justify-end mb-5">
                    <Text className="text-center text-white font-bold"
                        style={{
                        textShadowColor: "rgba(0, 0, 0, 0.6)",
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 3,
                    }}>
                        {item.subtitle}
                    </Text>
                </Box>

            </Box>
            )}
        />
        {/* <ScrollView
            ref={scrollRef}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
                const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
                setIndex(newIndex);
            }}
        >
            <Box className="relative" style={{width:width}}>       
                <Image
                    source={require("/assets/images/background/1739799352351-27.jpg")}
                    className="w-full min-h-[400px] max-h-[600px] h-[600px]"
                    resizeMode="cover"
                >
                </Image>
                <Box className="absolute inset-0 items-center justify-center  ">
                    <Text className="text-center text-white text-3xl font-bold mb-2"
                        style={{
                        textShadowColor: "rgba(0, 0, 0, 0.7)",
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 4,
                        }}>
                        FINNS{"\n"} Beach Club
                    </Text>
                </Box>
                <Box className="absolute inset-0 items-center justify-end ">
                    <Text className="text-center text-white font-bold mb-5 "
                        style={{
                        textShadowColor: "rgba(0, 0, 0, 0.6)",
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 3,
                    }}>
                        World`s{"\n"}Best Beatch Club
                    </Text>
                </Box> 
            </Box>

            <Box className="relative" style={{width:width}}>       
                <Image
                    source={require("/assets/images/background/1739799352351-26.jpg")}
                    className="w-full min-h-[400px] max-h-[600px] h-[600px]"
                    resizeMode="cover"
                >
                </Image>
                <Box className="absolute inset-0 items-center justify-center  ">
                    <Text className="text-center text-white text-3xl font-bold mb-2"
                        style={{
                        textShadowColor: "rgba(0, 0, 0, 0.7)",
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 4,
                        }}>
                        FINNS{"\n"} Beach Club
                    </Text>
                </Box>
                <Box className="absolute inset-0 items-center justify-end ">
                    <Text className="text-center text-white font-bold mb-5 "
                        style={{
                        textShadowColor: "rgba(0, 0, 0, 0.6)",
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 3,
                    }}>
                        World`s{"\n"}Best Beatch Club
                    </Text>
                </Box> 
            </Box>
        </ScrollView> */}
    </Box>
  )
}
