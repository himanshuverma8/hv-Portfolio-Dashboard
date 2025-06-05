import { create } from "zustand";
interface VisitorState {
   activeUsers: number;
   setActiveUsers: (count: number) => void;
 }
interface isPlayingState {
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
}

 export const useVisitorStore = create<VisitorState>((set) => ({
   activeUsers: 0,
   setActiveUsers: (count) => set({ activeUsers: count }),
 }));

 export const useIsPlaying = create<isPlayingState>((set)=>({
  isPlaying: false,
  setIsPlaying: (value) => set({isPlaying: value}),
 }));
