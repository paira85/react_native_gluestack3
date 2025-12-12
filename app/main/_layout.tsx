import { useEffect, useState } from 'react';

import { Box } from '@/components/ui/box';
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Divider } from '@/components/ui/divider';

import Header from '@/components/Header';
import MainBanner from '@/components/MainBanner';
import Gupon from '@/components/event/Gupon';
import { Image } from '@/components/ui/image';
const placeholder = (w, h) =>
  ({ uri: `https://via.placeholder.com/${w}x${h}.png?text=IMG` });

import Footer from '@/components/Footer';
import AttractionCard from '@/components/attraction/AttractionCard';
import CommunityCard from '@/components/board/communutyCard';
import SubBanner from '@/components/cards/banner/SubBanner';
import EnjoiList from '@/components/enjoi/EnjoiList';
import FoodCard from '@/components/food/FoodCard';
import BottomMenu from '@/components/menus/BottomMenu';
import { router, useNavigation } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';

export default function MainLayout() {

  const navigation = useNavigation();

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
    { label: "기념품", icon: require("/assets/images/icons/gift.png"), "id": "1" },
    { label: "산책로", icon: require("/assets/images/icons/gps.png"), "id": "2" },
    { label: "카페/펌", icon: require("/assets/images/icons/coffee-cup.png"), "id": "3" },
    { label: "음식점", icon: require("/assets/images/icons/pizza.png"), "id": "4" },
    { label: "서핑", icon: require("/assets/images/icons/skateboard.png"), "id": "5" },
    { label: "숙소", icon: require("/assets/images/icons/skateboard.png"), "id": "6" },
  ];


  const [enjoiTabIndex, setEnJoiTabIndex] = useState<Number>(0)
  console.log('enjoiTabIndex ', enjoiTabIndex)

  const [communityType, setCommunityType] = useState("일반")

  //[에스레포츠] : http://www.sleports.com/

  //블러그, 인스타 광고 및 정보 링크

  const [attractionIndex, setAttractionIndex] = useState(0)
  const [actionDatas, setActionDatas] = useState([])

  const sampleData = [
    {
      id: 1,
      title: "남애항 해변길",
      location: "강원 양양군 현남면",
      image: require("/assets/images/attraction/a.png"),
      like: 13,
      description:
        "맑고 푸른 바다와 해안 산책로가 매력적인 관광명소입니다.",
    },
    {
      id: 2,
      title: "죽도 해변 산책길",
      location: "강원 양양군 죽도리",
      image: require("/assets/images/food/02/4.png"),
      like: 8,
      description:
        "푸르른 숲길과 동해 파도를 동시에 즐길 수 있는 힐링 코스.",
    },
  ];

  const sampleData2 = [
    {
      id: 1,
      title: "고성 1리 해변길",
      location: "강원 인제군 ",
      image: require("/assets/images/food/02/5.png"),
      like: 13,
      description:
        "맑고 푸른 바다와 해안 산책로가 매력적인 관광명소입니다.",
    },
    {
      id: 2,
      title: "고성 2리 산책길",
      location: "강원 인제군 ",
      image: require("/assets/images/food/02/6.png"),
      like: 8,
      description:
        "푸르른 숲길과 동해 파도를 동시에 즐길 수 있는 힐링 코스.",
    },
  ];

  useEffect(() => {
    console.log('attractionIndex', attractionIndex)
    if (attractionIndex == 0) {
      setActionDatas(sampleData)
    } else {
      setActionDatas(sampleData2)
    }

  }, [attractionIndex])


  const renderFoodItem = ({ item }: any) => (
    <FoodCard
      food={item}
      onPress={() =>
        router.push({
          pathname: "/cafeDetail",
          params: { item: JSON.stringify(item) },
        })
      }
    />
  );

  const foodDatas = [
    {
      id: "1",
      title: "휴백담 베이커리 카페 강원도 인제 본점",
      category: "카페,디저트",
      status: "영업중",
      star: "4.59",
      desc: "넓은 매장에서 여유롭게 즐기는 시간",
      review: "555",
      answer: "카페가 너무 이뻐요",
      coupon: '15',
      img: require("/assets/images/food/01/2.png"),
      sumImg: [
        require("/assets/images/food/01/1.png"),
        require("/assets/images/food/01/2.png"),
        require("/assets/images/food/01/3.png")
      ]
    },
    {
      id: "2",
      title: "백담문스카페카페",
      category: "카페,디저트",
      status: "영업종료",
      star: "4.51",
      review: "885",
      answer: "음식이 너무 맛있습니다.",
      coupon: '',
      img: require("/assets/images/food/02/4.png"),
      sumImg: [
        require("/assets/images/food/02/4.png"),
        require("/assets/images/food/02/5.png"),
        require("/assets/images/food/02/6.png")
      ]
    }
  ]

  const bannerDatas = [
    { id: 1, image: require("/assets/images/banners/31.png"), link: "/shop1" },
    { id: 2, image: require("/assets/images/banners/32.png"), link: "/shop2" },
    { id: 3, image: require("/assets/images/banners/33.png"), link: "/shop3" },
  ];


  const renderAttrat = ({ item, idx }: any) => {
    return (
      <AttractionCard
        key={idx}
        item={item}
        onPress={() =>
          navigation.navigate("attraction/attractionDetail", { item })
        }
      />
    )
  }
  return (
    <SafeAreaView className="bg-white flex-1" >
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>

        <Box className="flex-1 mb-3 ">
          <Header />
          {/* BODY */}
          <Box className="flex-1 h-full w-full ">
            {/* BIG BANNER */}
            <MainBanner data={bannerData} />
            {/* 쿠폰 영역 */}
            <Gupon />

            {/* 카테고리 아이콘 2줄 */}
            <Box className="bg-white pt-6 px-4 mb-3">
              <Box className="flex-row justify-around gap-4">
                {categoriesRow1.map((item) => (
                  <Pressable key={item.label} onPress={() =>
                    router.push({
                      pathname: "/event",
                      params: { id: item.id }
                    })
                  }
                  >
                    <View className="items-center ">
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

            {/* 즐기는 인제 */}
            <EnjoiList
              fnTabIndex={setEnJoiTabIndex}
              index={enjoiTabIndex}
            />

            {/* 광광명소 */}
            <Box className="bg-white px-4 mb-3 ">

              <Text className="text-[20px] py-2 font-extrabold text-black mb-2">관광지</Text>
              <Box className="flex-row gap-4 mb-3">
                <Pressable key={0} onPress={() =>
                  setAttractionIndex(0)
                }
                >
                  <Text>관광명소1</Text>
                </Pressable>
                <Pressable key={1} onPress={() =>
                  setAttractionIndex(1)
                }
                >
                  <Text>관광명소2</Text>
                </Pressable>
              </Box>

              {/* {
                actionDatas.map((item, idx) => (
                  <AttractionCard
                    key={idx}
                    item={item}
                    onPress={() =>
                      navigation.navigate("attraction/attractionDetail", { item })

                    }
                  />
                ))
              } */}

              <FlatList
                data={actionDatas}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderAttrat}
                showsHorizontalScrollIndicator={false}
              />

            </Box>


            <View className=" bg-white pt-6 px-2 mb-3">
              <Text className="text-[20px] font-extrabold text-black mb-2">
                추천장소(핫)
              </Text>
              <FlatList
                data={foodDatas}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderFoodItem}

              />
            </View>

            <Divider className="bg-primary-100 m-5" />
            <View className=" bg-white pt-6 px-4 mb-3">
              <Text className="text-[20px] font-extrabold text-black mb-2">
                소식지
              </Text>
              <View className="flex-row  justify-around gap-4 py-3 ">
                <View className="border border-blue-800 rounded-xl px-5 py-4 flex-1 mr-3">
                  <Pressable onPress={() => {
                    setCommunityType("일반")
                  }}><Text>커뮤니티</Text>
                  </Pressable>
                </View>
                <View className="border border-blue-800 rounded-xl px-5 py-4 flex-1">
                  <Pressable onPress={() => {
                    setCommunityType("공지")
                  }}><Text>공지</Text>
                  </Pressable>
                </View>
              </View>
            </View>

            <CommunityCard data={{ type: communityType }} />

          </Box>
          <SubBanner datas={bannerDatas} />

          <Divider className="bg-primary-100 m-5" />

        </Box>
        <Footer />
        {/* 하단 큰 아이콘 메뉴 */}
        <BottomMenu />

      </ScrollView>
    </SafeAreaView>
  );
}
