import { ImageSourcePropType } from "react-native";
export interface Food {
  title: string;
  category: string;
  status: string;
  star: string;
  desc:string;
  coupon:string;
  review: string;
  answer: string;
  img: ImageSourcePropType;   // require() 사용 시 any, URL 사용 시 string
  sumImg:SubImg[];
}

interface SubImg{
  img: ImageSourcePropType; 
}
