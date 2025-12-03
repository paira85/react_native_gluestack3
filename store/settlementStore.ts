import { create } from "zustand";
import { Platform } from "react-native";
export const isWeb = Platform.OS === "web";

export const useSettlementStore = create((set) => ({
  listStore: [],
  groupStroe:[],
  initialized: false,
  count : 0,


  initStore: async () => {
    if (Platform.OS === 'web') {
      set({ count: 1,  initialized: true });
      return;
    }   
  },
  groupAdd :async(data)=>{
    const newItem = {
      ...data,
      created_at: new Date().toISOString(),
    };

    set(prev => ({
      groupStroe :[...prev.groupStroe , newItem]
    }))
  },
  add: async(data) => {
    const newItem = {
      ...data,
      created_at: new Date().toISOString(),
    };

    console.log('addData', data)
    set(prev => ({ listStore: [...prev.listStore, newItem] }));
    
  },

  update: (id, data) => {
    set(
      prev => ({
        listStore: prev.listStore.map(item =>
          String(item.id) === String(id)? { ...item, ...data } : item
        )
      })
    )
  },

  remove: (id) => {
    set(
      prev => ({
        listStore: prev.listStore.filter(item => String(item.id)!== String(id))
      })
    )
  },
}));
