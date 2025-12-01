import { create } from "zustand";
import { initDB, selectAll, insertItem, updateItem, deleteItem , isWeb} from "../db/db";

export const useSettlementStore = create((set) => ({
  list: [],
  initialized: false,

  init: () => {
    initDB();
    if (isWeb) {
      set({ initialized: true });
      return; // DB select 없이 초기화 완료
    }
    selectAll(rows => set({ list: rows, initialized: true }));
  },

  add: (data) => {
    const newItem = {
      id: Date.now(), // 또는 uuid() 사용 가능
      ...data,
      created_at: new Date().toISOString(),
    };

    set(prev => ({ list: [...prev.list, newItem] }));
    insertItem(data, (rows) => {console.log('rows' , rows)});
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
