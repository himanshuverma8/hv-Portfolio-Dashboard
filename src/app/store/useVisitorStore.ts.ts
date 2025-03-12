import { create } from "zustand";
interface VisitorState {
   activeUsers: number;
   setActiveUsers: (count: number) => void;
 }

 export const useVisitorStore = create<VisitorState>((set) => ({
   activeUsers: 0,
   setActiveUsers: (count) => set({ activeUsers: count }),
 }));