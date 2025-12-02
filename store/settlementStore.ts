import { create } from "zustand";
import { Platform } from "react-native";
export const isWeb = Platform.OS === "web";

export const useSettlementStore = create((set) => ({
  list: [],
  initialized: false,
  count : 0,

  initStore: async () => {
    if (Platform.OS === 'web') {
      set({count: 1,  initialized: true });
      return;
    }   
  },
  
  setList : async(rows) =>{
    set({ list: rows, initialized: true });
  },

  add: async(data) => {
    const newItem = {
      id: Date.now(), // 또는 uuid() 사용 가능
      ...data,
      created_at: new Date().toISOString(),
    };

    console.log('addData', data)
    set(prev => ({ list: [...prev.list, newItem] }));
    
  },

  update: (id, data) => {
    set(
      prev => ({
        list: prev.list.map(item =>
          String(item.id) === String(id)? { ...item, ...data } : item
        )
      })
    )
  },

  remove: (id) => {
    set(
      prev => ({
        list: prev.list.filter(item => String(item.id)!== String(id))
      })
    )
  },
}));
