import { create } from "zustand";

interface NotificationState {
  open: boolean;
  message: string;
  setOpen: (openState: boolean) => void;
  setMessage: (newMessage: string) => void;
}

export const useNotification = create<NotificationState>()((set) => ({
  open: false,
  message: "",
  setOpen: (openState: boolean) => set({ open: openState }),
  setMessage: (newMessage: string) => set({ message: newMessage }),
}));
