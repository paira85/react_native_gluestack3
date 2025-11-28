
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CourseSelect from "../schedule/scheduleSelect";


const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
   <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="ScheduleAdd" component={ScheduleAdd} /> */}
      <Stack.Screen name="CourseSelect" component={CourseSelect} />
      {/* <Stack.Screen name="ScheduleResult" component={ScheduleResult} /> */}
    </Stack.Navigator>
  );
}
