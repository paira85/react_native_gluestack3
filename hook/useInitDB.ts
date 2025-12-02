// hooks/useInitDB.ts
import { useEffect } from "react";
import { Platform } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { initSettlementDB } from "../db/settlementDB";

export function useInitDB() {
  const db = useSQLiteContext();

  useEffect(() => {
    // if (Platform.OS === "web") {
    //   console.log("WEB: DB init skipped");
    //   return;
    // }

    const init = async () => {
      console.log("DB INIT RUN ONCE");
      await initSettlementDB(db);
    };

    init();
  }, []);
}
