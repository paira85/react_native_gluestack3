import { create } from "zustand";
import { initDB, selectAll, insertItem, updateItem, deleteItem } from "../db/settlementDB";

export const useSettlementStore = create((set) => ({
  list: [],
  initialized: false,

  init: () => {
    initDB();
    selectAll((rows) => set({ list: rows, initialized: true }));
  },

  add: (data) => {
    insertItem(data, () => selectAll((rows) => set({ list: rows })));
  },

  update: (id, data) => {
    updateItem(id, data, () => selectAll((rows) => set({ list: rows })));
  },

  remove: (id) => {
    deleteItem(id, () => selectAll((rows) => set({ list: rows })));
  },
}));
