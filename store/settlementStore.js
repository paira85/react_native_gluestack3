import { create } from "zustand";

export const useSettlementStore = create((set) => ({
  list: [],

  add: (item) =>
    set((state) => ({
      list: [...state.list, { id: Date.now().toString(), ...item }],
    })),

  update: (id, item) =>
    set((state) => ({
      list: state.list.map((d) => (d.id === id ? { ...d, ...item } : d)),
    })),

  remove: (id) =>
    set((state) => ({
      list: state.list.filter((d) => d.id !== id),
    })),
}));
