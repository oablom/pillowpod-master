import { create } from "zustand";

interface EditModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditModal = create<EditModalStore>((set) => ({
  isOpen: false,
  onOpen: () => {
    console.log("Edit modal opened");
    set({ isOpen: true });
  },
  onClose: () => {
    console.log("Edit modal closed");
    set({ isOpen: false });
  },
}));

export default useEditModal;
