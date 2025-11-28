import React, { useEffect, useState } from 'react';

import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from '@/components/ui/box';

import { Divider } from '@/components/ui/divider';

import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import MainBanner from '@/components/MainBanner';
import Gupon from '@/components/event/Gupon';
import { Icon } from '@/components/ui/icon';
const placeholder = (w, h) =>
  ({ uri: `https://via.placeholder.com/${w}x${h}.png?text=IMG` });

import {
  InstagramIcon,
  FacebookIcon,
  Camera,
  MailIcon,
  ChromeIcon,
  PhoneIcon,
}
from 'lucide-react-native';
import { P } from '@expo/html-elements';
import Footer from '@/components/Footer';
import BottomMenu from '@/components/menus/BottomMenu';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import EnjoiList from '@/components/enjoi/EnjoiList';
import { router, useLocalSearchParams } from 'expo-router';
import RootNavigation from '../navigate';

export default function MainLayout() {
  const bannerData = [
    {
      image: require("/assets/images/background/1739799352351-26.jpg"),
      title: "FINNS \n Beach Club",
      subtitle: "In Bali",
    },
    {
      image: require("/assets/images/background/1739799352351-27.jpg"),
      title: "World's \n Best Beach Club",
      subtitle: "In Bali",
    }, 
  ];
  
  const categoriesRow1 = [
    { label: "기념품", icon: require("/assets/images/icons/gift.png") ,"id":"1"},
    { label: "산책로", icon: require("/assets/images/icons/gps.png") ,"id":"2"},
    { label: "카페/펌", icon: require("/assets/images/icons/coffee-cup.png") ,"id":"3"},
    { label: "음식점", icon: require("/assets/images/icons/pizza.png") ,"id":"4"},
    { label: "서핑", icon: require("/assets/images/icons/skateboard.png") ,"id":"5"},
    { label: "숙소", icon: require("/assets/images/icons/skateboard.png") ,"id":"6"},
  ];

  const [enjoiTabIndex , setEnJoiTabIndex] = useState<Number>(0)
  console.log('enjoiTabIndex ' , enjoiTabIndex)


  //[에스레포츠] : http://www.sleports.com/

  //블러그, 인스타 광고 및 정보 링크
  return (
    <SafeAreaView className="bg-white flex-1" >
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>

        <Box className="flex-1 ">
            <Header />         
            {/* BODY */}
            <Box className="flex-1 h-full w-full mb-10">
              {/* BIG BANNER */}           
              <MainBanner data={bannerData} />        
              {/* 쿠폰 영역 */}
              <Gupon />

              {/* 카테고리 아이콘 2줄 */}
              <Box className="bg-white pt-6 px-4 mb-3">
                {/* 1줄 */}
                <Box className="flex-row justify-around gap-4">
                  {categoriesRow1.map((item) => (
                    <Pressable onPress={() =>
                          router.push({
                              pathname: "/event",
                              params: { id: item.id }
                          })
                      }
                    >
                      <View key={item.label} className="items-center ">                     
                          <Image
                            source={item.icon}
                            style={{ width: "100%", height: "100%" }}
                            resizeMode="contain"
                            className="w-10 h-10 mb-1 h-[60px]"
                            alt="CATEGORY"
                          />
                        
                        <Text className="text-[12px] text-[#00306E] ">
                          {item.label}
                        </Text>              
                      </View>
                    </Pressable>
                  ))}
                </Box>
              </Box>

              <Box className="bg-white pt-6 px-4 mb-3">
                {/* 1줄 */}
                <Box className="flex-row justify-around gap-4">
                  {categoriesRow1.map((item) => (
                    <View key={item.label} className="items-center ">
                     
                        <Image
                          source={item.icon}
                          style={{ width: "100%", height: "100%" }}
                          resizeMode="contain"
                          className="w-10 h-10 mb-1 h-[60px]"
                          alt="CATEGORY"
                        />
                      
                      <Text className="text-[12px] text-[#00306E] ">
                        {item.label}
                      </Text>              
                    </View>
                  ))}
                </Box>
              </Box>
              
               <EnjoiList 
                  fnTabIndex={setEnJoiTabIndex}  
                  index={enjoiTabIndex} 
                />   
                               
            </Box>
            <Divider className="bg-primary-500" />
            
        </Box>
        <Footer />        
        {/* 하단 큰 아이콘 메뉴 */}
        <BottomMenu />
         
        </ScrollView>
    </SafeAreaView>
  );
}
