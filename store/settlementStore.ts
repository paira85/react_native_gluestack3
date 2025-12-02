import { create } from "zustand";
import { initDB, selectAll, insertItem, updateItem, deleteItem , isWeb} from "../db/db";
import { Platform } from "react-native";
import { useSQLiteContext } from "expo-sqlite";

export const useSettlementStore = create((set) => ({
  list: [],
  initialized: false,

  init: async () => {
    // const db = await initDB();
    // if (isWeb) {
    //   set({ initialized: true });
    //   return; // DB select 없이 초기화 완료
    // }else{
    //   console.log('db' , db)
    //   const rows = await db.getAllAsync("SELECT * FROM settlement;");
    //   consolo.log('rows' , rows)
    //   set({ list: rows });
    // }

    if (Platform.OS === 'web') {
      set({ initialized: true });
      return;
    }

    const db = useSQLiteContext();  // ← 이제 위치 100% 정상

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS settlement (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        amount INTEGER,
        date TEXT,
        created_at TEXT
      );
    `);

    const rows = await db.getAllAsync("SELECT * FROM settlement;");
    console.log("rows:", rows);

    set({ list: rows, initialized: true });
  },

  add: async(data) => {
    const newItem = {
      id: Date.now(), // 또는 uuid() 사용 가능
      ...data,
      created_at: new Date().toISOString(),
    };

    if(isWeb){
      console.log('addData', data)
      set(prev => ({ list: [...prev.list, newItem] }));
    }else{
      const db = useSQLiteContext();
      const result = await db.runAsync(
        `INSERT INTO settlement (title, amount, date, created_at)
        VALUES (?, ?, ?, ?)`,
        [item.title, item.amount, item.date, new Date().toISOString()]
      );

      const newItem = {
        id: result.lastInsertRowId,
        ...item,
        created_at: new Date().toISOString(),
      };

      set((state) => ({
        list: [...state.list, newItem]
      }));
    }
  },

  update: (id, data) => {
    updateItem(id, data , (rows) => {console.log('update' , rows)});
    set(
      prev => ({
        list: prev.list.map(item =>
          String(item.id) === String(id)? { ...item, ...data } : item
        )
      })
    )
  },

  remove: (id) => {
    deleteItem(id,(rows) => {console.log('remove' , rows)});
    set(
      prev => ({
        list: prev.list.filter(item => String(item.id)!== String(id))
      })
    )
  },
}));
