// hooks/useSettlement.ts
import { useCallback, useEffect, useState } from "react";
import {
  initScheduleDB,
  getScheduleRows
} from "../db/scheduleDB";
import { useFocusEffect } from "expo-router";

export function userSchedule(db: any) {
  const [list, setList] = useState<any[]>([]);
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    
    const init = async () => {
      await initScheduleDB(db);

      const rows = await getScheduleRows(db);
      setList(rows);
      setInitialized(true);
      
      console.log('initDb 카운터')
      console.log('initialized' , initialized)
    };
    init();

  }, []);

  
  const refresh = async () => {
    const rows = await getScheduleRows(db);
    setList(rows);
  };



  return { list, initialized, refresh };
}

