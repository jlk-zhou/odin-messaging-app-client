import { create } from "zustand";
import { type Severity } from ".";

interface NotificationState {
  open: boolean;
  message: string;
  severity: Severity;
  setOpen: (openState: boolean) => void;
  setMessage: (newMessage: string) => void;
  setSeverity: (newSeverity: Severity) => void;
}

export const useNotification = create<NotificationState>()((set) => ({
  open: false,
  message: "",
  severity: "success",
  setOpen: (openState: boolean) => set({ open: openState }),
  setMessage: (newMessage: string) => set({ message: newMessage }),
  setSeverity: (newSeverity: Severity) => set({ severity: newSeverity }),
}));
