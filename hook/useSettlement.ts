// hooks/useSettlement.ts
import { useCallback, useEffect, useState } from "react";
import {
  initSettlementDB,
  getSettlementRows,
} from "../db/settlementDB";
import { useSettlementStore } from "@/store/settlementStore";
import { useFocusEffect } from "expo-router";

export function useSettlement(db: any) {
  const [list, setList] = useState<any[]>([]);
  const [initialized, setInitialized] = useState(false);
  const {count ,initStore} = useSettlementStore();
  
  useEffect(() => {
    
    initStore()
    const init = async () => {
      await initSettlementDB(db);

      const rows = await getSettlementRows(db);
      setList(rows);
      setInitialized(true);
      
      console.log('initDb 카운터')
      console.log('initialized' , initialized)
    };
    if(count !== 1){
      init();
    }

    refresh()
    console.log('count' , count)
  }, []);

  
  const refresh = async () => {
    const rows = await getSettlementRows(db);
    setList(rows);
  };


  // useFocusEffect(
  //   useCallback(() => {
  //     refresh();      // 🔥 화면 복귀할 때 DB 재조회
  //   }, [])
  // );


  return { list, initialized, refresh };
}

